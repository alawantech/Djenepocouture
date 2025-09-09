import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getProducts = async () => {
  const productsCol = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCol);
  return productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Example usage:
// const products = await getProducts();