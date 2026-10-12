import React from 'react';
import { ArrowRight, Shield, MessageSquare } from 'lucide-react';
import { HERO_IMAGE, COMPANY_CONTACT } from '../data/travelData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreServices: () => void;
  onBookTrip: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onBookTrip }) => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-neutral-100/70 via-neutral-50 to-white dark:from-neutral-900/80 dark:via-neutral-950 dark:to-neutral-950 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-800 dark:text-sky-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-sky-700 dark:bg-sky-400" />
              <span>{t('hero.tagline')}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.18] text-balance">
              {t('hero.headline1')} <br className="hidden sm:inline" />
              <span className="text-sky-700 dark:text-sky-400">{t('hero.headline2')}</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
              {t('hero.subheadline')}
            </p>

            {/* CTAs with WhatsApp */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onBookTrip}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 dark:bg-sky-600 dark:hover:bg-sky-500 rounded-lg shadow-md hover:shadow-lg transition-all gap-2 group whitespace-nowrap"
              >
                <span>{t('hero.bookTrip')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={COMPANY_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3.5 text-base font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-lg shadow-sm transition-colors gap-2 whitespace-nowrap"
              >
                <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>{t('hero.whatsAppUs')}</span>
              </a>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center px-4 py-3.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                <span>{t('hero.exploreServices')}</span>
              </button>
            </div>

            {/* Practical Service Highlights (Clean Unboxed Metadata) */}
            <div className="pt-6 border-t border-neutral-200/80 dark:border-neutral-800 grid grid-cols-2 gap-4 text-neutral-700 dark:text-neutral-300">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {t('hero.routeStatTitle')}
                </div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white mt-1">
                  {t('hero.routeStatDesc')}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {t('hero.supportStatTitle')}
                </div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white mt-1">
                  {COMPANY_CONTACT.phone}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={HERO_IMAGE}
                alt="SV Travels passenger coach fleet"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
              
              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                    {t('hero.photoCaptionTag')}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {t('hero.photoCaptionTitle')}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-300 font-mono">
                  <span>SV TRAVELS · CHENNAI</span>
                </div>
              </div>
            </div>

            {/* Quick Benefit Badge */}
            <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 bg-white dark:bg-neutral-900 p-3 sm:p-4 rounded-xl shadow-lg border border-neutral-200/80 dark:border-neutral-800 flex items-center gap-3 max-w-xs transition-colors">
              <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">
                  {t('hero.directSupportTitle')}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {t('hero.directSupportDesc')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
