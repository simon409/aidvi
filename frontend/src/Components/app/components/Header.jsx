import React, { useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import {BiMenuAltLeft} from 'react-icons/bi'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Header({setopennavmob, opennavmob}) {
  const [openmenu, setopenmenu] = useState(true)
  const History = useHistory()

  const Menu = () =>{
    const HandelLogout = () => {
      fetch('http://localhost:5000/logout', {
        method: 'POST',
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
    return(
      <div className='absolute right-5 top-[60px] w-[200px] h-fit px-4 py-2 bg-lightblue rounded border border-primary'>
        <button className='block h-full' onClick={HandelLogout}>Logout</button>
      </div>
    )
  }
  return (
    <div className='w-full flex h-full px-4'>
      <button className='text-3xl block lg:hidden' onClick={()=>setopennavmob(true)}> 
        <BiMenuAltLeft />
      </button>
      <button className='ml-auto my-auto flex gap-3 text-lg'>
        <p className='my-auto hidden md:block lg:block'>testmail@example.com</p>
        <div className='my-auto p-2 bg-lightblue rounded-full'> <BsFillPersonFill /> </div>
      </button>
      {
        openmenu ? <Menu /> : null
      }
    </div>
  )
}
