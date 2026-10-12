import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Phone, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { COMPANY_CONTACT } from '../data/travelData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { t } = useLanguage();

  const navLinks = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.whyUs'), href: '#why-us' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-6 lg:gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white shrink-0 group"
          >
            <span className="w-9 h-9 rounded-lg bg-sky-700 text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:bg-sky-800 transition-colors">
              SV
            </span>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white leading-none">
                {t('common.brand')}
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-normal tracking-normal mt-0.5">
                {t('common.city')}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (single-line, clean hover underline) */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-sky-700 dark:hover:text-sky-400 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-sky-700 dark:after:bg-sky-400 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Language Switcher + WhatsApp + Phone + Theme + Book Now) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Clickable Phone */}
            <a
              href={`tel:${COMPANY_CONTACT.phone}`}
              className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-sky-700 dark:hover:text-sky-400 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1 whitespace-nowrap"
              title="Call SV Travels"
            >
              <Phone className="w-3.5 h-3.5 text-sky-700 dark:text-sky-400" />
              <span>{COMPANY_CONTACT.phone}</span>
            </a>

            {/* Clickable WhatsApp */}
            <a
              href={COMPANY_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap"
              title={t('common.whatsAppChat')}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t('common.whatsApp')}</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              {t('common.bookNow')}
            </button>
          </div>

          {/* Mobile header controls: Language + WhatsApp + Phone + Theme + Hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher />

            <a
              href={COMPANY_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-md"
              aria-label="WhatsApp SV Travels"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              onClick={toggleTheme}
              className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-md"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-neutral-700 dark:text-neutral-200 hover:text-sky-700 dark:hover:text-sky-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-2">
            <a
              href={COMPANY_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 rounded-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>{t('common.whatsAppChat')} ({COMPANY_CONTACT.phone})</span>
            </a>
            <a
              href={`tel:${COMPANY_CONTACT.phone}`}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-sky-800 dark:text-sky-200 bg-sky-50 dark:bg-sky-950/70 border border-sky-300 dark:border-sky-800 rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              <span>{t('common.call')}: {COMPANY_CONTACT.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors"
            >
              {t('common.bookNow')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
