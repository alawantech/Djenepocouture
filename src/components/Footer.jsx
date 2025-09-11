import React from 'react';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, currentLanguage } = useTranslation();

  const getWhatsAppMessage = () => {
    const messages = {
      en: "Hello! I'm interested in Djenepo Couture's services. I would like to know more about your custom tailoring and African fashion collections.",
      fr: "Bonjour! Je suis intéressé(e) par les services de Djenepo Couture. J'aimerais en savoir plus sur votre couture sur mesure et vos collections de mode africaine."
    };
    return messages[currentLanguage] || messages.en;
  };

  const handleWhatsAppClick = () => {
    const message = getWhatsAppMessage();
    const whatsappUrl = `https://wa.me/22399857217?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:+22399857217', '_self');
  };

  const handleServicesClick = (e) => {
    e.preventDefault();
    // Navigate to home page with services hash
    window.location.href = '/#services';
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
              <li><a href="/#services" onClick={handleServicesClick}>{t('nav.services')}</a></li>
              <li><a href="/about">{t('nav.about')}</a></li>
              <li><a href="/contact">{t('nav.contact')}</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.contactInfo')}</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={18} />
                <span>+223 99 85 72 17</span>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>Bamako, Missabougou</span>
              </div>
              <div className="footer-buttons">
                <button className="btn btn-primary footer-whatsapp" onClick={handleWhatsAppClick}>
                  <MessageCircle size={16} />
                  {t('footer.whatsapp')}
                </button>
                <button className="btn btn-secondary footer-call" onClick={handleCallClick}>
                  <Phone size={16} />
                  {t('contact.methods.phone.button')}
                </button>
              </div>
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