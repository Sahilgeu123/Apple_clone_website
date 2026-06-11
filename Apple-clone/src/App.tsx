import React from 'react'
import Navber from './Components/Navbar'
import Hero from './Components/Hero'
import ProductViewer from './Components/ProductViewer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Showcase from './Components/Showcase'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  return (
    <main>
        <Navber/>
        <Hero/>
        <ProductViewer/>
        <Showcase/>
    </main>
  )
}

export default App