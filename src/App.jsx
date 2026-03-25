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
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import AccessoriesPage from './Pages/Accessories';

const App = () => {
  return (
    <div>
      <ScrollToTop></ScrollToTop>
       <ThemeProvider>

    <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
    <Footer></Footer>
       </ThemeProvider>
    </div>
  )
}

export default App
