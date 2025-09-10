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
            <h1 className="page-title">{t('about.title')}</h1>
            <p className="page-subtitle">
              {t('about.subtitle')}
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Master Tailor at Work" 
            />
          </div>
        </div>

        {/* Story Section */}
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
          <h2 className="section-title">{t('about.services.title')}</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>{t('about.services.bespoke.title')}</h3>
              <p>{t('about.services.bespoke.description')}</p>
            </div>
            <div className="service-item">
              <h3>{t('about.services.formal.title')}</h3>
              <p>{t('about.services.formal.description')}</p>
            </div>
            <div className="service-item">
              <h3>{t('about.services.alterations.title')}</h3>
              <p>{t('about.services.alterations.description')}</p>
            </div>
            <div className="service-item">
              <h3>{t('about.services.consultation.title')}</h3>
              <p>{t('about.services.consultation.description')}</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2 className="section-title">{t('about.team.title')}</h2>
          <div className="team-grid">
            <div className="team-member">
              <img 
                src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Master Tailor" 
              />
              <h3>Michael Thompson</h3>
              <p>{t('about.team.founder')}</p>
              <span>25+ {t('about.team.experience')}</span>
            </div>
            <div className="team-member">
              <img 
                src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Senior Designer" 
              />
              <h3>Sarah Chen</h3>
              <p>{t('about.team.designer')}</p>
              <span>15+ {t('about.team.experience')}</span>
            </div>
            <div className="team-member">
              <img 
                src="https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Alterations Specialist" 
              />
              <h3>David Rodriguez</h3>
              <p>{t('about.team.specialist')}</p>
              <span>12+ {t('about.team.experience')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;