import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getProducts = async () => {
  try {
    console.log('Attempting to fetch products from Firestore...');
    const productsCol = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCol);
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Successfully fetched products:', products.length);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array instead of throwing to prevent app crash
    return [];
  }
};

// Example usage:
// const products = await getProducts();