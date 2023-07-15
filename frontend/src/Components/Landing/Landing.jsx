import React from 'react'
import NavBar from './Components/NavBar'
import Hero from './Components/Hero'
import Banner from './Components/Banner'
import Benefits from './Components/Benefits'
import Steps from './Components/Steps'
import Testimonials from './Components/Testimonials'
import Pricing from './Components/Pricing'
import ExtraSection from './Components/ExtraSection'
import Footer from './Components/Footer'

export default function Landing() {
  return (
    <div>
        <div className="fixed w-full z-50">
            <NavBar />
        </div>
        <Hero />
        {/*banner */}
        <Banner />
        
        <Benefits />
        <Steps />
        <Testimonials />
        <Pricing />
        <ExtraSection />
        <Footer />
    </div>
  )
}
