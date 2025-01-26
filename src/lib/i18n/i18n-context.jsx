// src/lib/i18n/i18n-context.jsx
import React, { createContext, useContext, useState } from 'react';
import { translations } from './translations';

const I18nContext = createContext({
  language: 'en',
  setLanguage: () => null,
  t: (key) => key,
});

export function I18nProvider({ children, defaultLanguage = 'en' }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('app-language') || defaultLanguage;
    }
    return defaultLanguage;
  });

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value;
  };

  const handleSetLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    window.localStorage.setItem('app-language', newLanguage);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};