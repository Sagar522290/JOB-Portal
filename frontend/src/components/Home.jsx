import React from 'react'
import Navbar from './Navbar'
import { HeroSection } from './HeroSection'
import CategoriesSection from './CategoriesSection'
import Footer from './Footer'
import LatestJobs from './LatestJobs'
import useGetAllJobs from '../hooks/useGetAllJobs'


export const Home = () => {

  useGetAllJobs()

  return (
    <>
    <Navbar/>
    <HeroSection/>
    <CategoriesSection/>
    <LatestJobs/>
    <Footer/>
    </>
  )
}
