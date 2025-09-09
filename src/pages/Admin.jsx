import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Admin.css';

const uploadImageToCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', 'my_unsigned'); // your unsigned preset name

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/dfooclcxe/image/upload', // your cloud name
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url; // returns the uploaded image URL
};

const Admin = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: null,
    description: ''
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setLoading(true);
    setSuccess(false);
    let imageUrl = '';

    if (product.image) {
      imageUrl = await uploadImageToCloudinary(product.image);
      if (!imageUrl) {
        setLoading(false);
        alert('Image upload failed. Please try again.');
        return;
      }
      console.log("Uploaded Image URL:", imageUrl);
    }

    await addDoc(collection(db, 'products'), {
      name: product.name,
      price: Number(product.price),
      image: imageUrl,
      description: product.description,
      isfeatured: false,
      createdAt: new Date()
    });
    setLoading(false);
    setSuccess(true);
    setProduct({ name: '', price: '', image: null, description: '' });
    setPreview(null);
    setTimeout(() => setSuccess(false), 3000);
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

        <button type="submit" disabled={loading}>Add Product</button>
        <p style={{marginTop: '10px', fontSize: '12px', color: '#888'}}>Image will be uploaded to Cloudinary and product saved in Firestore.</p>
        {loading && <div className="spinner" style={{marginTop: '10px'}}>Adding product...</div>}
        {success && <div className="success-message" style={{marginTop: '10px', color: 'green'}}>Product added successfully!</div>}
      </form>
    </div>
  );
};

export default Admin;
