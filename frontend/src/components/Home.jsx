import React from 'react'
import Navbar from './Navbar'
import { HeroSection } from './HeroSection'
import CategoriesSection from './CategoriesSection'
import Footer from './Footer'
import LatestJobs from './LatestJobs'


export const Home = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <CategoriesSection/>
    <LatestJobs/>
    {/* <AboutSection/> */}
    <Footer/>
    </>
  )
}
