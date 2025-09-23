import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MessageCircle, Star, ArrowLeft, Heart, Share } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productDoc = await getDoc(doc(db, 'products', id));
        
        if (productDoc.exists()) {
          const productData = { id: productDoc.id, ...productDoc.data() };
          setProduct(productData);
          
          // Auto-assign rating and review count if not present
          if (!productData.rating || !productData.reviewCount) {
            const rating = getProductRating(productData.id);
            const reviewCount = getReviewCount(productData.id);
            setProduct(prev => ({
              ...prev,
              rating,
              reviewCount
            }));
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Helper functions for rating
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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="star filled" size={20} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="star half-filled" size={20} />);
      } else {
        stars.push(<Star key={i} className="star empty" size={20} />);
      }
    }
    return stars;
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;

    let message = t('products.whatsapp.message');
    message = message.replace('{name}', product.name || '');
    
    if (product.description && product.description.trim()) {
      message = message.replace('{description}', product.description);
    } else {
      message = message.replace(' {description}', '');
    }
    
    message = message.replace('{price}', `${product.price}F`);
    
    // Add product link so admin can view the product
    const productUrl = window.location.href;
    message += `\n\n${t('products.whatsapp.productLink')}: ${productUrl}`;
    
    const phoneNumber = '22383561498';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this amazing product: ${product.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert(t('common.linkCopied'));
      }
    } catch (err) {
      console.log('Error sharing:', err);
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert(t('common.linkCopied'));
      } catch (clipboardErr) {
        console.log('Clipboard error:', clipboardErr);
      }
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // You can implement actual favorite functionality here
    // For now, it's just a UI toggle
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error-state">
          <h2>{t('products.detail.productNotFound')}</h2>
          <p>{t('products.detail.productNotFoundDesc')}</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/products')}
          >
            {t('products.detail.backToProducts')}
          </button>
        </div>
      </div>
    );
  }

  // Create image array (for future multiple images support)
  const images = product.image ? [product.image] : [];

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <button 
          className="back-button"
          onClick={() => navigate('/products')}
        >
          <ArrowLeft size={20} />
          {t('products.detail.backToProducts')}
        </button>
        
        <div className="header-actions">
          <button 
            className={`action-button ${isFavorited ? 'favorited' : ''}`}
            onClick={toggleFavorite}
            title={isFavorited ? t('products.detail.removeFromFavorites') : t('products.detail.addToFavorites')}
          >
            <Heart size={20} />
          </button>
          <button 
            className="action-button"
            onClick={handleShare}
            title={t('products.detail.shareProduct')}
          >
            <Share size={20} />
          </button>
        </div>
      </div>

      <div className="product-detail-content">
        <div className="product-images-section">
          <div className="main-image-container">
            <img 
              src={images[selectedImage] || product.image} 
              alt={product.name}
              className="main-product-image"
            />
          </div>
          
          {images.length > 1 && (
            <div className="image-thumbnails">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info-section">
          <div className="product-header-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating-detail">
              <div className="stars-container">
                {renderStars(product.rating || getProductRating(product.id))}
              </div>
              <span className="rating-info">
                <span className="rating-number">
                  {(product.rating || getProductRating(product.id)).toFixed(1)}
                </span>
                <span className="rating-separator">•</span>
                <span className="review-count">
                  {product.reviewCount || getReviewCount(product.id)} {t('products.reviews')}
                </span>
              </span>
            </div>

            <div className="product-price-detail">
              <span className="price-amount">{product.price}F</span>
              <span className="price-label">{t('products.detail.price')}</span>
            </div>
          </div>

          {product.description && (
            <div className="product-description-section">
              <h3>{t('products.detail.description')}</h3>
              <p className="product-description-text">{product.description}</p>
            </div>
          )}

          {product.productCategory && (
            <div className="product-category-section">
              <h3>{t('products.detail.category')}</h3>
              <span className="product-category-tag">{product.productCategory}</span>
            </div>
          )}

          <div className="product-features">
            <h3>{t('products.detail.productFeatures')}</h3>
            <ul className="features-list">
              <li>🧵 {t('products.detail.features.premiumFabric')}</li>
              <li>✂️ {t('products.detail.features.expertCraftsmanship')}</li>
              <li>📏 {t('products.detail.features.customFit')}</li>
              <li>🎨 {t('products.detail.features.uniqueDesign')}</li>
              <li>💎 {t('products.detail.features.attentionToDetail')}</li>
            </ul>
          </div>

          <div className="purchase-section">
            <button 
              className="btn btn-primary purchase-btn"
              onClick={handleWhatsAppOrder}
            >
              <MessageCircle size={20} />
              {t('products.whatsapp.buyOnWhatsapp')}
            </button>
            
            <div className="purchase-info">
              <p className="info-text">
                🚀 {t('products.detail.purchaseInfo.quickOrdering')}<br />
                📞 {t('products.detail.purchaseInfo.instantSupport')}<br />
                🚚 {t('products.detail.purchaseInfo.fastDelivery')}
              </p>
            </div>
          </div>

          {product.isfeatured && (
            <div className="featured-badge-detail">
              ⭐ {t('products.detail.featuredProduct')}
            </div>
          )}

          <div className="product-meta-info">
            <div className="meta-item">
              <span className="meta-label">{t('products.detail.productId')}:</span>
              <span className="meta-value">{product.id}</span>
            </div>
            {product.createdAt && (
              <div className="meta-item">
                <span className="meta-label">{t('products.detail.added')}:</span>
                <span className="meta-value">
                  {product.createdAt.toDate ? product.createdAt.toDate().toLocaleDateString() : t('products.detail.recently')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;