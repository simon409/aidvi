import React, {useState} from 'react'
import SideBar from './components/SideBar'
import Header from './components/Header'
import { AiOutlineClose, AiFillInfoCircle } from 'react-icons/ai'
import './styles/style.css'

export default function Account() {
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
      <div className="lg:w-[80%] w-full h-full bg-lighterblue flex flex-col">
        <div className="h-[7%]"><Header setopennavmob={setopennavmob} opennavmob={opennavmob} /></div>
        <div className="h-[93%] pb-10 lg:container w-full p-4">
          <h1 className='text-3xl font-bold'>Account</h1>
          <div className="mt-5 flex lg:flex-row flex-col gap-5">
            <div className="lg:w-1/3 w-full h-full flex flex-col">
              <div id="accountdetails">
                <h3 className='text-xl font-bold'>Account details</h3>
                <div className=" rounded-md mt-3 p-4 flex flex-col gap-3">
                  <p>Email</p>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mail" type="text" placeholder="Email address" />
                  <button className='w-fit ml-auto px-3 py-2 bg-lightprimary text-white rounded-md'>Change email</button>
                </div>
              </div>
              <div id="changepassword" className='mt-10'>
                <h3 className='text-xl font-bold'>Change password</h3>
                <div className="border rounded-md mt-3 p-4 flex flex-col gap-3">
                  <p>To change your password you need to request a password reset email.</p>
                  <button className='w-fit ml-auto px-3 py-2 bg-lightprimary text-white rounded-md'>Request change password</button>
                </div>
              </div>
              <div id="accountdeletion" className='mt-10'>
                <h3 className='text-xl font-bold'>Account deletion</h3>
                <div className="border rounded-md mt-3 p-4 flex flex-col gap-3">
                  <p>Removes all your data from our servers.</p>
                  <button className='w-fit ml-auto px-3 py-2 bg-red-500 text-white rounded-md'>Delete account</button>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 w-full h-full flex flex-col">
              <div id="linkedaccounts">
                <h3 className='text-xl font-bold'>Account details</h3>
                <div className="border rounded-md mt-3 p-4 flex flex-col gap-3">
                  <p>Below are your connected accounts that can be used as data sources.</p>
                  <div className='flex gap-2 p-4 bg-secondary rounded-md text-white'>
                    <div className='my-auto'><AiFillInfoCircle/></div>
                    <p>No connected accounts.</p>
                  </div>
                </div>
              </div>
              <div id="Emailpreferences" className='mt-5'>
                <h3 className='text-xl font-bold'>Email preferences</h3>
                <div className="border rounded-md mt-3 p-4 flex flex-col gap-3">
                  <p>Manage your email preferences below</p>
                  <div className="flex gap-3">
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                  <p className='my-auto'>Receive Chat Thing app notifications emails?</p>
                  </div>
                  <div className='flex gap-2 p-4 bg-secondary rounded-md text-white'>
                    <div className='my-auto'><AiFillInfoCircle/></div>
                    <p>Notification emails include emails triggered by your account such as when a data source finishes syncing, weekly usage summaries, account errors and more.</p>
                  </div>
                  <button className='w-fit ml-auto px-3 py-2 bg-lightprimary text-white rounded-md'>Update email's preferences</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
