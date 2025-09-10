import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../data/products';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
                <span className="golden-text">Golden Threads</span>
                <br />
                Premium Custom Tailoring
              </h1>
              <p className="hero-subtitle">
                Experience the art of bespoke tailoring with over 20 years of expertise. 
                We create extraordinary clothing that reflects your unique style and personality.
              </p>
              <div className="hero-buttons">
                <Link to="/products" className="btn btn-primary">
                  View Our Collection
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Book Consultation
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Premium Tailoring" 
              />
            </div>
          </div>
        </div>
      </section>


      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Collection</h2>
          <p className="section-subtitle">
            Discover our most popular custom-tailored pieces, crafted with precision and attention to detail
            {!loading && featuredProducts.length > 0 && (
              <span className="featured-count"> • {featuredProducts.length} featured {featuredProducts.length === 1 ? 'product' : 'products'}</span>
            )}
          </p>
          {loading ? (
            <div className="no-products"><h3>Loading products...</h3></div>
          ) : featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h3>No featured products available at the moment</h3>
              <p>Check back soon for our latest featured collection!</p>
            </div>
          )}
          <div className="featured-cta">
            <Link to="/products" className="btn btn-primary">
              View All Products
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
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <Users size={32} />
              <h3>5000+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-item">
              <Award size={32} />
              <h3>100%</h3>
              <p>Custom Made</p>
            </div>
            <div className="stat-item">
              <Star size={32} />
              <h3>4.9</h3>
              <p>Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">👔</div>
              <h3>Custom Suits</h3>
              <p>Bespoke suits tailored to perfection for business, weddings, and special occasions.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">👗</div>
              <h3>Evening Wear</h3>
              <p>Elegant dresses and gowns for formal events, galas, and memorable occasions.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">👖</div>
              <h3>Casual Wear</h3>
              <p>Comfortable yet stylish casual clothing tailored to your lifestyle and preferences.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;