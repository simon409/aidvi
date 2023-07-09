import React from 'react'

export default function NavBar() {
  return (
    <div className='w-full h-[60px] bg-lightblue flex'>
        <div className="container flex mx-auto justify-between">
            <div className='my-auto'>
                <a href="/" className='text-[30px] font-bold text-primary'>✨aidvi</a>
            </div>
            <div className='my-auto'>
                <ul className='flex'>
                    <li className='px-4 text-md font-bold'><a href="#">Benefits</a></li>
                    <li className='px-4 text-md font-bold'><a href="#">How it works</a></li>
                    <li className='px-4 text-md font-bold'><a href="#">Testimonials</a></li>
                    <li className='px-4 text-md font-bold'><a href="#">Pricing</a></li>
                    <li className='px-4 text-md font-bold'><a className="py-3 px-4 bg-secondary text-white rounded-md" href="#">Get started for free</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}
