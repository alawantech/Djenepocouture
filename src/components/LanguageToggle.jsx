import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useTranslation();

  return (
    <button 
      className="language-toggle"
      onClick={toggleLanguage}
      title={language === 'fr' ? 'Switch to English' : 'Passer au français'}
    >
      <div className="language-toggle-content">
        <span className="flag">{language === 'fr' ? '🇬🇧' : '🇫🇷'}</span>
        <span className="lang-code">{language === 'fr' ? 'EN' : 'FR'}</span>
      </div>
    </button>
  );
};

export default LanguageToggle;
