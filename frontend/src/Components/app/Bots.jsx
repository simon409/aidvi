import React, { useState } from 'react'
import SideBar from './components/SideBar'
import Header from './components/Header'
import { BsPlus } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

export default function Bots() {
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
            <h3>Bots</h3>
            <h2 className='text-3xl font-bold'>My Bots</h2>
            <div className="flex flex-col mt-10">
              <h3 className='font-bold'>Monthly usage</h3>
              <div className='mt-3 w-full'>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                  <div className="border rounded-tl-md rounded-bl-md p-5 flex flex-col gap-2">
                    <p className='text-xl'>Bots</p>
                    <p className='text-xl flex gap-2 text-secondary font-bold'>1<p className='text-sm mt-[7px] text-lightprimary font-normal'>/6</p></p>
                  </div>
                  <div className="border p-5 flex flex-col gap-2">
                    <p className='text-lg'>Storage tokens</p>
                    <p className='text-xl flex gap-2 text-secondary font-bold'>0<p className='text-sm mt-[7px] text-lightprimary font-normal'>/600000</p></p>
                  </div>
                  <div className="border rounded-tr-md rounded-br-md p-5 flex flex-col gap-2">
                    <p className='text-lg'>Message tokens</p>
                    <p className='text-xl flex gap-2 text-secondary font-bold'>572<p className='text-sm mt-[7px] text-lightprimary font-normal'>/80000</p></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-10">
              <div className="flex justify-between">
                <h3 className='font-bold'>Bots</h3>
                <a href='/app/bots/new' className='flex bg-primary px-3 py-2 rounded-md text-white'>
                  <div className='my-auto text-2xl'><BsPlus /></div> <p>Add bot</p>
                </a>
              </div>
              <div className='mt-5 w-full'>
                <div class="relative overflow-y-auto rounded-md">
                  <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Created
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Last sync
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Storage tokens
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          <a href="/bot/bot_id1" className='text-secondary font-bold'>testbot</a>
                        </th>
                        <td class="px-6 py-4">
                          05/07/2023 10:13
                        </td>
                        <td class="px-6 py-4">
                          Never
                        </td>
                        <td class="px-6 py-4">
                          0
                        </td>
                        <td class="px-6 py-4">
                          <a href="" className='text-secondary font-bold'>Edit</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
