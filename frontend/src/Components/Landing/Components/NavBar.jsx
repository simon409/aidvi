import React, { useState } from 'react'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'

function MenuMob({MenuOpen, setMenuOpen}){
    return(
        <div className={`absolute ${MenuOpen ? 'top-[60px] opacity-100' : '-top-[180px] opacity-0'} w-full h-[fit] bg-white -z-10 transition-all ease-in-out duration-500`}>
            <ul>
                <li className='py-2 px-3'><a href="#benefits" onClick={()=>setMenuOpen(false)} className='text-md'>Benefits</a></li>
                <hr />
                <li className='py-2 px-3'><a href="#steps" onClick={()=>setMenuOpen(false)} className='text-md'>How it works</a></li>
                <hr />
                <li className='py-2 px-3'><a href="#testimonials" onClick={()=>setMenuOpen(false)} className='text-md'>Testimonials</a></li>
                <hr />
                <li className='py-2 px-3'><a href="#pricing" onClick={()=>setMenuOpen(false)} className='text-md'>Pricing</a></li>
                <hr />
                <li className='py-2 px-3'><a href="/login" onClick={()=>setMenuOpen(false)} className='text-md text-secondary'>Get started for free</a></li>
                <hr />
            </ul>
        </div>
    )
}

export default function NavBar() {
    const [MenuOpen, setMenuOpen] = useState(false)
  return (
    <div className='w-full h-[60px] bg-lightblue flex'>
        <div className="lg:container w-full flex justify-between p-2">
            <div className='my-auto'>
                <a href="/" className='text-[30px] font-bold pl-1 text-primary'>✨aidvi</a>
            </div>
            <div className='my-auto'>
                <ul className='lg:flex gap-8 hidden'>
                    <li className='text-md font-bold'><a href="#benefits" onClick={()=>setMenuOpen(false)}>Benefits</a></li>
                    <li className='text-md font-bold'><a href="#steps" onClick={()=>setMenuOpen(false)}>How it works</a></li>
                    <li className='text-md font-bold'><a href="#testimonials" onClick={()=>setMenuOpen(false)}>Testimonials</a></li>
                    <li className='text-md font-bold'><a href="#pricing" onClick={()=>setMenuOpen(false)}>Pricing</a></li>
                    <li className='text-md font-bold'><a className="py-4 px-4 bg-secondary text-white rounded-md" href="/login">Get started for free</a></li>
                </ul>
                <div className="inline lg:hidden">
                    <button onClick={()=>setMenuOpen(!MenuOpen)} className='text-3xl'>{!MenuOpen ? <AiOutlineMenu/> : <AiOutlineClose/>}</button>
                </div>
            </div>
        </div>
        <MenuMob MenuOpen={MenuOpen} setMenuOpen={setMenuOpen}/>
    </div>
  )
}
