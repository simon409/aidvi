import React, { useState } from 'react'
import SideBar from './components/SideBar'
import Header from './components/Header'
import { AiOutlineClose } from 'react-icons/ai'
import { BsPersonCircle, BsFillFileEarmarkFill, BsFillDatabaseFill } from 'react-icons/bs'
import { GiProcessor } from 'react-icons/gi'
import { AiFillMessage, AiOutlineCheck } from 'react-icons/ai'

export default function Billing() {
  const [opennavmob, setopennavmob] = useState(false)
  const [plan, setplan] = useState(0)
  return (
    <div className='flex w-full h-screen'>
      <div className={`lg:w-[20%] w-[300px] h-screen lg:relative fixed z-50 bg-lightblue ${opennavmob ? 'lg:-translate-x-0 -translate-x-0' : 'lg:-translate-x-0 -translate-x-full'} transition-all ease-in-out duration-200`}>
        <SideBar />
      </div>
      <div className={`fixed flex w-screen z-40 h-full ${opennavmob ? 'lg:-translate-x-full -translate-x-0' : 'lg:-translate-x-full -translate-x-full'} transition-all ease-in-out duration-200 delay-200`}>
        <div className={`w-full h-full absolute bg-lightblue ${opennavmob ? 'opacity-80' : 'opacity-0'}`}></div>
        <button onClick={() => setopennavmob(false)} className='ml-auto mb-auto text-2xl z-10 p-4 text-primary font-bold' style={{ opacity: 1 }}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="w-[80%] h-full bg-lighterblue flex flex-col">
        <div className="h-[7%]"><Header setopennavmob={setopennavmob} opennavmob={opennavmob} /></div>
        <div className="h-[93%] lg:container w-full p-4">
          <div className="lg:container w-full flex flex-col px-5">
            <h2 className='text-3xl font-bold'>Billing</h2>
            <div className="flex flex-col mt-10">
              <h3 className='font-bold'>Current plan</h3>
              <div className='mt-3 w-full'>
                <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-3">
                  <div className="border rounded-md p-5 flex gap-2">
                    <div className="w-[20%] my-auto text-2xl">
                      <BsPersonCircle />
                    </div>
                    <div className="w-[80%]">
                      <p className='text-md'>Current plan</p>
                      <p className='text-xl flex gap-2 text-secondary font-bold'>Free</p>
                    </div>
                  </div>
                  <div className="border rounded-md p-5 flex gap-2">
                    <div className="w-[20%] my-auto text-2xl">
                      <GiProcessor />
                    </div>
                    <div className="w-[80%]">
                      <p className='text-md'>Max chatbots</p>
                      <p className='text-xl flex gap-2 text-secondary font-bold'>1</p>
                    </div>
                  </div>
                  <div className="border rounded-md p-5 flex gap-2">
                    <div className="w-[20%] my-auto text-2xl">
                      <BsFillFileEarmarkFill />
                    </div>
                    <div className="w-[80%]">
                      <p className='text-md'>Data sources</p>
                      <p className='text-xl flex gap-2 text-secondary font-bold'>1</p>
                    </div>
                  </div>
                  <div className="border rounded-md p-5 flex gap-2">
                    <div className="w-[20%] my-auto text-2xl">
                      <BsFillDatabaseFill />
                    </div>
                    <div className="w-[80%]">
                      <p className='text-md'>Storage tokens</p>
                      <p className='text-xl flex gap-2 text-secondary font-bold'>600,000</p>
                    </div>
                  </div>
                  <div className="border rounded-md p-5 flex gap-2">
                    <div className="w-[20%] my-auto text-2xl">
                      <AiFillMessage />
                    </div>
                    <div className="w-[80%]">
                      <p className='text-md'>Message tokens</p>
                      <p className='text-xl flex gap-2 text-secondary font-bold'>80,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-10">
              <div className="flex ">
                <h3 className='font-bold'>Available plans</h3>
              </div>
              <div className='mt-5 w-full flex'>
                <div className="flex flex-col w-full">
                  <div className="mx-auto flex gap-2">
                    <button onClick={()=>setplan(0)} className={`px-3 py-1 rounded-full font-bold transition-all ease-in-out duration-100 ${plan==0 ? 'bg-secondary text-white' : 'bg-lightblue  text-primary'}`}>Monthly</button>
                    <button onClick={()=>setplan(1)} className={`px-3 py-1 rounded-full font-bold transition-all ease-in-out duration-100 ${plan==1 ? 'bg-secondary text-white' : 'bg-lightblue  text-primary'}`}>Annually</button>
                  </div>
                  <h1 className='text-center text-2xl font-bold mt-3'>Get two months free on annual plans!</h1>
                </div>
              </div>
              <div className="mt-5">
                <div className="grid grid-cols-3 gap-5">
                  <div className="border rounded-lg w-full p-5 gap-2">
                    <p className='text-md'>Starter</p>
                    <p className='text-3xl text-start flex gap-2 text-primary mt-5 font-bold'>Free</p>
                    <div className="mt-5 w-full">
                      <button className='text-center bg-lightprimary text-white w-full py-2 rounded-md'>Subscribe</button>
                    </div>
                    {/*what in plans */}
                    <div className="mt-5">
                      <ul className='flex flex-col gap-3'>
                        <li className='flex'><div className="w-[10%] mt-1"> <AiOutlineCheck /> </div><div className="w-[90%]">Talk with public chatbots</div></li>
                        <li className='flex'><div className="w-[10%] mt-1"> <AiOutlineCheck /> </div><div className="w-[90%]">Talk with private chatbots (if added by bot creator)</div></li>
                      </ul>
                    </div>
                  </div>
                  <div className="border rounded-lg w-full p-5 gap-2">
                    <p className='text-md'>Essential</p>
                    <p className='text-3xl text-start flex gap-2 text-primary mt-5 font-bold'>$30<p className='mt-auto text-lg'>/month</p> </p>
                    <div className="mt-5 w-full">
                      <button className='text-center bg-lightprimary text-white w-full py-2 rounded-md'>Subscribe</button>
                    </div>
                    {/*what in plans */}
                    <div className="mt-5">
                      <ul className='flex flex-col gap-3'>
                        <li className='flex'><div className="w-[10%] mt-1"> <AiOutlineCheck /> </div><div className="w-[90%]">Features of Starter Plan</div></li>
                        <li className='flex'><div className="w-[10%] mt-1"> <AiOutlineCheck /> </div><div className="w-[90%]">Create 1 chatbot</div></li>
                        <li className='flex'><div className="w-[10%] mt-1"> <AiOutlineCheck /> </div><div className="w-[90%]">100K words limit per month (training and messages)</div></li>
                      </ul>
                    </div>
                  </div>
                  <div className="border rounded-lg w-full p-5 gap-2">
                    <p className='text-md'>Pro</p>
                    <p className='text-3xl text-start flex gap-2 text-primary mt-5 font-bold'>$100<p className='mt-auto text-lg'>/month</p> </p>
                    <div className="mt-5 w-full">
                      <button className='text-center bg-lightprimary text-white w-full py-2 rounded-md'>Subscribe</button>
                    </div>
                    {/*what in plans */}
                    <div className="mt-5">
                      <ul className='flex flex-col gap-3'>
                        <li className='flex'><div className="w-[10%] mt-1"> <AiOutlineCheck /> </div><div className="w-[90%]">Features of Essential Plan</div></li>
                        <li className='flex'><div className="w-[10%] mt-1"> <AiOutlineCheck /> </div><div className="w-[90%]">Create unlimited chatbot</div></li>
                        <li className='flex'><div className="w-[10%] mt-1"> <AiOutlineCheck /> </div><div className="w-[90%]">1,000,000 words limit per month (training and messages)</div></li>
                        <li className='flex'><div className="w-[10%] mt-1"> <AiOutlineCheck /> </div><div className="w-[90%]">Publish free and paid chatbots in marketplace</div></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
