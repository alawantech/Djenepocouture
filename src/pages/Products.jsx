import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../data/products';
import './Products.css';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      matchesPrice = product.price >= min && (max ? product.price <= max : true);
    }
    
    return matchesSearch && matchesPrice;
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
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="price-filter"
            >
              <option value="all">All Prices</option>
              <option value="0-300">Under $300</option>
              <option value="300-600">$300 - $600</option>
              <option value="600-900">$600 - $900</option>
              <option value="900-9999">$900+</option>
            </select>
          </div>
        </div>

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
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;