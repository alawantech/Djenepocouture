import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useTranslation();

  const getTranslateText = () => {
    return language === 'fr' ? 'Translate to English' : 'Traduire en français';
  };

  const getShortText = () => {
    return language === 'fr' ? 'EN' : 'FR';
  };

  return (
    <button 
      className="language-toggle"
      onClick={toggleLanguage}
      title={getTranslateText()}
    >
      <div 
        className="language-toggle-content"
        data-short-text={getShortText()}
      >
        <Languages className="translate-icon" size={16} />
        <span className="flag">{language === 'fr' ? '🇬🇧' : '🇫🇷'}</span>
        <span className="translate-text">
          {getTranslateText()}
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;
