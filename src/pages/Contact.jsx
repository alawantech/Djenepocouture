import React from 'react';
import { MessageCircle, Phone, MapPin, Mail, Shirt } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import './Contact.css';
import service1 from '../assets/images/service1.png';
import service2 from '../assets/images/service2.png';
import service3 from '../assets/images/service3.png';
import service4 from '../assets/images/service4.png';
import service5 from '../assets/images/service5.png';

const Contact = () => {
  const { t, currentLanguage } = useTranslation();

  const getWhatsAppMessage = (type = 'general') => {
    const messages = {
      en: {
        general: "Hello! I'm interested in Djenepo Couture's services. I would like to know more about your custom tailoring and African fashion collections.",
        products: "Hello! I would like to explore your Premium Vestes, Abacosts, Tuniques, Broderie, and Designer Chemises collections. Can you please provide more information?",
        consultation: "Hello! I would like to book a consultation for custom tailoring services. When would be a good time to visit your showroom?"
      },
      fr: {
        general: "Bonjour! Je suis intéressé(e) par les services de Djenepo Couture. J'aimerais en savoir plus sur votre couture sur mesure et vos collections de mode africaine.",
        products: "Bonjour! J'aimerais explorer vos collections de Vestes Premium, Abacosts, Tuniques, Broderie, et Chemises Designer. Pouvez-vous me fournir plus d'informations?",
        consultation: "Bonjour! J'aimerais réserver une consultation pour des services de couture sur mesure. Quand serait-il possible de visiter votre showroom?"
      }
    };
    
    return messages[currentLanguage]?.[type] || messages.en[type];
  };

  const handleWhatsAppClick = (messageType = 'general') => {
    const message = getWhatsAppMessage(messageType);
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

  return (
    <div className="contact-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{t('contact.title')}</h1>
          <p className="page-subtitle">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Methods */}
          <div className="contact-methods">
            <div className="contact-card primary-card">
              <div className="contact-icon">
                <MessageCircle size={32} />
              </div>
              <h3>{t('contact.methods.whatsapp.title')}</h3>
              <p>{t('contact.methods.whatsapp.description')}</p>
              <button className="btn btn-primary" onClick={() => handleWhatsAppClick('general')}>
                <MessageCircle size={18} />
                {t('contact.methods.whatsapp.button')}
              </button>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={32} />
              </div>
              <h3>{t('contact.methods.phone.title')}</h3>
              <p>+223 99 85 72 17</p>
              <button className="btn btn-secondary" onClick={handleCallClick}>
                <Phone size={18} />
                {t('contact.methods.phone.button')}
              </button>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Mail size={32} />
              </div>
              <h3>{t('contact.methods.email.title')}</h3>
              <p>info@djenepocouture.com</p>
              <a href="mailto:info@djenepocouture.com" className="btn btn-secondary">
                <Mail size={18} />
                {t('contact.methods.email.button')}
              </a>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="social-media-section">
            <h2>{t('contact.social.title')}</h2>
            <p>{t('contact.social.subtitle')}</p>
            <div className="social-media-cards">
              <div className="social-card facebook-card" onClick={() => handleSocialClick('facebook')}>
                <div className="social-icon">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="social-content">
                  <h3>{t('contact.social.facebook.title')}</h3>
                  <p>{t('contact.social.facebook.description')}</p>
                  <span className="social-link">{t('contact.social.facebook.link')}</span>
                </div>
              </div>
              
              <div className="social-card tiktok-card" onClick={() => handleSocialClick('tiktok')}>
                <div className="social-icon">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
                <div className="social-content">
                  <h3>{t('contact.social.tiktok.title')}</h3>
                  <p>{t('contact.social.tiktok.description')}</p>
                  <span className="social-link">{t('contact.social.tiktok.handle')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="location-hours">
            <div className="location-section">
              <h2>{t('contact.location.title')}</h2>
              <div className="location-info">
                <div className="location-item">
                  <MapPin size={24} />
                  <div>
                    <h4>{t('contact.location.address')}</h4>
                    <p>Bamako, Missabougou<br />Près de l'hôpital du Mali</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="map-section">
              <div className="map-placeholder">
                <MapPin size={48} />
                <h3>Djenepo Couture Showroom</h3>
                <p>Bamako, Missabougou</p>
                <a 
                  href="https://maps.google.com/?q=Bamako+Missabougou+près+de+l'hôpital+du+Mali" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  {t('contact.location.viewMaps')}
                </a>
              </div>
            </div>
          </div>

          {/* Services Info - Same as Home Page */}
          <div className="services-info">
            <h2>{t('contact.services.title')}</h2>
            <div className="services-grid">
              <div className="service-info-card">
                <div className="service-icon-contact">
                  <img src={service1} alt="Premium Vestes" className="service-image-contact" />
                </div>
                <h4>{t('home.services.vestes.title')}</h4>
                <p>{t('home.services.vestes.description')}</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => handleWhatsAppClick('products')}
                >
                  <MessageCircle size={16} />
                  {t('contact.services.inquire')}
                </button>
              </div>
              <div className="service-info-card">
                <div className="service-icon-contact">
                  <img src={service2} alt="Authentic Abacosts" className="service-image-contact" />
                </div>
                <h4>{t('home.services.abacosts.title')}</h4>
                <p>{t('home.services.abacosts.description')}</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => handleWhatsAppClick('products')}
                >
                  <MessageCircle size={16} />
                  {t('contact.services.inquire')}
                </button>
              </div>
              <div className="service-info-card">
                <div className="service-icon-contact">
                  <img src={service3} alt="Elegant Tuniques" className="service-image-contact" />
                </div>
                <h4>{t('home.services.tunique.title')}</h4>
                <p>{t('home.services.tunique.description')}</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => handleWhatsAppClick('products')}
                >
                  <MessageCircle size={16} />
                  {t('contact.services.inquire')}
                </button>
              </div>
              <div className="service-info-card">
                <div className="service-icon-contact">
                  <img src={service4} alt="Artisanal Broderie" className="service-image-contact" />
                </div>
                <h4>{t('home.services.broderie.title')}</h4>
                <p>{t('home.services.broderie.description')}</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => handleWhatsAppClick('products')}
                >
                  <MessageCircle size={16} />
                  {t('contact.services.inquire')}
                </button>
              </div>
              <div className="service-info-card">
                <div className="service-icon-contact">
                  <img src={service5} alt="Designer Chemises" className="service-image-contact" />
                </div>
                <h4>{t('home.services.chemises.title')}</h4>
                <p>{t('home.services.chemises.description')}</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => handleWhatsAppClick('products')}
                >
                  <MessageCircle size={16} />
                  {t('contact.services.inquire')}
                </button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="contact-cta">
            <h2>{t('contact.cta.title')}</h2>
            <p>{t('contact.cta.description')}</p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={() => handleWhatsAppClick('consultation')}>
                <MessageCircle size={18} />
                {t('contact.cta.bookWhatsapp')}
              </button>
              <button className="btn btn-secondary" onClick={handleCallClick}>
                <Phone size={18} />
                {t('contact.cta.callSchedule')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;