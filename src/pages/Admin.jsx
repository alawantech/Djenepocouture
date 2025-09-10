import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useTranslation } from "../contexts/TranslationContext";
import AllProductsSection from "../components/AllProductsSection";
import ImageCropper from "../components/ImageCropper";
import "./Admin.css";

// Heroicons imports for our new icons
import {
  TagIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  Bars3Icon,
  PlusIcon,
  CubeIcon,
  DocumentTextIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

const uploadImageToCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "my_unsigned"); // your unsigned preset

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dfooclcxe/image/upload", // your cloud name
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
};

// Helper functions for generating rating and review data
const generateProductRating = () => {
  const ratings = [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9];
  return ratings[Math.floor(Math.random() * ratings.length)];
};

const generateReviewCount = () => {
  const minReviews = 25;
  const maxReviews = 200;
  return Math.floor(Math.random() * (maxReviews - minReviews + 1)) + minReviews;
};

const Admin = () => {
  const { t, language } = useTranslation();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: null,
    description: "",
    isfeatured: false,
    productCategory: "",
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);

  const [currentView, setCurrentView] = useState('products'); // Start with products view
  const [menuOpen, setMenuOpen] = useState(false);

  console.log('Menu state:', { menuOpen, currentView }); // Debug log

  const handleImageClick = () => {
    document.getElementById('image').click();
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    console.log('Form input changed:', { name, value, type, checked }); // Debug log
    if (name === "image") {
      const file = files[0];
      if (file) {
        // Create a URL for the original image to show in cropper
        const imageUrl = URL.createObjectURL(file);
        setOriginalImage(imageUrl);
        setShowCropper(true);
      }
    } else if (type === "checkbox") {
      setProduct({ ...product, [name]: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleCropComplete = (croppedFile) => {
    setProduct({ ...product, image: croppedFile });
    setPreview(URL.createObjectURL(croppedFile));
    setShowCropper(false);
    setOriginalImage(null);
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setOriginalImage(null);
    // Reset the file input
    const fileInput = document.getElementById('image');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSkipCrop = () => {
    // Convert the original image URL back to a file and use it directly
    if (originalImage) {
      fetch(originalImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'original-image.jpg', { type: 'image/jpeg' });
          setProduct({ ...product, image: file });
          setPreview(originalImage);
          setShowCropper(false);
          setOriginalImage(null);
        })
        .catch(error => {
          console.error('Error processing original image:', error);
          handleCropCancel(); // Fallback to cancel
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    let imageUrl = "";

    if (product.image) {
      imageUrl = await uploadImageToCloudinary(product.image);
      if (!imageUrl) {
        setLoading(false);
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    await addDoc(collection(db, "products"), {
      name: product.name,
      price: Number(product.price),
      image: imageUrl,
      description: product.description,
      isfeatured: product.isfeatured,
      productCategory: product.productCategory,
      rating: generateProductRating(),
      reviewCount: generateReviewCount(),
      createdAt: new Date(),
    });

    setLoading(false);
    setSuccess(true);
    setProduct({ name: "", price: "", image: null, description: "", isfeatured: false, productCategory: "" });
    setPreview(null);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Hamburger Menu */}
      <header className="admin-header bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">{t('admin.dashboard')}</h1>
            
            {/* Hamburger Menu */}
            <div className="hamburger-container">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hamburger-menu-btn"
                aria-label="Open menu"
              >
                <div className={`hamburger-line ${menuOpen ? 'line1-open' : ''}`}></div>
                <div className={`hamburger-line ${menuOpen ? 'line2-open' : ''}`}></div>
                <div className={`hamburger-line ${menuOpen ? 'line3-open' : ''}`}></div>
              </button>
              
              {/* Dropdown Menu */}
              {menuOpen && (
                <>
                  {/* Overlay */}
                  <div 
                    className="hamburger-overlay"
                    onClick={() => setMenuOpen(false)}
                  ></div>
                  
                  {/* Menu */}
                  <div className="hamburger-dropdown">
                    <button
                      onClick={() => {
                        setCurrentView('products');
                        setMenuOpen(false);
                      }}
                      className={`hamburger-menu-item ${currentView === 'products' ? 'active' : ''}`}
                    >
                      <CubeIcon />
                      <span>{t('admin.allProducts.title')}</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setCurrentView('add');
                        setMenuOpen(false);
                      }}
                      className={`hamburger-menu-item ${currentView === 'add' ? 'active' : ''}`}
                    >
                      <PlusIcon />
                      <span>{t('admin.addProduct.title')}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'products' ? (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('admin.allProducts.title')}</h2>
              <p className="text-gray-600">{t('admin.allProducts.subtitle')}</p>
            </div>
            <AllProductsSection onlyProductsView={true} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('admin.addProduct.title')}</h2>
              <p className="text-gray-600">{t('admin.addProduct.subtitle')}</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Product Name Field */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    {t('admin.form.productName')}
                  </label>
                  <div className="form-input-container">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-input"
                      required
                      placeholder={t('admin.form.productNamePlaceholder')}
                      value={product.name}
                      onChange={handleChange}
                    />
                    <TagIcon className="form-icon" />
                  </div>
                </div>

                {/* Price Field */}
                <div className="form-group">
                  <label htmlFor="price" className="form-label">
                    {t('admin.form.price')}
                  </label>
                  <div className="form-input-container">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={product.price}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder={t('admin.form.pricePlaceholder')}
                    />
                    <CurrencyDollarIcon className="form-icon" />
                  </div>
                </div>

                {/* Category Field */}
                <div className="form-group">
                  <label htmlFor="productCategory" className="form-label">
                    {t('admin.form.category')} <span style={{color: '#6b7280', fontWeight: 'normal', fontSize: '0.9rem'}}>{t('admin.form.categoryOptional')}</span>
                  </label>
                  <div className="form-input-container">
                    <select
                      name="productCategory"
                      id="productCategory"
                      value={product.productCategory}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">{t('admin.form.categoryPlaceholder')}</option>
                      <option value="vestes">{t('admin.categories.vestes')}</option>
                      <option value="abacosts">{t('admin.categories.abacosts')}</option>
                      <option value="tuniqueSimple">{t('admin.categories.tuniqueSimple')}</option>
                      <option value="tuniqueBroderie">{t('admin.categories.tuniqueBroderie')}</option>
                      <option value="chemises">{t('admin.categories.chemises')}</option>
                    </select>
                    <RectangleGroupIcon className="form-icon" />
                  </div>
                </div>

                {/* Product Image Field */}
                <div className="form-group">
                  <label htmlFor="image" className="form-label">
                    {t('admin.form.image')}
                  </label>
                  <div className="image-upload-container" onClick={handleImageClick}>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={handleChange}
                      required
                      className="image-input"
                      style={{ display: 'none' }}
                    />
                    <div className="image-upload-display">
                      {preview ? (
                        <img src={preview} alt="Preview" className="image-preview" />
                      ) : (
                        <div className="image-placeholder">
                          <PhotoIcon className="h-12 w-12 text-gray-400" />
                          <p className="text-gray-500 mt-2">{t('admin.form.imageUpload')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description Field */}
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    {t('admin.form.description')} <span style={{color: '#6b7280', fontWeight: 'normal', fontSize: '0.9rem'}}>{t('admin.form.descriptionOptional')}</span>
                  </label>
                  <div className="form-input-container">
                    <textarea
                      name="description"
                      id="description"
                      value={product.description}
                      onChange={handleChange}
                      className="form-textarea"
                      placeholder={t('admin.form.descriptionPlaceholder')}
                      rows="4"
                    />
                    <DocumentTextIcon className="form-icon-textarea" />
                  </div>
                </div>

                {/* Featured Product Toggle */}
                <div className="featured-toggle">
                  <div className="featured-toggle-content">
                    <input
                      type="checkbox"
                      name="isfeatured"
                      id="isfeatured"
                      checked={product.isfeatured}
                      onChange={handleChange}
                      className="featured-checkbox"
                    />
                    <label htmlFor="isfeatured" className="featured-label">
                      <span className="featured-title">{t('admin.form.featured')}</span>
                      <p className="featured-subtitle">
                        {t('admin.form.featuredSubtitle')}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`submit-button ${success ? 'success-state' : ''}`}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      {t('admin.form.uploading')}
                    </>
                  ) : success ? (
                    <>
                      <div className="success-icon">✓</div>
                      {t('admin.form.success')}
                    </>
                  ) : (
                    <>
                      <PlusIcon className="h-5 w-5" />
                      {t('admin.form.addProduct')}
                    </>
                  )}
                </button>
                
                {/* Auto-generation note */}
                <div className="info-box">
                  <div className="info-header">
                    <span className="info-icon">ℹ️</span>
                    <span className="info-title">{t('admin.info.autoGeneratedTitle')}</span>
                  </div>
                  <ul className="info-list">
                    <li>⭐ {t('admin.info.autoGenerated.rating')}</li>
                    <li>👥 {t('admin.info.autoGenerated.reviews')}</li>
                    <li>🎨 {t('admin.info.autoGenerated.display')}</li>
                    <li>🏠 {t('admin.info.autoGenerated.featured')}</li>
                    <li>📝 {t('admin.info.autoGenerated.optional')}</li>
                  </ul>
                </div>
                
                {success && (
                  <div className="success-message">
                    ✅ {t('admin.form.success')}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </main>
      
      {/* Image Cropper Modal */}
      {showCropper && originalImage && (
        <ImageCropper
          imageSrc={originalImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          onSkipCrop={handleSkipCrop}
        />
      )}
    </div>
  );
};

export default Admin;