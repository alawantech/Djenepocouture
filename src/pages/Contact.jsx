import React from 'react';
import { MessageCircle, Phone, MapPin, Clock, Mail } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();

  const handleWhatsAppClick = () => {
    const message = "Hello! I'd like to inquire about your tailoring services.";
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:+1234567890', '_self');
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
              <button className="btn btn-primary" onClick={handleWhatsAppClick}>
                <MessageCircle size={18} />
                {t('contact.methods.whatsapp.button')}
              </button>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={32} />
              </div>
              <h3>{t('contact.methods.phone.title')}</h3>
              <p>+1 (234) 567-8900</p>
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
              <p>info@goldenthreads.com</p>
              <a href="mailto:info@goldenthreads.com" className="btn btn-secondary">
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
                    <p>123 Fashion Street<br />New York, NY 10001</p>
                  </div>
                </div>
                <div className="location-item">
                  <Clock size={24} />
                  <div>
                    <h4>{t('contact.location.hours')}</h4>
                    <div className="hours-list">
                      <p><strong>{t('contact.location.monday_friday')}</strong> 9:00 AM - 7:00 PM</p>
                      <p><strong>{t('contact.location.saturday')}</strong> 10:00 AM - 6:00 PM</p>
                      <p><strong>{t('contact.location.sunday')}</strong> 12:00 PM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="map-section">
              <div className="map-placeholder">
                <MapPin size={48} />
                <h3>Golden Threads Showroom</h3>
                <p>123 Fashion Street, New York</p>
                <a 
                  href="https://maps.google.com/?q=123+Fashion+Street+New+York+NY+10001" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  {t('contact.location.viewMaps')}
                </a>
              </div>
            </div>
          </div>

          {/* Services Info */}
          <div className="services-info">
            <h2>{t('contact.services.title')}</h2>
            <div className="services-grid">
              <div className="service-info-card">
                <h4>{t('contact.services.measurements.title')}</h4>
                <p>{t('contact.services.measurements.description')}</p>
              </div>
              <div className="service-info-card">
                <h4>{t('contact.services.design.title')}</h4>
                <p>{t('contact.services.design.description')}</p>
              </div>
              <div className="service-info-card">
                <h4>{t('contact.services.fabric.title')}</h4>
                <p>{t('contact.services.fabric.description')}</p>
              </div>
              <div className="service-info-card">
                <h4>{t('contact.services.fitting.title')}</h4>
                <p>{t('contact.services.fitting.description')}</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="contact-cta">
            <h2>{t('contact.cta.title')}</h2>
            <p>{t('contact.cta.description')}</p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleWhatsAppClick}>
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