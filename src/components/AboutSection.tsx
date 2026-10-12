import React from 'react';
import { CalendarClock, Compass } from 'lucide-react';
import { HERO_IMAGE, COMPANY_CONTACT } from '../data/travelData';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-neutral-100/70 dark:bg-neutral-900/60 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Operations */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-bold tracking-widest text-sky-700 dark:text-sky-400 uppercase">
              {t('about.sectionTag')}
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
              {t('about.sectionTitle')}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <p>
                {t('about.p1')}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-850 p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <strong>{t('about.locationLabel')}</strong> {COMPANY_CONTACT.address} · {t('about.phoneLabel')} <a href={`tel:${COMPANY_CONTACT.phone}`} className="text-sky-700 dark:text-sky-400 font-semibold">{COMPANY_CONTACT.phone}</a>
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white dark:bg-neutral-850 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xs">
                <CalendarClock className="w-5 h-5 text-sky-700 dark:text-sky-400 mb-2" />
                <div className="text-xs font-bold text-neutral-900 dark:text-white">{t('about.pillar2Title')}</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{t('about.pillar2Desc')}</div>
              </div>

              <div className="p-4 bg-white dark:bg-neutral-850 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xs">
                <Compass className="w-5 h-5 text-sky-700 dark:text-sky-400 mb-2" />
                <div className="text-xs font-bold text-neutral-900 dark:text-white">{t('about.pillar3Title')}</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{t('about.pillar3Desc')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-300/80 dark:border-neutral-800 bg-neutral-900 aspect-[4/3]">
              <img
                src={HERO_IMAGE}
                alt="SV Travels passenger coach fleet"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-xs font-mono uppercase text-sky-300">{t('about.captionTag')}</span>
                <p className="text-sm font-semibold mt-0.5">{t('about.captionTitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
