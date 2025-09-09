import React from 'react';
import { MessageCircle } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, showDescription = false }) => {
  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in ${product.name}. Price: $${product.price}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
        {showDescription && <p className="product-description">{product.description}</p>}
        <div className="product-price">${product.price}</div>
        <button className="btn btn-primary whatsapp-btn" onClick={handleWhatsAppClick}>
          <MessageCircle size={18} />
          Buy on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ProductCard;