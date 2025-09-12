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
    const whatsappUrl = `https://wa.me/22383561498?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:+22399857217', '_self');
  };

  const handleSocialClick = (platform) => {
    const urls = {
      facebook: 'https://www.facebook.com/100076207141933/posts/pfbid0Ssjs7JDEd1m5E7HC3UxFXSgVw3BgdwVsSSwg72nmKLK4Jgw21tYGPLboQ9egv8UAl/?sfnsn=wa',
      tiktok: 'https://www.tiktok.com/@djenepocouture?_t=ZM-8zf7CLsS1hu&_r=1'
    };
    window.open(urls[platform], '_blank');
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

          <div className="footer-section">
            <h4>{t('footer.followUs')}</h4>
            <div className="footer-social">
              <button className="social-btn facebook-btn" onClick={() => handleSocialClick('facebook')}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>
              <button className="social-btn tiktok-btn" onClick={() => handleSocialClick('tiktok')}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                <span>@djenepocouture</span>
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