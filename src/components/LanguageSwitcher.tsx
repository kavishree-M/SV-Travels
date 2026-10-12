import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

interface LanguageSwitcherProps {
  className?: string;
  isCompact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', isCompact = false }) => {
  const { language, setLanguage, languages, currentLanguageOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Select Language / மொழியை மாற்ற / भाषा चुनें"
      >
        <Globe className="w-3.5 h-3.5 text-sky-700 dark:text-sky-400 shrink-0" />
        <span className="font-medium">
          {currentLanguageOption.nativeLabel}
        </span>
        <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl shadow-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 py-1 z-50 animate-fadeIn">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setLanguage(lang.code as Language);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                language === lang.code
                  ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-300 font-bold'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs">{lang.nativeLabel}</span>
                {lang.code !== 'en' && (
                  <span className="text-[10px] text-neutral-400">{lang.label}</span>
                )}
              </div>
              {language === lang.code && (
                <Check className="w-3.5 h-3.5 text-sky-700 dark:text-sky-400 shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
