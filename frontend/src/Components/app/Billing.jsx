import React, {useState} from 'react'
import SideBar from './components/SideBar'
import Header from './components/Header'
import { AiOutlineClose } from 'react-icons/ai'

export default function Billing() {
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
      <div className="w-[80%] h-full bg-lighterblue flex flex-col">
        <div className="h-[7%]"><Header setopennavmob={setopennavmob} opennavmob={opennavmob} /></div>
        <div className="h-[93%] lg:container w-full p-4">
          content
        </div>
      </div>
    </div>
  )
}
