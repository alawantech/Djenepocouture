import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Clock } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../data/products';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="golden-text">{t('home.hero.title')}</span>
                <br />
                {t('home.hero.subtitle')}
              </h1>
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
              <img 
                src="/src/assets/images/hero1.jpg" 
                alt="Premium Tailoring" 
              />
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
              <h3>20+</h3>
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
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">👔</div>
              <h3>{t('home.services.suits.title')}</h3>
              <p>{t('home.services.suits.description')}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">👗</div>
              <h3>{t('home.services.evening.title')}</h3>
              <p>{t('home.services.evening.description')}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">👖</div>
              <h3>{t('home.services.casual.title')}</h3>
              <p>{t('home.services.casual.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;