import React from 'react'
import { BsFillChatLeftDotsFill, BsFillPersonFill } from 'react-icons/bs'
import { RiBankCardFill } from 'react-icons/ri'

export default function SideBar() {
  return (
    <div className='w-full h-full flex flex-col justify-between relative'>
      <div>
        <div className='p-4'>
          <a href="/" className='text-[25px] font-bold text-primary'>✨aidvi</a>
        </div>
        <div className="p-4">
          <ul className='list-none flex flex-col gap-2'>
            <li className='w-full'><a href="/app/bots" className={`flex gap-3 font-bold text-lg px-3 py-2 hover:bg-lighterblue transition-all ease-in-out duration-150 ${window.location.pathname.includes('/app/bots') ? 'bg-lighterblue' : ''}`}> <div className="my-auto"><BsFillChatLeftDotsFill /> </div> <p className='my-auto'>My bots</p></a></li>
            <li className='w-full'><a href="/app/account" className={`flex gap-3 font-bold text-lg px-3 py-2 hover:bg-lighterblue transition-all ease-in-out duration-150 ${window.location.pathname.includes('/app/account') ? 'bg-lighterblue' : ''}`}> <div className="my-auto"><BsFillPersonFill /> </div> <p className='my-auto'>Account</p></a></li>
            <li className='w-full'><a href="/app/billing" className={`flex gap-3 font-bold text-lg px-3 py-2 hover:bg-lighterblue transition-all ease-in-out duration-150 ${window.location.pathname.includes('/app/billing') ? 'bg-lighterblue' : ''}`}> <div className="my-auto"><RiBankCardFill /> </div> <p className='my-auto'>Billing</p></a></li>
          </ul>
        </div>
      </div>
      <div className="relative bottom-0 p-4">
        <div className="px-3 py-2 bg-primary text-white rounded-md">
          <a href="#" className='hover:underline'>Featured in ...</a>
        </div>
      </div>
    </div>
  )
}
