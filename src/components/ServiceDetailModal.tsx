import React from 'react';
import { X, CheckCircle, Bus, ArrowRight, ShieldAlert } from 'lucide-react';
import { ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  const { t } = useLanguage();

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white dark:bg-neutral-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden text-neutral-900 dark:text-neutral-100 transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-service-title"
      >
        {/* Modal Header Image */}
        <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full bg-neutral-900 overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
              {t('services.modalSpecTag')}
            </span>
            <h2 id="modal-service-title" className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {service.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Exclusive Bhavans School Warning Banner */}
          {service.isBhavansExclusive && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 rounded-xl flex items-start gap-3 text-amber-900 dark:text-amber-200">
              <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-300">
                  {t('services.bhavansAlertTitle')}
                </h4>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                  {t('services.bhavansAlertBody')}
                </p>
              </div>
            </div>
          )}

          {/* Full Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              {t('services.modalOverview')}
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Suitable Use Cases */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-sky-700 dark:text-sky-400" />
              <span>{t('services.modalUseCases')}</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              {service.suitableUseCases.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-sky-700 dark:text-sky-400 font-bold">·</span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Relevant Vehicle Options */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2.5 flex items-center gap-1.5">
              <Bus className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span>{t('services.modalVehicles')}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.vehicleOptions.map((vehicle, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs font-medium text-neutral-800 dark:text-neutral-200"
                >
                  {vehicle}
                </span>
              ))}
            </div>
          </div>

          {/* Important Booking Information */}
          <div className="p-4 bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-850 rounded-xl flex items-start gap-3 text-sky-900 dark:text-sky-200">
            <ShieldAlert className="w-5 h-5 text-sky-700 dark:text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-950 dark:text-sky-300">
                {t('services.modalBookingInfo')}
              </h4>
              <p className="text-xs sm:text-sm text-sky-900 dark:text-sky-200 mt-1 leading-relaxed">
                {service.bookingInfo}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-neutral-50 dark:bg-neutral-850 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            {t('services.closeDetails')}
          </button>

          <button
            onClick={() => {
              onClose();
              onBookService(service.name);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 dark:bg-sky-600 dark:hover:bg-sky-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <span>{t('services.bookThisService')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
