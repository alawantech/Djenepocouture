import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './contexts/TranslationContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './App.css';

import Admin from './pages/Admin';

function App() {
  return (
    <TranslationProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TranslationProvider>
  );
}

export default App;