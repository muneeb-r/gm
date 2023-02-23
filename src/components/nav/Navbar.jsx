import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-600 h-[60px] z-50 shadow-md px-4 py-1 flex justify-between items-center sticky top-0'>
      <div className="flex">
        <img className='h-14' src="/favicon.png" alt="GM School" />
      </div>
      <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-900 hover:bg-opacity-25 active:bg-opacity-10 hover:shadow px-2 py-1 rounded">
        <img className='h-9 w-9 rounded-full' src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80" alt="" />
        <span className='text-white font-roboto'>Nazim</span>
        <div className='text-white'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </nav>
  )
}

export default Navbar