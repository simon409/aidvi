import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

export default function Pricing() {
  return (
    <div id='pricing' className='lg:container my-24 p-4'>
      <h1 className='text-5xl text-center font-bold'>Pricing</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-2 place-items-center">
        {/*plans */}
        <div className="p-4 bg-[#F1F9FA] rounded-2xl mt-20 h-[500px] w-[350px]">
          <div className="flex flex-col gap-8 h-full">
            <h3 className='text-xl font-bold'>Starter</h3>
            <h2 className='text-5xl font-bold'>Free</h2>
            <a href="/register" className='text-xl bg-secondary w-fit py-4 px-10 rounded-lg text-white font-bold '>Get Starter Plan</a>
            <ul className='flex flex-col gap-5'>
              <li className='flex text-xl'> <div className="my-auto px-2"><FiCheckCircle /></div> Talk with public chatbots</li>
              <li className='flex text-xl'> <div className="my-auto px-2"><FiCheckCircle /></div> Talk with private chatbots (if added by bot creator)</li>
            </ul>
          </div>
        </div>
        <div className="p-4 bg-[#F6FAFE] rounded-2xl mt-20 h-[500px] w-[350px]">
          <div className="flex flex-col gap-8 h-full">
            <h3 className='text-xl font-bold'>Essential</h3>
            <h2 className='text-5xl font-bold'>$30<p className='text-xl inline'>/month</p></h2>
            <a href="/register" className='text-xl bg-secondary w-fit py-4 px-10 rounded-lg text-white font-bold '>Get Essential Plan</a>
            <ul className='flex flex-col gap-5'>
              <li className='flex text-xl'> <div className="my-auto px-2"><FiCheckCircle /></div> Features of Starter Plan</li>
              <li className='flex text-xl'> <div className="my-auto px-2"><FiCheckCircle /></div> Create 1 chatbot</li>
              <li className='flex text-xl'> <div className="my-auto px-2"><FiCheckCircle /></div> 100K words limit per month (training and messages)</li>
            </ul>
          </div>
        </div>
        <div className="p-4 bg-[#FBF9FA] rounded-2xl mt-20 h-[500px] w-[350px] lg:col-span-1 md:col-span-2">
          <div className="flex flex-col gap-8 h-full">
            <h3 className='text-xl font-bold'>Pro</h3>
            <h2 className='text-5xl font-bold'>$100<p className='text-xl inline'>/month</p></h2>
            <a href="/register" className='text-xl bg-secondary w-fit py-4 px-10 rounded-lg text-white font-bold '>Get Pro Plan</a>
            <ul className='flex flex-col gap-5'>
              <li className='flex text-xl'> <div className="my-auto px-2"><FiCheckCircle /></div> Features of Essential Plan</li>
              <li className='flex text-xl'> <div className="my-auto px-2"><FiCheckCircle /></div> Create unlimited chatbots</li>
              <li className='flex text-xl'> <div className="my-auto px-2"><FiCheckCircle /></div> 1M words limit per month (training and messages)</li>
              <li className='flex text-xl'> <div className="my-auto px-2"><FiCheckCircle /></div> Publish free and paid chatbots in marketplace</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
