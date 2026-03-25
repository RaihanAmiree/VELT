import React from 'react'
import "./App.css";
import { ThemeProvider } from './ThemeContext';
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Products from "./Pages/Products";
import ProductDetailsPage from "./Pages/ProductDetails";
import Comparison from "./Pages/Comparison";
import Support from "./Pages/Support";
import Navbar from './Components/navbar/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import AccessoriesPage from './Pages/Accessories';
import CartPage from './Pages/CartPage';
import WishlistPage from './Pages/WishlistPage';
import Toast from './Components/ui/Toast';

import { CartWishlistProvider } from './context/CartWishlistContext';

const App = () => {
  return (
    <CartWishlistProvider>
      <div>
        <ScrollToTop />

        <ThemeProvider>
          <Navbar />

          {/* Global Toast (mounted once) */}
          <Toast />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/support" element={<Support />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>

          <Footer />
        </ThemeProvider>
      </div>
    </CartWishlistProvider>
  )
}

export default App