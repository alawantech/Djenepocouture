import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Menu, Edit2, Save, X, Upload, Trash2, Star } from 'lucide-react';
import './AllProductsSection.css';

// Cloudinary upload function
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

const AllProductsSection = ({ onlyProductsView = false }) => {
  const [products, setProducts] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [open, setOpen] = useState(onlyProductsView);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editData, setEditData] = useState({});
  const [uploading, setUploading] = useState(false);
  
  // New state for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper function to get category display name
  const getCategoryDisplayName = (categoryValue) => {
    const categoryMap = {
      'vestes': 'Vestes',
      'abacosts': 'Abacosts',
      'tuniqueSimple': 'Tunique Simple',
      'tuniqueBroderie': 'Tunique Broderie',
      'chemises': 'Chemises'
    };
    
    // Check if it's a custom category
    const customCategory = customCategories.find(cat => cat.categoryId === categoryValue);
    if (customCategory) {
      return customCategory.name;
    }
    
    return categoryMap[categoryValue] || categoryValue || 'Uncategorized';
  };

  // Helper function to get category statistics
  const getCategoryStats = () => {
    const stats = {};
    products.forEach(product => {
      const category = product.productCategory || 'uncategorized';
      stats[category] = (stats[category] || 0) + 1;
    });
    return stats;
  };

  // Rating helper function
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="star filled" size={14} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="star half-filled" size={14} />);
      } else {
        stars.push(<Star key={i} className="star empty" size={14} />);
      }
    }
    return stars;
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Fetch custom categories
        const categoriesSnapshot = await getDocs(collection(db, 'categories'));
        const categoriesList = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCustomCategories(categoriesList);
        
        // Auto-assign ratings and review counts to products that don't have them
        const updatedProducts = [];
        for (const product of productsList) {
          if (!product.rating || !product.reviewCount) {
            const newRating = getProductRating(product.id);
            const newReviewCount = getReviewCount(product.id);
            
            try {
              await updateDoc(doc(db, 'products', product.id), {
                rating: newRating,
                reviewCount: newReviewCount,
                updatedAt: new Date()
              });
              
              updatedProducts.push({
                ...product,
                rating: newRating,
                reviewCount: newReviewCount
              });
            } catch (error) {
              console.error('Error updating product ratings:', error);
              updatedProducts.push(product);
            }
          } else {
            updatedProducts.push(product);
          }
        }
        
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const startEditing = (product) => {
    setEditingProduct(product.id);
    setEditData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      isfeatured: product.isfeatured,
      productCategory: product.productCategory || "",
      rating: product.rating || getProductRating(product.id),
      reviewCount: product.reviewCount || getReviewCount(product.id)
    });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setEditData({});
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    setUploading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(file);
      handleInputChange('image', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const saveProduct = async () => {
    if (!editingProduct) return;

    try {
      const productRef = doc(db, 'products', editingProduct);
      await updateDoc(productRef, {
        name: editData.name,
        price: Number(editData.price),
        description: editData.description,
        image: editData.image,
        isfeatured: editData.isfeatured,
        productCategory: editData.productCategory,
        rating: editData.rating,
        reviewCount: editData.reviewCount,
        updatedAt: new Date()
      });

      // Update local state
      setProducts(prev => prev.map(product => 
        product.id === editingProduct 
          ? { ...product, ...editData, price: Number(editData.price), updatedAt: new Date() }
          : product
      ));

      setEditingProduct(null);
      setEditData({});
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const deleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts(prev => prev.filter(product => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'uncategorized') {
        matchesCategory = !product.productCategory || product.productCategory === '';
      } else {
        matchesCategory = product.productCategory === selectedCategory;
      }
    }
    
    return matchesSearch && matchesCategory;
  });

  // Clear filters function
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <section className="all-products-section">
      {!onlyProductsView && (
        <button className="hamburger-btn" onClick={() => setOpen(!open)}>
          <Menu size={28} /> All Products
        </button>
      )}
      {open && (
        <div className="products-list">
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : products.length > 0 ? (
            <>
              {/* Products Summary */}
              <div className="products-summary">
                <div className="summary-item">
                  <span className="summary-label">Total Products:</span>
                  <span className="summary-value">{products.length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Featured (Home Page):</span>
                  <span className="summary-value featured">{products.filter(p => p.isfeatured).length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Regular Products:</span>
                  <span className="summary-value">{products.filter(p => !p.isfeatured).length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Filtered Results:</span>
                  <span className="summary-value filtered">{filteredProducts.length}</span>
                </div>
              </div>

              {/* Category Statistics */}
              <div className="category-stats">
                <h4 className="stats-title">Products by Category</h4>
                <div className="category-grid">
                  {Object.entries(getCategoryStats()).map(([category, count]) => (
                    <div key={category} className="category-stat">
                      <span className="category-name">{getCategoryDisplayName(category)}</span>
                      <span className="category-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search and Filter Controls */}
              <div className="admin-products-filters">
                <div className="filter-row">
                  <div className="filter-group">
                    <label className="filter-label">Search Products:</label>
                    <input
                      type="text"
                      placeholder="Search by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="admin-search-input"
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label className="filter-label">Filter by Category:</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="admin-category-filter"
                    >
                      <option value="all">All Categories</option>
                      <option value="vestes">Vestes</option>
                      <option value="abacosts">Abacosts</option>
                      <option value="tuniqueSimple">Tunique Simple</option>
                      <option value="tuniqueBroderie">Tunique Broderie</option>
                      <option value="chemises">Chemises</option>
                      {customCategories.map((category) => (
                        <option key={category.id} value={category.categoryId}>
                          {category.name}
                        </option>
                      ))}
                      <option value="uncategorized">Uncategorized</option>
                    </select>
                  </div>

                  {(searchTerm || selectedCategory !== 'all') && (
                    <div className="filter-group">
                      <button
                        onClick={clearFilters}
                        className="clear-filters-btn"
                        title="Clear all filters"
                      >
                        <X size={16} />
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Filter Results Summary */}
                <div className="filter-results-summary">
                  <p className="results-count">
                    Showing {filteredProducts.length} of {products.length} products
                    {selectedCategory !== 'all' && (
                      <span className="category-info"> in "{getCategoryDisplayName(selectedCategory)}"</span>
                    )}
                    {searchTerm && (
                      <span className="search-info"> matching "{searchTerm}"</span>
                    )}
                  </p>
                </div>
              </div>
              
              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                <div className="product-doc" key={product.id}>
                  {editingProduct === product.id ? (
                    // Edit Mode
                    <div className="edit-mode">
                      <div className="edit-header">
                        <h4>Editing Product</h4>
                        <div className="edit-actions">
                          <button 
                            onClick={saveProduct}
                            className="save-btn"
                            title="Save changes"
                          >
                            <Save size={16} />
                          </button>
                          <button 
                            onClick={cancelEditing}
                            className="cancel-btn"
                            title="Cancel editing"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Editable Name */}
                      <div className="edit-field">
                        <label>Product Name:</label>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="edit-input"
                        />
                      </div>

                      {/* Editable Image */}
                      <div className="edit-field">
                        <label>Product Image:</label>
                        <div className="image-edit-container">
                          <img 
                            src={editData.image} 
                            alt={editData.name} 
                            className="edit-image"
                          />
                          <div className="image-upload-overlay">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e.target.files[0])}
                              className="image-input"
                              id={`image-${product.id}`}
                            />
                            <label htmlFor={`image-${product.id}`} className="upload-label">
                              {uploading ? 'Uploading...' : <Upload size={20} />}
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Editable Price */}
                      <div className="edit-field">
                        <label>Price (F):</label>
                        <input
                          type="number"
                          value={editData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          className="edit-input"
                          min="0"
                          step="0.01"
                        />
                      </div>

                      {/* Editable Description */}
                      <div className="edit-field">
                        <label>Description:</label>
                        <textarea
                          value={editData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className="edit-textarea"
                          rows="3"
                        />
                      </div>

                      {/* Editable Category */}
                      <div className="edit-field">
                        <label>Category:</label>
                        <select
                          value={editData.productCategory}
                          onChange={(e) => handleInputChange('productCategory', e.target.value)}
                          className="edit-input"
                        >
                          <option value="">Select a category</option>
                          <option value="vestes">Vestes</option>
                          <option value="abacosts">Abacosts</option>
                          <option value="tuniqueSimple">Tunique Simple</option>
                          <option value="tuniqueBroderie">Tunique Broderie</option>
                          <option value="chemises">Chemises</option>
                          {customCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name} (Custom)
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Featured Toggle */}
                      <div className="edit-field">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={editData.isfeatured}
                            onChange={(e) => handleInputChange('isfeatured', e.target.checked)}
                          />
                          Featured Product
                        </label>
                      </div>

                      {/* Rating Field */}
                      <div className="edit-field">
                        <label>Rating (1-5):</label>
                        <input
                          type="number"
                          value={editData.rating}
                          onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                          className="edit-input"
                          min="1"
                          max="5"
                          step="0.1"
                        />
                      </div>

                      {/* Review Count Field */}
                      <div className="edit-field">
                        <label>Review Count:</label>
                        <input
                          type="number"
                          value={editData.reviewCount}
                          onChange={(e) => handleInputChange('reviewCount', parseInt(e.target.value))}
                          className="edit-input"
                          min="0"
                          step="1"
                        />
                      </div>

                      <div className="product-meta">
                        <p><strong>ID:</strong> {product.id}</p>
                        <p><strong>Created:</strong> {product.createdAt?.toDate ? product.createdAt.toDate().toLocaleDateString() : 'Unknown'}</p>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="view-mode">
                      <div className="product-header">
                        <div className="product-actions">
                          <button 
                            onClick={() => startEditing(product)}
                            className="edit-btn"
                            title="Edit product"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="delete-btn"
                            title="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="product-image-container">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-image"
                        />
                      </div>
                      
                      <div className="product-content">
                        <h3 className="product-title">{product.name}</h3>
                        
                        <div className="product-rating-section">
                          <div className="product-rating">
                            <div className="stars-container">
                              {renderStars(product.rating || getProductRating(product.id))}
                            </div>
                            <span className="rating-text">
                              <span className="rating-number">{(product.rating || getProductRating(product.id)).toFixed(1)}</span>
                              <span className="review-count">({product.reviewCount || getReviewCount(product.id)} reviews)</span>
                            </span>
                          </div>
                        </div>
                        
                        <p className="product-price">{product.price}F</p>
                        
                        <div className="product-details">
                          <p className="product-description">{product.description}</p>
                          {product.productCategory && (
                            <p className="product-category">
                              <strong>Category:</strong> {getCategoryDisplayName(product.productCategory)}
                            </p>
                          )}
                          {product.isfeatured && (
                            <p className="featured-badge">⭐ Featured Product - Shows on Home Page</p>
                          )}
                        </div>
                        
                        <div className="product-meta">
                          <p><strong>ID:</strong> {product.id}</p>
                          <p><strong>Created:</strong> {product.createdAt?.toDate ? product.createdAt.toDate().toLocaleDateString() : 'Unknown'}</p>
                          {product.updatedAt && (
                            <p><strong>Updated:</strong> {product.updatedAt?.toDate ? product.updatedAt.toDate().toLocaleDateString() : 'Unknown'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                ))
              ) : (
                <div className="no-products">
                  <h3>No products found</h3>
                  <p>
                    {selectedCategory !== 'all' 
                      ? `No products found in the "${getCategoryDisplayName(selectedCategory)}" category${searchTerm ? ` matching "${searchTerm}"` : ''}.`
                      : `No products found${searchTerm ? ` matching "${searchTerm}"` : ''}.`
                    }
                  </p>
                  <p>Try adjusting your search or filter criteria.</p>
                  {(searchTerm || selectedCategory !== 'all') && (
                    <button onClick={clearFilters} className="clear-filters-btn">
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="no-products">No products found.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default AllProductsSection;
