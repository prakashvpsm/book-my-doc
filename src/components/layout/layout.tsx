import React from 'react'
import { Link } from 'react-router-dom'

export interface Props { 
  children: React.ReactNode
}

export default function Layout({children}:Props) {
  const logout = () => {
    localStorage.clear()
    setTimeout(() => {
      window.location.reload()
    }, 500);
  }
  return (
    <div className='flex flex-col w-full'>
      <div className='h-16 bg-primary px-10 flex items-center fixed w-full z-50'>
        <div><Link to={'/'} className='text-white font-semibold text-2xl'>BookMyDoc</Link></div>
        <div className='ml-auto'>
          <button onClick={logout} className='text-white'>Logout</button>
        </div>
      </div>
      <div className='p-10 mt-16'>{children}</div>
    </div>
  )
}
