import React from 'react';
import { ArrowRight, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServicesSectionProps {
  services: ServiceItem[];
  onViewDetails: (service: ServiceItem) => void;
  onBookService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onViewDetails,
  onBookService,
}) => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-sky-700 dark:text-sky-400 uppercase mb-2">
            {t('services.sectionTag')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {t('services.sectionTitle')}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {t('services.sectionDesc')}
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-neutral-50 dark:bg-neutral-900/90 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 overflow-hidden hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/9] w-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono tracking-wider uppercase text-sky-300">
                      {t('services.serviceNumberPrefix')} 0{index + 1}
                    </span>
                    {service.isBhavansExclusive && (
                      <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded">
                        {t('services.bhavansBadge')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white drop-shadow-sm mt-0.5">
                    {service.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Bhavans School Special Notice */}
                  {service.isBhavansExclusive && (
                    <div className="mt-3 p-2.5 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-850 rounded-lg text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{t('services.bhavansCardNotice')}</span>
                    </div>
                  )}

                  {/* Key features preview */}
                  <div className="space-y-1.5 pt-4 border-t border-neutral-200/60 dark:border-neutral-800 mt-4">
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                      {t('services.keyHighlights')}
                    </div>
                    {service.suitableUseCases.slice(0, 2).map((useCase, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                        <span>{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => onViewDetails(service)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Info className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                    <span>{t('common.viewDetails')}</span>
                  </button>

                  <button
                    onClick={() => onBookService(service.name)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 dark:bg-sky-600 dark:hover:bg-sky-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
                  >
                    <span>{t('common.bookNow')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
