import React from 'react';
import { MessageCircle, Phone, MapPin, Clock, Mail } from 'lucide-react';
import './Contact.css';

const Contact = () => {
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
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Ready to create your perfect custom garment? Get in touch with us today 
            to schedule a consultation or ask any questions you may have.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Methods */}
          <div className="contact-methods">
            <div className="contact-card primary-card">
              <div className="contact-icon">
                <MessageCircle size={32} />
              </div>
              <h3>WhatsApp</h3>
              <p>Get instant responses to your questions</p>
              <button className="btn btn-primary" onClick={handleWhatsAppClick}>
                <MessageCircle size={18} />
                Chat on WhatsApp
              </button>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={32} />
              </div>
              <h3>Phone</h3>
              <p>+1 (234) 567-8900</p>
              <button className="btn btn-secondary" onClick={handleCallClick}>
                <Phone size={18} />
                Call Now
              </button>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Mail size={32} />
              </div>
              <h3>Email</h3>
              <p>info@goldenthreads.com</p>
              <a href="mailto:info@goldenthreads.com" className="btn btn-secondary">
                <Mail size={18} />
                Send Email
              </a>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="location-hours">
            <div className="location-section">
              <h2>Visit Our Showroom</h2>
              <div className="location-info">
                <div className="location-item">
                  <MapPin size={24} />
                  <div>
                    <h4>Address</h4>
                    <p>123 Fashion Street<br />New York, NY 10001</p>
                  </div>
                </div>
                <div className="location-item">
                  <Clock size={24} />
                  <div>
                    <h4>Business Hours</h4>
                    <div className="hours-list">
                      <p><strong>Monday - Friday:</strong> 9:00 AM - 7:00 PM</p>
                      <p><strong>Saturday:</strong> 10:00 AM - 6:00 PM</p>
                      <p><strong>Sunday:</strong> 12:00 PM - 5:00 PM</p>
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
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Services Info */}
          <div className="services-info">
            <h2>Our Services</h2>
            <div className="services-grid">
              <div className="service-info-card">
                <h4>Custom Measurements</h4>
                <p>Professional fitting sessions to ensure perfect measurements for your custom garments.</p>
              </div>
              <div className="service-info-card">
                <h4>Design Consultation</h4>
                <p>Work with our designers to create the perfect style that matches your vision and needs.</p>
              </div>
              <div className="service-info-card">
                <h4>Fabric Selection</h4>
                <p>Choose from our extensive collection of premium fabrics from renowned mills worldwide.</p>
              </div>
              <div className="service-info-card">
                <h4>Fitting Sessions</h4>
                <p>Multiple fitting appointments to ensure your garment fits perfectly and meets your expectations.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="contact-cta">
            <h2>Ready to Get Started?</h2>
            <p>Book your consultation today and begin your journey to exceptional custom clothing.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleWhatsAppClick}>
                <MessageCircle size={18} />
                Book via WhatsApp
              </button>
              <button className="btn btn-secondary" onClick={handleCallClick}>
                <Phone size={18} />
                Call to Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;