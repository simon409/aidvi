import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { BsPlus } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

export default function NewBots() {
  const [opennavmob, setopennavmob] = useState(false)
  return (
    <div className='flex w-screen h-screen'>
      <div className={`lg:w-[20%] w-[300px] lg:relative fixed z-50 h-full bg-lightblue ${opennavmob ? 'lg:-translate-x-0 -translate-x-0' : 'lg:-translate-x-0 -translate-x-full'} transition-all ease-in-out duration-200`}>
        <SideBar />
      </div>
      <div className={`fixed flex w-screen z-40 h-full ${opennavmob ? 'lg:-translate-x-full -translate-x-0' : 'lg:-translate-x-full -translate-x-full'} transition-all ease-in-out duration-200 delay-200`}>
        <div className={`w-full h-full absolute bg-lightblue ${opennavmob ? 'opacity-80' : 'opacity-0'}`}></div>
        <button onClick={()=>setopennavmob(false)} className='ml-auto mb-auto text-2xl z-10 p-4 text-primary font-bold' style={{ opacity: 1 }}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="lg:w-[80%] w-full h-full bg-lighterblue flex flex-col text-primary">
        <div className="h-[7%]"><Header setopennavmob={setopennavmob} opennavmob={opennavmob} /></div>
        <div className="h-[93%]">
          <div className="lg:container w-full flex flex-col px-5">
            <h3 className='flex w-[130px] justify-between'><p>Bots</p> <p>{'>'}</p> <p>New bot</p></h3>
            <h2 className='text-3xl font-bold'>New bot</h2>
            <div className="mt-10">
                test
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
