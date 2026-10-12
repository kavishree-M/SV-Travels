import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, Phone, MapPin, Users, Bus, FileText, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldAlert } from 'lucide-react';
import { BookingFormData, BookingRecord } from '../types';
import { getLocalizedServices, getLocalizedFleet, FLEET_DATA, COMPANY_CONTACT } from '../data/travelData';
import { apiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialVehicle?: string;
  onBookingCreated?: (booking: BookingRecord) => void;
}

const isSchoolTransportation = (serviceType: string): boolean => {
  const normalizedService = serviceType.toLowerCase();
  return (
    normalizedService.includes('bhavans') ||
    normalizedService.includes('school transportation') ||
    normalizedService.includes('பவன்ஸ்') ||
    normalizedService.includes('भवांस')
  );
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
  initialVehicle = '',
  onBookingCreated,
}) => {
  const { t, language } = useLanguage();
  const services = getLocalizedServices(language);
  const fleet = getLocalizedFleet(language);
  const availableVehicles = fleet.filter(
    (vehicle) => vehicle.capacityConfirmed && vehicle.seatingCapacity !== null
  );
  const defaultVehicleCategory =
    availableVehicles.find((vehicle) => vehicle.category === initialVehicle)?.category ??
    availableVehicles.find((vehicle) => vehicle.seatingCapacity === 8)?.category ??
    availableVehicles[0]?.category ??
    fleet[0]?.category ??
    '';

  // Today's date string YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const defaultFormState: BookingFormData = {
    fullName: '',
    email: '',
    phone: '',
    serviceType: initialService || services[0].name,
    tripType: 'round-trip',
    travelDate: todayStr,
    returnDate: todayStr,
    pickupLocation: '',
    destination: '',
    passengerCount: isSchoolTransportation(initialService || services[0].name) ? 1 : 8,
    vehicleCategory: defaultVehicleCategory,
    additionalRequirements: '',
    language,
  };

  const [formData, setFormData] = useState<BookingFormData>(defaultFormState);
  const [studentStandards, setStudentStandards] = useState<string[]>(['']);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<BookingRecord | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync initial props when opened (do not overwrite if already typing)
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        serviceType: initialService || prev.serviceType || services[0].name,
        ...(isSchoolTransportation(initialService)
          ? { passengerCount: 1, travelDate: '', returnDate: '' }
          : {}),
        vehicleCategory:
          availableVehicles.find((vehicle) => vehicle.category === initialVehicle)?.category ??
          availableVehicles.find((vehicle) => vehicle.category === prev.vehicleCategory)?.category ??
          defaultVehicleCategory,
        language,
      }));
      if (isSchoolTransportation(initialService)) {
        setStudentStandards(['']);
      }
      setErrors({});
      setSubmissionSuccess(null);
      setSubmitError(null);
    }
  }, [isOpen, initialService, initialVehicle]);

  // Keep language in sync with current context without clearing user inputs
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      language,
    }));
  }, [language]);

  if (!isOpen) return null;

  // Find currently selected vehicle configuration from master FLEET_DATA for capacity check
  const selectedVehicleObj = FLEET_DATA.find((f) => f.category === formData.vehicleCategory) || fleet[0];

  // Check if school transportation is selected
  const isSchoolTransportSelected = isSchoolTransportation(formData.serviceType);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('booking.errNameRequired');
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = t('booking.errNameMin');
    }

    // Phone
    const phoneClean = formData.phone.trim().replace(/[\s-]/g, '');
    const phoneRegex = /^[+]?[0-9]{8,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = t('booking.errPhoneRequired');
    } else if (!phoneRegex.test(phoneClean)) {
      newErrors.phone = t('booking.errPhoneInvalid');
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t('booking.errEmailRequired');
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = t('booking.errEmailInvalid');
    }

    // Service
    if (!formData.serviceType) {
      newErrors.serviceType = t('booking.errServiceRequired');
    }

    // Vehicle
    if (!formData.vehicleCategory) {
      newErrors.vehicleCategory = t('booking.errVehicleRequired');
    }

    // Dates
    if (!isSchoolTransportSelected && !formData.travelDate) {
      newErrors.travelDate = t('booking.errTravelDateRequired');
    } else if (!isSchoolTransportSelected && formData.travelDate && formData.travelDate < todayStr) {
      newErrors.travelDate = t('booking.errTravelDatePast');
    }

    if (!isSchoolTransportSelected && formData.tripType === 'round-trip') {
      if (!formData.returnDate) {
        newErrors.returnDate = t('booking.errReturnDateRequired');
      } else if (formData.travelDate && formData.returnDate < formData.travelDate) {
        newErrors.returnDate = t('booking.errReturnDateBeforeTravel');
      }
    }

    if (isSchoolTransportSelected && studentStandards.some((standard) => !standard.trim())) {
      newErrors.studentStandards = t('booking.errStudentStandardRequired');
    }

    // Pickup & Destination
    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = t('booking.errPickupRequired');
    } else if (formData.pickupLocation.trim().length < 3) {
      newErrors.pickupLocation = t('booking.errPickupMin');
    }

    if (!formData.destination.trim()) {
      newErrors.destination = t('booking.errDestinationRequired');
    } else if (formData.destination.trim().length < 3) {
      newErrors.destination = t('booking.errDestinationMin');
    }

    // Passenger Count & Capacity Validation:
    const passengers = Number(formData.passengerCount);
    if (!formData.passengerCount || isNaN(passengers) || passengers <= 0) {
      newErrors.passengerCount = t('booking.errPassengersInvalid');
    } else if (!isSchoolTransportSelected && selectedVehicleObj && selectedVehicleObj.capacityConfirmed && selectedVehicleObj.seatingCapacity !== null) {
      if (passengers > selectedVehicleObj.seatingCapacity) {
        newErrors.passengerCount = `${selectedVehicleObj.name} ${t('booking.errCapacityPrefix')} ${selectedVehicleObj.seatingCapacity} ${t('booking.errCapacitySuffix')} (${passengers})`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Include current customer selected language with booking enquiry
      const payload: BookingFormData = {
        ...formData,
        email: formData.email.trim(),
        phone: formData.phone.trim().replace(/[\s-]/g, ''),
        travelDate: isSchoolTransportSelected ? null : formData.travelDate,
        returnDate: isSchoolTransportSelected ? undefined : formData.returnDate,
        vehicleCategory: isSchoolTransportSelected ? 'To be confirmed' : formData.vehicleCategory,
        additionalRequirements: [
          isSchoolTransportSelected
            ? `${t('booking.studentStandardsSummary')}\n${studentStandards
                .map((standard, index) => `${t('booking.studentStandardLabel')} ${index + 1}: ${standard.trim()}`)
                .join('\n')}`
            : '',
          formData.additionalRequirements?.trim() ?? '',
        ]
          .filter(Boolean)
          .join('\n\n'),
        language,
      };
      const response = await apiService.submitBooking(payload);
      setSubmissionSuccess(response);
      if (onBookingCreated) {
        onBookingCreated(response);
      }
    } catch (err: any) {
      console.error('Booking submission failed:', err);
      setSubmitError(
        err?.response?.data?.message ||
        `Unable to reach the booking email service. No email was confirmed as sent. Please contact SV Travels at ${COMPANY_CONTACT.phone} or on WhatsApp.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(defaultFormState);
    setStudentStandards(['']);
    setSubmissionSuccess(null);
    setErrors({});
    setSubmitError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white dark:bg-neutral-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 overflow-hidden flex flex-col max-h-[92vh] transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-form-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-neutral-900 dark:bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div>
            <span className="text-xs font-mono uppercase text-sky-400 tracking-wider">
              {t('booking.portalTag')}
            </span>
            <h2 id="booking-form-modal-title" className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              {t('booking.modalTitle')}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {submissionSuccess ? (
            /* SUCCESS STATE */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                  {t('booking.successBanner')}
                </span>
                <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                  {t('booking.bookingReferenceLabel')} <span className="text-sky-700 dark:text-sky-400">{submissionSuccess.bookingReference}</span>
                </h3>
              </div>

              {/* Exact required confirmation message from prompt */}
              <div className="p-4 bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-850 rounded-xl text-sky-950 dark:text-sky-200 text-sm font-medium leading-relaxed max-w-lg mx-auto">
                {t('booking.officialConfirmationNotice')}
              </div>

              {/* Summary Breakdown */}
              <div className="bg-neutral-50 dark:bg-neutral-850 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-left text-xs sm:text-sm space-y-2.5 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700 pb-2">
                  <span className="text-neutral-500 dark:text-neutral-400">{t('booking.summaryCustomerName')}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{submissionSuccess.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700 pb-2">
                  <span className="text-neutral-500 dark:text-neutral-400">{t('booking.summaryContact')}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{submissionSuccess.phone}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700 pb-2">
                  <span className="text-neutral-500 dark:text-neutral-400">{t('booking.summaryService')}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{submissionSuccess.serviceType}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700 pb-2">
                  <span className="text-neutral-500 dark:text-neutral-400">{t('booking.summaryVehicle')}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{submissionSuccess.vehicleCategory} ({submissionSuccess.passengerCount} {t('common.passengers')})</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700 pb-2">
                  <span className="text-neutral-500 dark:text-neutral-400">{t('booking.summaryRoute')}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{submissionSuccess.pickupLocation} → {submissionSuccess.destination}</span>
                </div>
                {submissionSuccess.travelDate && <div className="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700 pb-2">
                  <span className="text-neutral-500 dark:text-neutral-400">{t('booking.summaryTravelDate')}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{submissionSuccess.travelDate}</span>
                </div>}
                {submissionSuccess.tripType === 'round-trip' && submissionSuccess.returnDate && (
                  <div className="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700 pb-2">
                    <span className="text-neutral-500 dark:text-neutral-400">{t('booking.summaryReturnDate')}</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">{submissionSuccess.returnDate}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-500 dark:text-neutral-400">{t('booking.summaryStatus')}</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">{t('common.pending')}</span>
                </div>
              </div>

              {/* Reset / Another booking */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors border border-neutral-300 dark:border-neutral-700"
                >
                  {t('booking.submitAnotherBtn')}
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors"
                >
                  {t('common.done')}
                </button>
              </div>
            </div>
          ) : (
            /* BOOKING FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-red-900 dark:text-red-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Service & Route Specification Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center gap-2">
                  <Bus className="w-3.5 h-3.5" />
                  <span>{t('booking.step1Title')}</span>
                </h3>

                {/* Bhavans School Special Alert */}
                {isSchoolTransportSelected && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-lg text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      {t('booking.bhavansFormNotice')}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      {t('booking.serviceLabel')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => {
                        const serviceType = e.target.value;
                        const schoolTransport = isSchoolTransportation(serviceType);
                        setFormData({
                          ...formData,
                          serviceType,
                          ...(schoolTransport && !isSchoolTransportSelected
                            ? { passengerCount: 1, travelDate: '', returnDate: '' }
                            : {}),
                        });
                        if (schoolTransport !== isSchoolTransportSelected) {
                          setStudentStandards(['']);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p className="text-xs text-red-600 mt-1">{errors.serviceType}</p>
                    )}
                  </div>

                  {/* Trip Type (One-Way or Round-Trip) */}
                  {!isSchoolTransportSelected && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                        {t('booking.tripFormatLabel')} <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, tripType: 'round-trip' })}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors ${
                            formData.tripType === 'round-trip'
                              ? 'bg-sky-50 dark:bg-sky-950/70 border-sky-600 text-sky-800 dark:text-sky-300'
                              : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {t('booking.roundTrip')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, tripType: 'one-way' })}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors ${
                            formData.tripType === 'one-way'
                              ? 'bg-sky-50 dark:bg-sky-950/70 border-sky-600 text-sky-800 dark:text-sky-300'
                              : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {t('booking.oneWay')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dates: Travel Date & Return Date */}
                {!isSchoolTransportSelected && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{t('booking.travelDateLabel')}</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={formData.travelDate ?? ''}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                      />
                      {errors.travelDate && (
                        <p className="text-xs text-red-600 mt-1">{errors.travelDate}</p>
                      )}
                    </div>

                    {formData.tripType === 'round-trip' ? (
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{t('booking.returnDateLabel')}</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          min={formData.travelDate || todayStr}
                          value={formData.returnDate || ''}
                          onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                        />
                        {errors.returnDate && (
                          <p className="text-xs text-red-600 mt-1">{errors.returnDate}</p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400 italic pt-6">
                        (One-way enquiry selected; no return date required)
                      </div>
                    )}
                  </div>
                )}

                {/* Pickup & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{t('booking.pickupLocationLabel')}</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t('booking.pickupPlaceholder')}
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    />
                    {errors.pickupLocation && (
                      <p className="text-xs text-red-600 mt-1">{errors.pickupLocation}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{t('booking.destinationLabel')}</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t('booking.destinationPlaceholder')}
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    />
                    {errors.destination && (
                      <p className="text-xs text-red-600 mt-1">{errors.destination}</p>
                    )}
                  </div>
                </div>

                {/* Vehicle Preference & Passenger Count */}
                <div className={`grid grid-cols-1 ${isSchoolTransportSelected ? '' : 'sm:grid-cols-2'} gap-4`}>
                  {!isSchoolTransportSelected && <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      {t('booking.preferredVehicleLabel')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.vehicleCategory}
                      onChange={(e) => setFormData({ ...formData, vehicleCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    >
                      {availableVehicles.map((v) => (
                        <option key={v.id} value={v.category}>
                          {v.seatingCapacity}-seater
                        </option>
                      ))}
                    </select>
                    {errors.vehicleCategory && (
                      <p className="text-xs text-red-600 mt-1">{errors.vehicleCategory}</p>
                    )}
                  </div>}

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{isSchoolTransportSelected ? t('booking.numberOfStudentsLabel') : t('booking.passengerCountLabel')}</span>
                        <span className="text-red-500">*</span>
                      </span>
                      {!isSchoolTransportSelected && selectedVehicleObj && (
                        <span className="text-[11px] text-neutral-500 font-normal">
                          {selectedVehicleObj.capacityConfirmed
                            ? `${t('booking.confirmedCapacityNote')} ${selectedVehicleObj.seatingCapacity}`
                            : t('booking.omniCapacityNote')}
                        </span>
                      )}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={150}
                      value={formData.passengerCount}
                      onChange={(e) =>
                        {
                          const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                          setFormData({ ...formData, passengerCount: value });
                          if (isSchoolTransportSelected) {
                            const count = typeof value === 'number' ? Math.min(value, 150) : 0;
                            setStudentStandards((current) =>
                              Array.from({ length: count }, (_, index) => current[index] ?? '')
                            );
                          }
                        }
                      }
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    />
                    {errors.passengerCount && (
                      <p className="text-xs text-red-600 mt-1">{errors.passengerCount}</p>
                    )}
                  </div>
                </div>
                {isSchoolTransportSelected && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      {t('booking.studentStandardsHeader')}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {studentStandards.map((standard, index) => (
                        <div key={index}>
                          <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                            {t('booking.studentStandardLabel')} {index + 1}
                            <span className="text-red-500"> *</span>
                          </label>
                          <input
                            type="text"
                            value={standard}
                            placeholder={t('booking.studentStandardPlaceholder')}
                            onChange={(e) =>
                              setStudentStandards((current) =>
                                current.map((value, currentIndex) => currentIndex === index ? e.target.value : value)
                              )
                            }
                            className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                          />
                        </div>
                      ))}
                    </div>
                    {errors.studentStandards && (
                      <p className="text-xs text-red-600">{errors.studentStandards}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Customer Contact Information */}
              <div className="space-y-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>{t('booking.step2Title')}</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {t('booking.customerNameLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={t('booking.customerNamePlaceholder')}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{t('booking.phoneLabel')}</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder={t('booking.phonePlaceholder')}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{t('booking.emailLabel')}</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder={t('booking.emailPlaceholder')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{t('booking.additionalRequirementsLabel')}</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder={t('booking.additionalRequirementsPlaceholder')}
                    value={formData.additionalRequirements}
                    onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  />
                </div>
              </div>

              {/* Disclaimer Notice */}
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t('booking.enquiryDisclaimer')}
              </div>

              {/* Form Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {t('common.cancel')}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 dark:bg-sky-600 dark:hover:bg-sky-500 rounded-lg shadow-sm transition-all disabled:opacity-60 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('common.submitting')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('common.submit')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
