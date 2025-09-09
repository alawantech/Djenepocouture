import React, { useState } from 'react';
import { products } from '../data/products';
import './Admin.css';

const Admin = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: null,
    description: ''
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (product.image) {
      const formData = new FormData();
      formData.append('file', product.image);
      formData.append('upload_preset', 'YOUR_UNSIGNED_PRESET'); // Replace with your Cloudinary unsigned preset
      const res = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      imageUrl = data.secure_url;
    }

    // Auto id
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const newProduct = {
      id: newId,
      name: product.name,
      price: Number(product.price),
      image: imageUrl,
      description: product.description
    };

    // For demo: add to products array (in real app, use backend API)
    products.push(newProduct);
    alert('Product added!');
    setProduct({ name: '', price: '', image: null, description: '' });
    setPreview(null);
  };

  return (
    <div className="admin-container">
      <h2>Add New Product</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required />

        <label>Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        {preview && <img src={preview} alt="Preview" className="admin-image-preview" />}

        <label>Description:</label>
        <textarea name="description" value={product.description} onChange={handleChange} required />

  <button type="submit">Add Product</button>
  <p style={{marginTop: '10px', fontSize: '12px', color: '#888'}}>Image will be uploaded to Cloudinary. Make sure to set your cloud name and unsigned preset in the code.</p>
      </form>
    </div>
  );
};

export default Admin;
