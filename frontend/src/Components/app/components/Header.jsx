import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import {BiMenuAltLeft} from 'react-icons/bi'

export default function Header({setopennavmob, opennavmob}) {
  return (
    <div className='w-full flex h-full px-4'>
      <button className='text-3xl block lg:hidden' onClick={()=>setopennavmob(true)}> 
        <BiMenuAltLeft />
      </button>
      <button className='ml-auto my-auto flex gap-3 text-lg'>
        <p className='my-auto hidden md:block lg:block'>testmail@example.com</p>
        <div className='my-auto p-2 bg-lightblue rounded-full'> <BsFillPersonFill /> </div>
      </button>
    </div>
  )
}
