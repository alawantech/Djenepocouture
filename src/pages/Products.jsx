import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../data/products';
import './Products.css';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get category display name
  const getCategoryDisplayName = (categoryValue) => {
    const categoryMap = {
      'vestes': 'Vestes',
      'abacosts': 'Abacosts',
      'tuniqueSimple': 'Tunique Simple',
      'tuniqueBroderie': 'Tunique Broderie',
      'chemises': 'Chemises'
    };
    return categoryMap[categoryValue] || 'All Categories';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      matchesCategory = product.productCategory === selectedCategory;
    }
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Our Products</h1>
          <p className="page-subtitle">
            Explore our complete collection of custom-tailored clothing, 
            each piece crafted with precision and attention to detail.
          </p>
        </div>

        <div className="products-filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              <option value="all">All Categories</option>
              <option value="vestes">Vestes</option>
              <option value="abacosts">Abacosts</option>
              <option value="tuniqueSimple">Tunique Simple</option>
              <option value="tuniqueBroderie">Tunique Broderie</option>
              <option value="chemises">Chemises</option>
            </select>
          </div>

          {(searchTerm || selectedCategory !== 'all') && (
            <div className="filter-group">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="clear-filters-btn"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {!loading && (
          <div className="filter-results">
            <p className="results-count">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} 
              {selectedCategory !== 'all' && (
                <span className="category-info"> in "{getCategoryDisplayName(selectedCategory)}"</span>
              )}
              {searchTerm && (
                <span className="search-info"> matching "{searchTerm}"</span>
              )}
            </p>
          </div>
        )}

        {loading ? (
          <div className="no-products">
            <h3>Loading products...</h3>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} showDescription={true} />
            ))}
          </div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;