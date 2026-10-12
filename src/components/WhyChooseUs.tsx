import React from 'react';
import { Users2, Headphones, Route, CheckSquare2 } from 'lucide-react';
import { getLocalizedWhyChooseUs } from '../data/travelData';
import { useLanguage } from '../context/LanguageContext';

export const WhyChooseUs: React.FC = () => {
  const { t, language } = useLanguage();
  const icons = [Users2, Headphones, Route, CheckSquare2];
  const points = getLocalizedWhyChooseUs(language);

  return (
    <section id="why-us" className="py-20 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-sky-700 dark:text-sky-400 uppercase mb-2">
            {t('whyUs.sectionTag')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {t('whyUs.sectionTitle')}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {t('whyUs.sectionDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="bg-neutral-50 dark:bg-neutral-900/90 rounded-2xl p-6 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
