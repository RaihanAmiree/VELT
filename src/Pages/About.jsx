import React from 'react'
import AboutHero from '../Components/AboutHero'
import AboutFeatures from '../Components/AboutMission'
import AboutExpertise from '../Components/AboutExpertise'
import AboutCommunity from '../Components/AboutCommunity'
import AboutFooterCTA from '../Components/AboutFooterCTA'

const About = () => {
  return (
    <div>
      <AboutHero></AboutHero>
      <AboutFeatures></AboutFeatures>
      <AboutExpertise></AboutExpertise>
      <AboutCommunity></AboutCommunity>
      <AboutFooterCTA></AboutFooterCTA>
    </div>
  )
}

export default About
