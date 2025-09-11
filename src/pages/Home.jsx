import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Clock, Shirt, Crown, Sparkles } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../data/products';
import './Home.css';

// Import service images
import service1 from '../assets/images/service1.png';
import service2 from '../assets/images/service2.png';
import service3 from '../assets/images/service3.png';
import service4 from '../assets/images/service4.png';
import service5 from '../assets/images/service5.png';

// Import hero images
import hero1 from '../assets/images/hero1.jpg';
import hero2 from '../assets/images/hero2.jpg';
import hero3 from '../assets/images/hero3.jpg';

// Hero images array
const heroImages = [
  { src: hero1, alt: 'Premium African Fashion' },
  { src: hero2, alt: 'Traditional Elegance' },
  { src: hero3, alt: 'Modern African Style' }
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { t, isLoaded } = useTranslation();

  // Preload hero images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = heroImages.map(image => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = image.src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true); // Still show the component even if preload fails
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        const products = await getProducts();
        // Filter only products that are marked as featured
        const featuredOnly = products.filter(product => product.isfeatured === true);
        setFeaturedProducts(featuredOnly);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
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
                <span className="golden-text">
                  {isLoaded ? t('home.hero.title') : 'Djenepo Couture'}
                </span>
              </h1>
              <h2 className="hero-subtitle-animated">
                {isLoaded ? t('home.hero.subtitle') : 'Premium Custom Tailoring'}
              </h2>
              <p className="hero-subtitle">
                {isLoaded ? t('home.hero.description') : 'Experience the art of bespoke tailoring with over 7 years of expertise.'}
              </p>
              <div className="hero-buttons">
                <Link to="/products" className="btn btn-primary">
                  {isLoaded ? t('home.hero.viewCollection') : 'View Our Collection'}
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  {isLoaded ? t('home.hero.bookConsultation') : 'Book Consultation'}
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-slider">
                {imagesLoaded ? (
                  <>
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
                  </>
                ) : (
                  <div className="hero-image-loading">
                    <div className="loading-placeholder">
                      <div className="loading-spinner"></div>
                      <p>Loading images...</p>
                    </div>
                  </div>
                )}
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
          ) : error ? (
            <div className="no-products">
              <h3>Error Loading Featured Products</h3>
              <p>Database connection error: {error}</p>
            </div>
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
                  <img src={service1} alt="Vestes Élégantes" className="service-image" />
                </div>
              </div>
              <h3>{t('home.services.vestes.title')}</h3>
              <p>{t('home.services.vestes.description')}</p>
              <Link to="/products" className="service-link featured-link">{t('home.services.explore')}</Link>
            </div>
            <div className="service-card premium">
              <div className="service-icon abacosts">
                <div className="icon-wrapper">
                  <img src={service2} alt="Abacosts Authentiques" className="service-image" />
                </div>
              </div>
              <h3>{t('home.services.abacosts.title')}</h3>
              <p>{t('home.services.abacosts.description')}</p>
              <Link to="/products" className="service-link premium-link">{t('home.services.explore')}</Link>
            </div>
            <div className="service-card elegant">
              <div className="service-icon tunique">
                <div className="icon-wrapper">
                  <img src={service3} alt="Tuniques Élégantes" className="service-image" />
                </div>
              </div>
              <h3>{t('home.services.tunique.title')}</h3>
              <p>{t('home.services.tunique.description')}</p>
              <Link to="/products" className="service-link elegant-link">{t('home.services.explore')}</Link>
            </div>
            <div className="service-card artistic">
              <div className="service-icon broderie">
                <div className="icon-wrapper">
                  <img src={service4} alt="Broderie Artisanale" className="service-image" />
                </div>
              </div>
              <h3>{t('home.services.broderie.title')}</h3>
              <p>{t('home.services.broderie.description')}</p>
              <Link to="/products" className="service-link artistic-link">{t('home.services.explore')}</Link>
            </div>
            <div className="service-card professional">
              <div className="service-icon chemises">
                <div className="icon-wrapper">
                  <img src={service5} alt="Chemises Designer" className="service-image" />
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
