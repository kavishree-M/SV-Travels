/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceItem, FleetItem, BookingRecord } from './types';
import { getLocalizedServices, getLocalizedFleet } from './data/travelData';
import { apiService } from './services/api';

function MainApp() {
  const { language } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>(() => getLocalizedServices(language));
  const [fleet, setFleet] = useState<FleetItem[]>(() => getLocalizedFleet(language));

  // Dynamic re-synchronization on language change
  useEffect(() => {
    setServices(getLocalizedServices(language));
    setFleet(getLocalizedFleet(language));
  }, [language]);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledVehicle, setPrefilledVehicle] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.removeItem('sv_travels_bookings_db');
    } catch (error) {
      console.warn('Unable to clear previously cached booking enquiries from this browser.', error);
    }
  }, []);

  useEffect(() => {
    // Optionally query backend if available and in default language
    const loadData = async () => {
      try {
        const [servicesRes, fleetRes] = await Promise.all([
          apiService.getServices(),
          apiService.getFleet(),
        ]);
        if (language === 'en') {
          if (servicesRes && servicesRes.length > 0) setServices(servicesRes);
          if (fleetRes && fleetRes.length > 0) setFleet(fleetRes);
        }
      } catch (e) {
        console.warn('Using standard static service registry', e);
      }
    };
    loadData();
  }, [language]);

  const handleOpenBookingModal = (serviceName?: string, vehicleCategory?: string) => {
    setPrefilledService(serviceName || '');
    setPrefilledVehicle(vehicleCategory || '');
    setBookingModalOpen(true);
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingCreated = (booking: BookingRecord) => {
    console.log('Booking email confirmed:', booking.bookingReference);
  };

  // Dynamically resolve currently open service modal with current language
  const selectedServiceForModal = selectedServiceId
    ? services.find((s) => s.id === selectedServiceId) || null
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-sky-500 selection:text-white transition-colors duration-200">
      {/* Top Navigation with Language Switcher and Theme Toggle */}
      <Navbar
        onOpenBooking={() => handleOpenBookingModal()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreServices={handleExploreServices}
          onBookTrip={() => handleOpenBookingModal()}
        />

        {/* Services Section */}
        <ServicesSection
          services={services}
          onViewDetails={(service) => setSelectedServiceId(service.id)}
          onBookService={(serviceName) => handleOpenBookingModal(serviceName)}
        />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* About Us */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection onBookTrip={() => handleOpenBookingModal()} />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBookingModal()}
        onSelectService={(serviceName) => handleOpenBookingModal(serviceName)}
      />

      {/* Interactive Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceId(null)}
        onBookService={(serviceName) => handleOpenBookingModal(serviceName)}
      />

      {/* Comprehensive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={prefilledService}
        initialVehicle={prefilledVehicle}
        onBookingCreated={handleBookingCreated}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
