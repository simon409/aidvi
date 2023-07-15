import React from 'react'

export default function ExtraSection() {
  return (
    <div className='lg:container my-40'>
        <div className="flex px-10 lg:flex-row flex-col">
            <div className="lg:w-[60%] w-full">
                <h1 className='lg:text-5xl text-4xl font-bold'>Experience it for free right away!</h1>
            </div>
            <div className="lg:w-[40%] w-full flex lg:mt-0 mt-10">
                <a href="" className='bg-secondary w-full block py-5 text-center text-white font-bold text-xl rounded-lg my-auto'>Get started for free</a>
            </div>
        </div>
    </div>
  )
}
