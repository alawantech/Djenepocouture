import React from 'react';
import { MessageCircle, Star } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, showDescription = false }) => {
  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in ${product.name}. Price: ${product.price}F`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Generate rating data (you can replace this with actual data from your database)
  const getProductRating = (productId) => {
    const ratings = [4.5, 4.7, 4.3, 4.8, 4.6, 4.4, 4.9, 4.2, 4.5, 4.6];
    const hash = productId ? productId.split('').reduce((a, b) => a + b.charCodeAt(0), 0) : 0;
    return ratings[hash % ratings.length];
  };
  
  const getReviewCount = (productId) => {
    const counts = [45, 67, 89, 123, 156, 78, 234, 98, 145, 187];
    const hash = productId ? productId.split('').reduce((a, b) => a + b.charCodeAt(0), 0) : 0;
    return counts[hash % counts.length];
  };
  
  // Use actual rating from database, fallback to generated if not available
  const rating = product.rating || getProductRating(product.id || product.name);
  const reviewCount = product.reviewCount || getReviewCount(product.id || product.name);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="star filled" size={16} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="star half-filled" size={16} />);
      } else {
        stars.push(<Star key={i} className="star empty" size={16} />);
      }
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <button className="btn btn-primary quick-buy" onClick={handleWhatsAppClick}>
            <MessageCircle size={18} />
            Quick Buy
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars-container">
            {renderStars(rating)}
          </div>
          <span className="rating-text">
            <span className="rating-number">{rating.toFixed(1)}</span>
            <span className="review-count">({reviewCount} reviews)</span>
          </span>
        </div>
        
        {showDescription && <p className="product-description">{product.description}</p>}
        <div className="product-price">{product.price}F</div>
        <button className="btn btn-primary whatsapp-btn" onClick={handleWhatsAppClick}>
          <MessageCircle size={18} />
          Buy on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ProductCard;