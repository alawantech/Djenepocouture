import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../data/products';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Products.css';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customCategories, setCustomCategories] = useState([]);
  const { t, language } = useTranslation();

  // Helper function to get category display name with translation
  const getCategoryDisplayName = (categoryValue) => {
    const categoryMap = {
      'vestes': language === 'fr' ? 'Vestes' : 'Jackets',
      'abacosts': language === 'fr' ? 'Abacosts' : 'Abacosts',
      'tuniqueSimple': language === 'fr' ? 'Tunique Simple' : 'Simple Tunic',
      'tuniqueBroderie': language === 'fr' ? 'Tunique Broderie' : 'Embroidered Tunic',
      'chemises': language === 'fr' ? 'Chemises' : 'Shirts',
      'uncategorized': language === 'fr' ? 'Non catégorisé' : 'Uncategorized'
    };
    
    // Check if it's a custom category
    const customCategory = customCategories.find(cat => cat.categoryId === categoryValue);
    if (customCategory) {
      return customCategory.name;
    }
    
    return categoryMap[categoryValue] || (language === 'fr' ? 'Toutes les Catégories' : 'All Categories');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products and custom categories in parallel
        const [productsData, categoriesSnapshot] = await Promise.all([
          getProducts(),
          getDocs(collection(db, "categories"))
        ]);
        
        setProducts(productsData);
        
        // Process custom categories
        const categories = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCustomCategories(categories);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

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

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{t('products.title')}</h1>
          <p className="page-subtitle">
            {t('products.subtitle')}
          </p>
        </div>

        <div className="products-filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder={language === 'fr' ? 'Rechercher des produits...' : 'Search products...'}
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
              <option value="all">{language === 'fr' ? 'Toutes les Catégories' : 'All Categories'}</option>
              <option value="vestes">{language === 'fr' ? 'Vestes' : 'Jackets'}</option>
              <option value="abacosts">{language === 'fr' ? 'Abacosts' : 'Abacosts'}</option>
              <option value="tuniqueSimple">{language === 'fr' ? 'Tunique Simple' : 'Simple Tunic'}</option>
              <option value="tuniqueBroderie">{language === 'fr' ? 'Tunique Broderie' : 'Embroidered Tunic'}</option>
              <option value="chemises">{language === 'fr' ? 'Chemises' : 'Shirts'}</option>
              {customCategories.map(category => (
                <option key={category.id} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
              <option value="uncategorized">{language === 'fr' ? 'Non catégorisé' : 'Uncategorized'}</option>
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
                {language === 'fr' ? 'Effacer les Filtres' : 'Clear Filters'}
              </button>
            </div>
          )}
        </div>

        {!loading && (
          <div className="filter-results">
            <p className="results-count">
              {language === 'fr' ? 'Affichage de' : 'Showing'} {filteredProducts.length} {language === 'fr' ? 'produit' : 'product'}{filteredProducts.length !== 1 ? (language === 'fr' ? 's' : 's') : ''} 
              {selectedCategory !== 'all' && (
                <span className="category-info"> {language === 'fr' ? 'dans' : 'in'} "{getCategoryDisplayName(selectedCategory)}"</span>
              )}
              {searchTerm && (
                <span className="search-info"> {language === 'fr' ? 'correspondant à' : 'matching'} "{searchTerm}"</span>
              )}
            </p>
          </div>
        )}

        {loading ? (
          <div className="no-products">
            <h3>{t('products.loading')}</h3>
            <p>Loading products from database...</p>
          </div>
        ) : error ? (
          <div className="no-products">
            <h3>Error Loading Products</h3>
            <p>There was an error connecting to the database: {error}</p>
            <p>Please check your internet connection and Firebase configuration.</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} showDescription={true} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h3>{language === 'fr' ? 'Aucun produit trouvé' : 'No products found'}</h3>
            <p>
              {selectedCategory !== 'all' 
                ? (language === 'fr' 
                    ? `Aucun produit trouvé dans la catégorie "${getCategoryDisplayName(selectedCategory)}"${searchTerm ? ` correspondant à "${searchTerm}"` : ''}.`
                    : `No products found in the "${getCategoryDisplayName(selectedCategory)}" category${searchTerm ? ` matching "${searchTerm}"` : ''}.`)
                : (language === 'fr'
                    ? `Aucun produit trouvé${searchTerm ? ` correspondant à "${searchTerm}"` : ''}.`
                    : `No products found${searchTerm ? ` matching "${searchTerm}"` : ''}.`)
              }
            </p>
            <p>{language === 'fr' ? 'Essayez d\'ajuster vos critères de recherche ou de filtre.' : 'Try adjusting your search or filter criteria.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;