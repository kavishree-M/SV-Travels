import React from 'react';
import { Check, ArrowRight, HelpCircle, CheckCircle } from 'lucide-react';
import { FleetItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FleetSectionProps {
  fleet: FleetItem[];
  onBookFleet: (vehicleCategory: string) => void;
}

interface FleetCardProps {
  vehicle: FleetItem;
  onBook: (category: string) => void;
}

// Reusable fleet card component
export const FleetCard: React.FC<FleetCardProps> = ({ vehicle, onBook }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Vehicle image with capacity badge */}
      <div className="relative aspect-[16/10] w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        <img
          src={vehicle.image}
          alt={`${vehicle.name} - ${vehicle.category}`}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        
        {/* Confirmed vs Unconfirmed Capacity Pill */}
        <div className="absolute top-3 right-3">
          {vehicle.capacityConfirmed ? (
            <div className="bg-neutral-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-white/10">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{vehicle.seatingCapacity} {t('fleet.confirmedBadge')}</span>
            </div>
          ) : (
            <div className="bg-amber-950/90 backdrop-blur-sm text-amber-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-amber-500/40">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('fleet.unconfirmedBadge')}</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-3 left-4 text-white">
          <span className="text-xs uppercase font-mono tracking-wider text-sky-300">
            {vehicle.capacityLabel}
          </span>
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm">
            {vehicle.name}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4">
            {vehicle.shortDescription}
          </p>

          {/* Vehicle Key Features */}
          <div className="space-y-1.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              {t('fleet.notesHeader')}
            </div>
            {vehicle.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300 block">{t('fleet.suitability')}:</span>
            <span className="line-clamp-1">{vehicle.idealFor}</span>
          </div>

          <button
            onClick={() => onBook(vehicle.category)}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 dark:bg-sky-600 dark:hover:bg-sky-500 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            <span>{t('common.bookNow')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const FleetSection: React.FC<FleetSectionProps> = ({ fleet, onBookFleet }) => {
  const { t } = useLanguage();

  return (
    <section id="fleet" className="py-20 bg-neutral-50 dark:bg-neutral-900/60 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-sky-700 dark:text-sky-400 uppercase mb-2">
            {t('fleet.sectionTag')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {t('fleet.sectionTitle')}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {t('fleet.sectionDesc')}
          </p>
        </div>

        {/* 4 Fleet Cards Grid (2x2 or 4-col responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {fleet.map((item) => (
            <FleetCard key={item.id} vehicle={item} onBook={onBookFleet} />
          ))}
        </div>

        {/* Availability & Capacity Notice */}
        <div className="mt-12 p-4 bg-white dark:bg-neutral-850 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>
              {t('fleet.disclaimerNotice')}
            </span>
          </div>
          <a
            href="#contact"
            className="text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 font-semibold whitespace-nowrap"
          >
            {t('fleet.directInquiries')}
          </a>
        </div>
      </div>
    </section>
  );
};
