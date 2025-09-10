import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import AllProductsSection from "../components/AllProductsSection";

// Heroicons imports for our new icons
import {
  TagIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  Bars3Icon,
  PlusIcon,
  CubeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

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

const Admin = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: null,
    description: "",
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showProducts, setShowProducts] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
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
    let imageUrl = "";

    if (product.image) {
      imageUrl = await uploadImageToCloudinary(product.image);
      if (!imageUrl) {
        setLoading(false);
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    await addDoc(collection(db, "products"), {
      name: product.name,
      price: Number(product.price),
      image: imageUrl,
      description: product.description,
      isfeatured: false,
      createdAt: new Date(),
    });

    setLoading(false);
    setSuccess(true);
    setProduct({ name: "", price: "", image: null, description: "" });
    setPreview(null);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Retained for functionality but can be restyled further */}
      <div
        className={`fixed lg:static top-0 left-0 h-full bg-gray-900 text-white w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-50`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex flex-col gap-4 p-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-left font-medium"
            onClick={() => {
              setShowProducts(false);
              setSidebarOpen(false);
            }}
          >
            ➕ Add Product
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-left font-medium"
            onClick={() => {
              setShowProducts(true);
              setSidebarOpen(false);
            }}
          >
            📦 All Products
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:p-10">
        {/* Hamburger for mobile */}
        <button
          className="lg:hidden mb-6 bg-gray-900 text-white p-2 rounded-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {showProducts ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              All Products
            </h2>
            <AllProductsSection onlyProductsView={true} />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Add New Product
            </h2>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* Product Name Field */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block font-semibold mb-2 text-gray-700"
                >
                  Product Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                    placeholder="Enter product name"
                    value={product.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Price Field */}
              <div className="relative">
                <label htmlFor="price" className="block font-semibold mb-2 text-gray-700">
                  Price (₦)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter price"
                  />
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Product Image Field */}
              <div className="relative">
                <label
                  htmlFor="image"
                  className="block font-semibold mb-2 text-gray-700"
                >
                  Product Image
                </label>
                <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex-1 px-4 py-2 text-gray-500 truncate">
                    {product.image ? product.image.name : "Choose file"}
                  </div>
                  <div className="bg-gray-200 px-4 py-2 border-l border-gray-300">
                    <PhotoIcon className="h-5 w-5 text-gray-700" />
                  </div>
                </div>

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="rounded-lg mt-4 w-full max-h-56 object-cover border border-gray-200 shadow-sm"
                  />
                )}
              </div>

              {/* Description Field */}
              <div className="relative">
                <label
                  htmlFor="description"
                  className="block font-semibold mb-2 text-gray-700"
                >
                  Description
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    id="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none min-h-[90px]"
                    placeholder="Enter product description"
                  />
                  <DocumentTextIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-orange-600 transition disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
              {success && (
                <div className="mt-2 text-green-600 font-semibold text-center">
                  ✅ Product added successfully!
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;