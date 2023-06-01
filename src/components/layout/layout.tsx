import React from 'react'

export interface Props { 
  children: React.ReactNode
}

export default function Layout({children}:Props) {
  return (
    <div className='flex flex-col w-full'>
      <div className='h-16 bg-primary px-10 flex items-center fixed w-full z-50'>
        <div><h1 className='text-white font-semibold text-2xl'>BookMyDoc</h1></div>
        <div className='ml-auto'>
          <button className='text-white'>Logout</button>
        </div>
      </div>
      <div className='p-10 mt-16'>{children}</div>
    </div>
  )
}
