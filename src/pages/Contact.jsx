import React from 'react';
import { MessageCircle, Phone, MapPin, Mail, Shirt } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import './Contact.css';

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
                  <img src="/src/assets/images/service1.png" alt="Premium Vestes" className="service-image-contact" />
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
                  <img src="/src/assets/images/service2.png" alt="Authentic Abacosts" className="service-image-contact" />
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
                  <img src="/src/assets/images/service3.png" alt="Elegant Tuniques" className="service-image-contact" />
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
                  <img src="/src/assets/images/service4.png" alt="Artisanal Broderie" className="service-image-contact" />
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
                  <img src="/src/assets/images/service5.png" alt="Designer Chemises" className="service-image-contact" />
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