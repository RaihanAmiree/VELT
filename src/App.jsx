import React from 'react'
import "./App.css";
import { ThemeProvider } from './ThemeContext';
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Accessories from "./Pages/Accessories";
import Comparison from "./Pages/Comparison";
import Support from "./Pages/Support";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';

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
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/accessories" element={<Accessories />} />
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
