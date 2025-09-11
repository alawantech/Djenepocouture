import React from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
      <div className="about-hero">
        <div className="about-content">
          <h1>{t('about.hero.title')}</h1>
          <p className="page-subtitle">{t('about.hero.subtitle')}</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">7+</span>
              <span className="stat-label">{t('about.stats.years')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">{t('about.stats.clients')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">{t('about.stats.projects')}</span>
            </div>
          </div>
        </div>
        <div className="about-image">
          <img src="/src/assets/images/hero1.jpg" alt="Djenepo Couture - Professional Fashion Design" />
          <div className="image-overlay">
            <div className="overlay-content">
              <span className="overlay-text">{t('about.hero.overlay')}</span>
            </div>
          </div>
        </div>
      </div>        {/* Story Section */}
        <div className="story-section">
          <div className="story-content">
            <h2 className="section-title">{t('about.story.title')}</h2>
            <div className="story-text">
              <p>
                {t('about.story.paragraph1')}
              </p>
              <p>
                {t('about.story.paragraph2')}
              </p>
              <p>
                {t('about.story.paragraph3')}
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2 className="section-title">{t('about.values.title')}</h2>
          <div className="values-grid">
            <div className="value-card">
              <Award size={48} />
              <h3>{t('about.values.excellence.title')}</h3>
              <p>{t('about.values.excellence.description')}</p>
            </div>
            <div className="value-card">
              <Users size={48} />
              <h3>{t('about.values.service.title')}</h3>
              <p>{t('about.values.service.description')}</p>
            </div>
            <div className="value-card">
              <Clock size={48} />
              <h3>{t('about.values.craft.title')}</h3>
              <p>{t('about.values.craft.description')}</p>
            </div>
            <div className="value-card">
              <Heart size={48} />
              <h3>{t('about.values.passion.title')}</h3>
              <p>{t('about.values.passion.description')}</p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="services-detail">
          <h2 className="section-title">{t('home.services.title')}</h2>
          <div className="services-list">
            <div className="service-item">
              <div className="service-icon-small">
                <img src="/src/assets/images/service1.png" alt="Premium Vestes" className="service-image-small" />
              </div>
              <div className="service-content">
                <h3>{t('home.services.vestes.title')}</h3>
                <p>{t('home.services.vestes.description')}</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-icon-small">
                <img src="/src/assets/images/service2.png" alt="Authentic Abacosts" className="service-image-small" />
              </div>
              <div className="service-content">
                <h3>{t('home.services.abacosts.title')}</h3>
                <p>{t('home.services.abacosts.description')}</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-icon-small">
                <img src="/src/assets/images/service3.png" alt="Elegant Tuniques" className="service-image-small" />
              </div>
              <div className="service-content">
                <h3>{t('home.services.tunique.title')}</h3>
                <p>{t('home.services.tunique.description')}</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-icon-small">
                <img src="/src/assets/images/service4.png" alt="Artisanal Broderie" className="service-image-small" />
              </div>
              <div className="service-content">
                <h3>{t('home.services.broderie.title')}</h3>
                <p>{t('home.services.broderie.description')}</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-icon-small">
                <img src="/src/assets/images/service5.png" alt="Designer Chemises" className="service-image-small" />
              </div>
              <div className="service-content">
                <h3>{t('home.services.chemises.title')}</h3>
                <p>{t('home.services.chemises.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;