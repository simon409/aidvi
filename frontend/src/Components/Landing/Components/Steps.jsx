import React, { useState } from 'react'
import Lorem from '../../../assets/lorem.svg'
import Lorem2 from '../../../assets/lorem2.svg'
import Success from '../../../assets/success.svg'

export default function Steps() {
    const [step, setstep] = useState(1)
  return (
    <div id='steps' className='lg:container w-full my-16 px-2'>
        <h1 className='text-center text-5xl font-bold px-2'>3 steps to create your aidvisor</h1>
        <div className="flex lg:flex-row flex-col gap-5 w-full h-fit mt-12">
            <div className="lg:w-1/2 flex">
                <img src={step==1?Lorem : step == 2 ? Lorem2 : Success} className='m-auto w-5/6' alt="" />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-3">
                <button onClick={()=>setstep(1)} className={`${step==1?'bg-lightblue' : 'bg-white'} flex gap-3 w-full p-4 transition-all duration-100`}>
                    <div className="w-[10%]">
                        <p className={`text-[18px] py-2 px-4 rounded-md text-white inline shadow-lg ${step==1 ? 'bg-secondary  shadow-secondary' : 'bg-orange shadow-orange'} transition-all duration-100`}>1</p>
                    </div>
                    <div className="w-[90%] flex flex-col">
                        <h2 className='font-bold text-[18px]'>You describe your bot & provide training data</h2>
                        <p className='text-[18px] pt-3'>
                            Tell us about your needs and the skills of the desired aidvisor. Share relevant data and 
                            knowledge to personalize and train your virtual assistant.
                        </p>
                    </div>
                </button>
                <button onClick={()=>setstep(2)} className={`${step==2?'bg-lightblue' : 'bg-white'} flex gap-3 w-full p-4 transition-all duration-100`}>
                    <div className="w-[10%]">
                        <p className={`text-[18px] py-2 px-4 rounded-md text-white inline shadow-lg ${step==2 ? 'bg-secondary  shadow-secondary' : 'bg-orange shadow-orange'} transition-all duration-100`}>2</p>
                    </div>
                    <div className="w-[90%] flex flex-col">
                        <h2 className='font-bold text-[18px]'>We train your aidvi bot in 24 Hours</h2>
                        <p className='text-[18px] pt-3'>
                            Take advantage of the training period to refine and fine-tune Aidvisor's responses and behavior based on your requirements.
                        </p>
                    </div>
                </button>
                <button onClick={()=>setstep(3)} className={`${step==3?'bg-lightblue' : 'bg-white'} flex gap-3 w-full p-4 transition-all duration-100`}>
                    <div className="w-[10%]">
                        <p className={`text-[18px] py-2 px-4 rounded-md text-white inline shadow-lg ${step==3 ? 'bg-secondary  shadow-secondary' : 'bg-orange shadow-orange'} transition-all duration-100`}>3</p>
                    </div>
                    <div className="w-[90%] flex flex-col">
                        <h2 className='font-bold text-[18px]'>YShare and interact with your trained bot</h2>
                        <p className='text-[18px] pt-3'>
                            Interact with Aidvisor directly, ask questions, and receive intelligent and tailored responses to support your work and decision-making processes.
                        </p>
                    </div>
                </button>
            </div>
        </div>
    </div>
  )
}
