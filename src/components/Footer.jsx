import React from 'react';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Golden Threads</h3>
            <p className="footer-description">
              Premium custom tailoring services with over 20 years of experience. 
              We create exceptional clothing that fits your style perfectly.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
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
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Golden Threads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;