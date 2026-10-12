import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, LANGUAGES, translations, LanguageOption } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => string;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sv_travels_lang') as Language | null;
      if (saved && (saved === 'en' || saved === 'ta' || saved === 'hi')) {
        return saved;
      }
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sv_travels_lang', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  /**
   * Safe nested translation lookup with fallback to English.
   * e.g. t('hero.headline1') -> looks up translations[language].hero.headline1
   */
  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    
    // 1. Try currently selected language
    let current: any = translations[language];
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        current = undefined;
        break;
      }
    }
    if (typeof current === 'string') {
      return current;
    }

    // 2. Safe fallback to English
    let fallback: any = translations.en;
    for (const key of keys) {
      if (fallback && typeof fallback === 'object' && key in fallback) {
        fallback = fallback[key];
      } else {
        fallback = undefined;
        break;
      }
    }
    if (typeof fallback === 'string') {
      return fallback;
    }

    // 3. Return last segment of keyPath if missing
    return keys[keys.length - 1] || keyPath;
  };

  const currentLanguageOption =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: LANGUAGES,
        currentLanguageOption,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
