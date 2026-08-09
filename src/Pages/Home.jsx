import React from 'react'
import HeroCarousel from '../Components/HeroCarousel'
import FeaturesSection from '../Components/Feature'
import Highlights from '../Components/Highlights'
import TestimonialSection from '../Components/Reviews'
import BikeCarousel from '../Components/BikeCarousel'
import ProductsCarousel from "../Components/ProductsCarousel";
import AccessoriesCarousel from "../Components/AccessoriesCarousel";
import products from "../../public/products.json";
import accessories from "../../public/Accessories.json";

const Home = () => {
  return (
    <div>
      <HeroCarousel></HeroCarousel>
      <Highlights></Highlights>
      <ProductsCarousel products={products} />
      {/* <AccessoriesCarousel accessories={accessories} /> */}
      <FeaturesSection></FeaturesSection>
      <TestimonialSection></TestimonialSection>
    </div>
  )
}

export default Home
