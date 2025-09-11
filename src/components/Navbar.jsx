import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import LanguageToggle from './LanguageToggle';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.products') },
    { path: '/#services', label: t('nav.services'), isSection: true },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (location.pathname === '/') {
      // If already on home page, just scroll to top
      scrollToTop();
    } else {
      // Navigate to home page and scroll to top
      navigate('/');
      // Small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
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
    } else {
      // For regular navigation links, scroll to top after navigation
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <a 
            href="/" 
            className="nav-logo"
            onClick={handleLogoClick}
          >
              <img src="/images/log1.png" alt="Logo" className="nav-logo-img" />
          </a>
          
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