import React from 'react'
import NoCard from '../../../assets/nocardH.png'
import Plane from '../../../assets/Plane.svg'
export default function Hero() {
    return (
        <div className='pt-[60px] w-screen h-screen'>
            <div className='h-[70%] bg-lightblue flex'>
                <div className='flex lg:container'>
                    <div className="m-auto flex">
                        <div className="h-fit w-1/2 flex">
                            <div className="m-auto flex flex-col gap-5">
                                <h1 className='text-[50px] leading-none' style={{ fontWeight: '800' }}>Turn your expertise 🤹 into profitable AI assistant 🤖</h1>
                                <p className='text-[20px]'>
                                    Build meaningful chatbots trained with your
                                    specific knowledge,
                                    and share it with your teams and customers
                                    to gain productivity.
                                </p>
                                <div className="flex gap-2">
                                    <div id="link" className='my-auto w-1/2'>
                                        <a href='/login' className='text-white bg-secondary block text-center py-4 rounded-md text-[20px] font-bold'>Get started for free</a>
                                    </div>
                                    <div id="image" className=' my-auto py-1/2'>
                                        <img src={NoCard} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-fit w-1/2 flex">
                            <div className="py-auto">
                                <img src={Plane} className='h-[300px]' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[15%] bg-lighterblue flex">
                <div className="flex lg:container w-full">
                    <div className="my-auto w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-around">
                        <div className='w-full flex'>
                            <img className='h-4/5 mx-auto' src="https://8a563baecd14e0cd3049e074b6330b41.cdn.bubble.io/f1640793944847x640806144852785300/MixPanel%20Logo.svg" alt="" />
                        </div>
                        <div className='w-full flex'>
                            <img className='h-4/5 mx-auto' src="https://8a563baecd14e0cd3049e074b6330b41.cdn.bubble.io/f1640793986007x358970276892368400/Capterra.svg" alt="" />
                        </div>
                        <div className='w-full flex'>
                            <img className='h-4/5 mx-auto' src="https://8a563baecd14e0cd3049e074b6330b41.cdn.bubble.io/f1640794005028x486474626335192260/ElevateLogo.svg" alt="" />
                        </div>
                        <div className='w-full flex'>
                            <img className='h-4/5 mx-auto' src="https://8a563baecd14e0cd3049e074b6330b41.cdn.bubble.io/f1640794036559x916423751551680500/OptimzelyLogo.svg" alt="" />
                        </div>
                        <div className='w-full flex'>
                            <img className='h-4/5 mx-auto' src="https://8a563baecd14e0cd3049e074b6330b41.cdn.bubble.io/f1640794054654x752596379224221900/SoFi%20Logo.svg" alt="" />
                        </div>
                        <div className='w-full flex'>
                            <img className='h-4/5 mx-auto' src="https://8a563baecd14e0cd3049e074b6330b41.cdn.bubble.io/f1640794080611x134013407683466030/Mendability.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[15%]"></div>
        </div>
    )
}
