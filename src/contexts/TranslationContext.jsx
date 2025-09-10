import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // Default to French
  const [translations, setTranslations] = useState({});

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const frTranslations = await import('../translations/fr.json');
        const enTranslations = await import('../translations/en.json');
        setTranslations({
          fr: frTranslations.default,
          en: enTranslations.default
        });
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };
    loadTranslations();
  }, []);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'fr' ? 'en' : 'fr');
  };

  const value = {
    language,
    setLanguage,
    t,
    toggleLanguage,
    isEnglish: language === 'en',
    isFrench: language === 'fr'
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
