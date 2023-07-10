import React from 'react'
import NavBar from './Components/NavBar'
import Hero from './Components/Hero'

export default function Landing() {
  return (
    <div>
        <div className="fixed w-full">
            <NavBar />
        </div>
        <Hero />


        {/*banner */}
        <div className="fixed">
            <div className="flex w-screen bg-secondary bottom-0 absolute h-[60px]">
              <div className="flex w-20">
                <a href="" className='my-auto mx-auto text-2xl text-white font-bold'>X</a>
              </div>
              <div className="flex w-full">
                <a href="/login" className='h-full w-full text-center text-white font-bold flex hover:underline'>
                  <p className='m-auto'>Exclusive Offer: Try our Public Bots now!</p>
                </a>
              </div>
            </div>
        </div>
    </div>
  )
}
