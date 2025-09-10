import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Menu, Edit2, Save, X, Upload, Trash2 } from 'lucide-react';
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
  const [open, setOpen] = useState(onlyProductsView);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editData, setEditData] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const startEditing = (product) => {
    setEditingProduct(product.id);
    setEditData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      isfeatured: product.isfeatured
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
            products.map(product => (
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
                      <label>Price ($):</label>
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
                    
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-image"
                    />
                    
                    <div className="product-content">
                      <h3 className="product-title">{product.name}</h3>
                      <p className="product-price">${product.price}</p>
                      
                      <div className="product-details">
                        <p className="product-description">{product.description}</p>
                        {product.isfeatured && (
                          <p className="featured-badge">⭐ Featured Product</p>
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
            <div className="no-products">No products found.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default AllProductsSection;
