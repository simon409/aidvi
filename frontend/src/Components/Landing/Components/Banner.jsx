import React, { useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'

export default function Banner() {
    const [closed, setclosed] = useState(false)
    return (
        <div className="fixed w-full z-10">
            <div className={`flex w-full absolute bottom-0 bg-secondary h-[60px] ${closed ? 'hidden' : ''}`}>
                <div className="flex w-20">
                    <button onClick={()=>setclosed(true)} className='my-auto mx-auto text-2xl text-white font-bold'><AiOutlineClose /></button>
                </div>
                <div className="flex w-full">
                    <a href="/login" className='h-full w-full text-center text-white font-bold flex hover:underline'>
                        <p className='m-auto'>Exclusive Offer: Try our Public Bots now!</p>
                    </a>
                </div>
            </div>
        </div>
    )
}
