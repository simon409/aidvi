import React, { useState, useEffect } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { BiMenuAltLeft } from 'react-icons/bi'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'

export default function Header({ setopennavmob, opennavmob }) {
  const [openmenu, setopenmenu] = useState(false)
  const History = useHistory()
  const [User, setUser] = useState({})

  useEffect(() => {
    // Check login status
    fetch(import.meta.env.VITE_API_LINK+'/@me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data)=>{
        setUser(data)
        console.log(User)
      })
      .catch((error) => {
        console.error('Error:', error);
        History.push('/login')
      });
  }, []);

  const Menu = () => {
    const HandelLogout = () => {
      fetch(import.meta.env.VITE_API_LINK+'/logout', {
        method: 'POST',
        credentials: "include" // Include credentials (cookies)
      })
        .then((response) => {
          if (response.ok) {
            // Clear any stored user data or session information on the frontend
            // Redirect the user to the login page
            History.push('/login');
          } else {
            // Handle any error or failure cases
            console.error('Logout failed');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    return (
      <div className='absolute right-5 top-[60px] w-[200px] h-fit px-4 py-2 bg-lightblue rounded border border-primary'>
        <button className='block h-full' onClick={HandelLogout}>Logout</button>
      </div>
    )
  }
  return (
    <div className='w-full flex h-full px-4'>
      <button className='text-3xl block lg:hidden' onClick={() => setopennavmob(true)}>
        <BiMenuAltLeft />
      </button>
      <button className='ml-auto my-auto flex gap-3 text-lg' onClick={()=>setopenmenu(!openmenu)}>
        <p className='my-auto hidden md:block lg:block'>{User.email}</p>
        <div className='my-auto p-2 bg-lightblue rounded-full'> <BsFillPersonFill /> </div>
      </button>
      {
        openmenu ? <Menu /> : null
      }
    </div>
  )
}
