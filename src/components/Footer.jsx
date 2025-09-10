import React from 'react';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">{t('home.hero.title')}</h3>
            <p className="footer-description">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.quickLinks')}</h4>
            <ul className="footer-links">
              <li><a href="/">{t('nav.home')}</a></li>
              <li><a href="/products">{t('nav.products')}</a></li>
              <li><a href="/about">{t('nav.about')}</a></li>
              <li><a href="/contact">{t('nav.contact')}</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.contactInfo')}</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={18} />
                <span>+1 (234) 567-8900</span>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>123 Fashion Street, NY 10001</span>
              </div>
              <button className="btn btn-primary footer-whatsapp" onClick={handleWhatsAppClick}>
                <MessageCircle size={18} />
                {t('footer.whatsapp')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} {t('home.hero.title')}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;