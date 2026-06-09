import React from 'react'
import Navber from './Components/Navbar'
import Hero from './Components/Hero'
import ProductViewer from './Components/ProductViewer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  return (
    <main>
        <Navber/>
        <Hero/>
        <ProductViewer/>
    </main>
  )
}

export default App