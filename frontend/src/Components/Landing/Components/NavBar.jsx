import React from 'react'

export default function NavBar() {
  return (
    <div className='w-full h-[60px] bg-lightblue flex p-2'>
        <div className="lg:container w-full flex justify-between p-0">
            <div className='my-auto'>
                <a href="/" className='text-[30px] font-bold pl-1 text-primary'>✨aidvi</a>
            </div>
            <div className='my-auto'>
                <ul className='flex gap-8'>
                    <li className='text-md font-bold'><a href="#">Benefits</a></li>
                    <li className='text-md font-bold'><a href="#">How it works</a></li>
                    <li className='text-md font-bold'><a href="#">Testimonials</a></li>
                    <li className='text-md font-bold'><a href="#">Pricing</a></li>
                    <li className='text-md font-bold'><a className="py-4 px-4 bg-secondary text-white rounded-md" href="#">Get started for free</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}
