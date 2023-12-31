import React from 'react'
import Plane from '../../../assets/Plane.svg'

export default function Hero() {
    return (
        <div id='home' className='pt-[60px] w-full h-screen'>
            <div className='lg:h-[70%] h-fit lg:pt-[0px] pt-[30px] bg-lightblue flex'>
                <div className='flex lg:container p-2'>
                    <div className="m-auto flex lg:flex-row flex-col">
                        <div className="h-fit lg:w-1/2  flex">
                            <div className="m-auto flex flex-col gap-5">
                                <h1 className='lg:text-[50px] text-[40px] leading-none' style={{ fontWeight: '800' }}>Turn your expertise 🤹 into profitable AI assistant 🤖</h1>
                                <p className='lg:text-[20px] text-[15px]'>
                                    Build meaningful AI assistants trained with your expertise and knowledge.
                                     And share it with your teams and customers to gain productivity.
                                </p>
                                <div className="flex gap-2">
                                    <div id="link" className='my-auto lg:w-1/2 w-full'>
                                        <a href='/login' className='text-white bg-secondary block text-center py-4 rounded-md text-[20px] font-bold'>Create my Aidvisor</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-fit lg:w-1/2  flex">
                            <div className="py-auto">
                                <img src={Plane} className='h-[300px]' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-[15%] h-fit bg-lighterblue flex">
                <div className="flex lg:container w-full">
                    <div className="my-auto w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 justify-around p-7">
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
            <div className="min-h-[15%] w-fit"></div>
        </div>
    )
}
