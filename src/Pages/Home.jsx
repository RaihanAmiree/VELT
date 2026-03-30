import React from 'react'
import HeroCarousel from '../Components/HeroCarousel'
import FeaturesSection from '../Components/Feature'
import Highlights from '../Components/Highlights'
import TestimonialSection from '../Components/Reviews'

const Home = () => {
  return (
    <div>
      <HeroCarousel></HeroCarousel>
      <FeaturesSection></FeaturesSection>
      <Highlights></Highlights>
      <TestimonialSection></TestimonialSection>
    </div>
  )
}

export default Home
