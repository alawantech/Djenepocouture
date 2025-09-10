import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Menu } from 'lucide-react';
import './AllProductsSection.css';


const AllProductsSection = ({ onlyProductsView = false }) => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(onlyProductsView);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
      setLoading(false);
    };
    fetchProducts();
  }, []);

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
            <div>Loading products...</div>
          ) : products.length > 0 ? (
            products.map(product => (
              <div className="product-doc" key={product.id}>
                <h4>{product.name}</h4>
                <img src={product.image} alt={product.name} style={{ maxWidth: '120px', borderRadius: '6px' }} />
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>ID:</strong> {product.id}</p>
                <p><strong>Featured:</strong> {product.isfeatured ? 'Yes' : 'No'}</p>
                <p><strong>Created At:</strong> {product.createdAt?.toDate ? product.createdAt.toDate().toLocaleString() : String(product.createdAt)}</p>
              </div>
            ))
          ) : (
            <div>No products found.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default AllProductsSection;
