import React from 'react'
import Lorem from '../../../assets/lorem.svg'

export default function Steps() {
  return (
    <div id='steps' className='lg:container w-full my-16 px-2'>
        <h1 className='text-center text-5xl font-bold px-2'>3 steps to create your aidvisor</h1>
        <div className="flex lg:flex-row flex-col gap-5 w-full h-fit mt-12">
            <div className="lg:w-1/2 flex">
                <img src={Lorem} className='m-auto w-5/6' alt="" />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-3">
                <div className="bg-lightblue flex gap-3 w-full p-4">
                    <div className="w-[10%]">
                        <p className='text-[18px] py-2 px-4 rounded-md text-white bg-secondary inline shadow-lg shadow-secondary'>1</p>
                    </div>
                    <div className="w-[90%] flex flex-col">
                        <h2 className='font-bold text-[18px]'>You describe your bot & provide training data</h2>
                        <p className='text-[18px] pt-3'>
                            Tell us about your needs and the skills of the desired aidvisor. Share relevant data and 
                            knowledge to personalize and train your virtual assistant.
                        </p>
                    </div>
                </div>
                <div className="bg-white flex gap-3 w-full p-4">
                    <div className="w-[10%]">
                        <p className='text-[18px] py-2 px-4 rounded-md text-white bg-orange inline shadow-lg shadow-orange'>2</p>
                    </div>
                    <div className="w-[90%] flex flex-col">
                        <h2 className='font-bold text-[18px]'>You describe your bot & provide training data</h2>
                        <p className='text-[18px] pt-3'>
                            Tell us about your needs and the skills of the desired aidvisor. Share relevant data and 
                            knowledge to personalize and train your virtual assistant.
                        </p>
                    </div>
                </div>
                <div className="bg-white flex gap-3 w-full p-4">
                    <div className="w-[10%]">
                        <p className='text-[18px] py-2 px-4 rounded-md text-white bg-orange inline shadow-lg shadow-orange'>3</p>
                    </div>
                    <div className="w-[90%] flex flex-col">
                        <h2 className='font-bold text-[18px]'>You describe your bot & provide training data</h2>
                        <p className='text-[18px] pt-3'>
                            Tell us about your needs and the skills of the desired aidvisor. Share relevant data and 
                            knowledge to personalize and train your virtual assistant.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
