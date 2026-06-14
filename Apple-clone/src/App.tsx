import React from 'react'
import Navber from './Components/Navbar'
import Hero from './Components/Hero'
import ProductViewer from './Components/ProductViewer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Showcase from './Components/Showcase'
import Performance from './Components/Performance'
import Features from './Components/Features'
import Highlights from './Components/Highlights'
import Footer from './Components/Footer'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  return (
    <main>
      <Navber />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </main>
  )
}

export default App