import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import LanguageToggle from './LanguageToggle';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.products') },
    { path: '/#services', label: t('nav.services'), isSection: true },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (item) => {
    setIsMenuOpen(false);
    
    if (item.isSection) {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        window.location.href = '/#services';
        return;
      }
      
      // If we're on the home page, scroll to services section
      const servicesSection = document.querySelector('.services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
              <img src="/images/log1.png" alt="Logo" className="nav-logo-img" />
          </Link>
          
          <div className={`nav-links ${isMenuOpen ? 'nav-links-mobile' : ''}`}>
            {navItems.map(item => (
              item.isSection ? (
                <button
                  key={item.path}
                  className={`nav-link ${location.pathname === '/' && location.hash === '#services' ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </Link>
              )
            ))}
            <div className="nav-language-mobile">
              <LanguageToggle />
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-language-desktop">
              <LanguageToggle />
            </div>
            <button className="menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;