import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import bg from '../assets/HeroBG.svg'
import BentoGrid from '../Components/BentoGrid'
import Features from '../Components/Features'
import Review from '../Components/Review'
import Footer from '../Components/Footer'

const Home = () => {
  return (
  <>
    <div className='bg-no-repeat bg-cover' style={{backgroundImage : `url(${bg})`}}>
    <Navbar/>
    <Hero/>
    </div>
    
    <BentoGrid/>
    <Features/>
    <Review/>
    <Footer/>
    
  </>
  )
}

export default Home
