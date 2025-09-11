import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Clock, Shirt, Crown, Sparkles } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../data/products';
import './Home.css';

// Hero images array
const heroImages = [
  { src: '/src/assets/images/hero1.jpg', alt: 'Premium African Fashion' },
  { src: '/src/assets/images/hero2.jpg', alt: 'Traditional Elegance' },
  { src: '/src/assets/images/hero3.jpg', alt: 'Modern African Style' }
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      // Filter only products that are marked as featured
      const featuredOnly = products.filter(product => product.isfeatured === true);
      setFeaturedProducts(featuredOnly);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Auto-slide hero images every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(slideInterval);
  }, []);

  // Handle scrolling to services section if hash is present
  useEffect(() => {
    if (window.location.hash === '#services') {
      setTimeout(() => {
        const servicesSection = document.querySelector('.services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100); // Small delay to ensure page is fully loaded
    }
  }, []);

  // Handle manual slide navigation
  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1);
  };

  const goToNextSlide = () => {
    setCurrentImageIndex(currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="golden-text">{t('home.hero.title')}</span>
              </h1>
              <h2 className="hero-subtitle-animated">
                {t('home.hero.subtitle')}
              </h2>
              <p className="hero-subtitle">
                {t('home.hero.description')}
              </p>
              <div className="hero-buttons">
                <Link to="/products" className="btn btn-primary">
                  {t('home.hero.viewCollection')}
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  {t('home.hero.bookConsultation')}
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-slider">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="slider-image"
                    />
                  </div>
                ))}
                
                {/* Slider Indicators */}
                <div className="slider-indicators">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Slider Navigation */}
                <button
                  className="slider-nav prev"
                  onClick={goToPrevSlide}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  className="slider-nav next"
                  onClick={goToNextSlide}
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">{t('home.featured.title')}</h2>
          <p className="section-subtitle">
            {t('home.featured.subtitle')}
            {!loading && featuredProducts.length > 0 && (
              <span className="featured-count"> • {featuredProducts.length} {t('home.featured.featured')} {featuredProducts.length === 1 ? t('home.featured.product') : t('home.featured.products')}</span>
            )}
          </p>
          {loading ? (
            <div className="no-products"><h3>{t('home.featured.loading')}</h3></div>
          ) : featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h3>{t('home.featured.noProducts')}</h3>
              <p>{t('home.featured.checkBack')}</p>
            </div>
          )}
          <div className="featured-cta">
            <Link to="/products" className="btn btn-primary">
              {t('home.featured.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <Clock size={32} />
              <h3>7+</h3>
              <p>{t('home.stats.experience')}</p>
            </div>
            <div className="stat-item">
              <Users size={32} />
              <h3>5000+</h3>
              <p>{t('home.stats.clients')}</p>
            </div>
            <div className="stat-item">
              <Award size={32} />
              <h3>100%</h3>
              <p>{t('home.stats.custom')}</p>
            </div>
            <div className="stat-item">
              <Star size={32} />
              <h3>4.9</h3>
              <p>{t('home.stats.rating')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">{t('home.services.title')}</h2>
          <p className="section-subtitle">{t('home.services.subtitle')}</p>
          <div className="services-grid">
            <div className="service-card featured">
              <div className="service-icon vestes">
                <div className="icon-wrapper">
                  <img src="/src/assets/images/service1.png" alt="Vestes Élégantes" className="service-image" />
                </div>
              </div>
              <h3>{t('home.services.vestes.title')}</h3>
              <p>{t('home.services.vestes.description')}</p>
              <Link to="/products" className="service-link featured-link">{t('home.services.explore')}</Link>
            </div>
            <div className="service-card premium">
              <div className="service-icon abacosts">
                <div className="icon-wrapper">
                  <img src="/src/assets/images/service2.png" alt="Abacosts Authentiques" className="service-image" />
                </div>
              </div>
              <h3>{t('home.services.abacosts.title')}</h3>
              <p>{t('home.services.abacosts.description')}</p>
              <Link to="/products" className="service-link premium-link">{t('home.services.explore')}</Link>
            </div>
            <div className="service-card elegant">
              <div className="service-icon tunique">
                <div className="icon-wrapper">
                  <img src="/src/assets/images/service3.png" alt="Tuniques Élégantes" className="service-image" />
                </div>
              </div>
              <h3>{t('home.services.tunique.title')}</h3>
              <p>{t('home.services.tunique.description')}</p>
              <Link to="/products" className="service-link elegant-link">{t('home.services.explore')}</Link>
            </div>
            <div className="service-card artistic">
              <div className="service-icon broderie">
                <div className="icon-wrapper">
                  <img src="/src/assets/images/service4.png" alt="Broderie Artisanale" className="service-image" />
                </div>
              </div>
              <h3>{t('home.services.broderie.title')}</h3>
              <p>{t('home.services.broderie.description')}</p>
              <Link to="/products" className="service-link artistic-link">{t('home.services.explore')}</Link>
            </div>
            <div className="service-card professional">
              <div className="service-icon chemises">
                <div className="icon-wrapper">
                  <img src="/src/assets/images/service5.png" alt="Chemises Designer" className="service-image" />
                </div>
              </div>
              <h3>{t('home.services.chemises.title')}</h3>
              <p>{t('home.services.chemises.description')}</p>
              <Link to="/products" className="service-link professional-link">{t('home.services.explore')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
