import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import frTranslations from '../translations/fr.json';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to French
    return localStorage.getItem('preferred-language') || 'fr';
  });
  
  // Use direct imports instead of dynamic imports for faster loading
  const translations = {
    fr: frTranslations,
    en: enTranslations
  };

  const t = (key, defaultValue = '') => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Return default value or key if translation not found
        return defaultValue || key;
      }
    }
    
    return value || defaultValue || key;
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  const value = {
    language,
    currentLanguage: language, // Add currentLanguage alias for compatibility
    setLanguage,
    changeLanguage,
    t,
    toggleLanguage,
    isEnglish: language === 'en',
    isFrench: language === 'fr',
    isLoaded: true // Always loaded since we use direct imports
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
