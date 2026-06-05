"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, getTranslation, detectLocale, setLocale as saveLocale } from '@/lib/i18n';

type LocaleContextType = {
  locale: Locale;
  t: ReturnType<typeof getTranslation>;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh');
  const [t, setT] = useState(() => getTranslation('zh'));

  useEffect(() => {
    const detectedLocale = detectLocale();
    setLocaleState(detectedLocale);
    setT(getTranslation(detectedLocale));
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setT(getTranslation(newLocale));
    saveLocale(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
