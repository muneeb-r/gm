import { AuthContext } from '@/context/authcontext/AuthContext'
import React, { useContext, useState } from 'react'

const Navbar = ({ }) => {
  const { employee, setTogglesidebarondesktop, handleLogout } = useContext(AuthContext)
  const [showemployeemenu, setShowemployeemenu] = useState(false)


  return (
    <nav className='h-[60px] z-50 bg-blue-600 backdrop-blur-sm bg-opacity-70 rounded-3xl px-4 py-1 flex justify-between items-center sticky top-0'>
      <div className="flex items-center space-x-1">
        <div onClick={() => setTogglesidebarondesktop(prev => !prev)} className="flex hover:border-gray-200 border border-gray-200 p-1 text-gray-100 rounded-lg cursor-pointer hover:bg-opacity-60 active:bg-opacity-40">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </div>
        <img className='h-12' src="/favicon.ico" alt="GM School" />
      </div>
      <div className=' hidden sm:flex items-center w-1/3 rounded-full p-2 bg-white px-4 gap-2 focus-within:border-orange-400'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

        <input className='outline-none flex-1 bg-transparent' type="text" placeholder='Search...' />
      </div>
      <div className="flex relative">
        <div onClick={() => setShowemployeemenu(prev => !prev)} className="flex  items-center text-gray-500 bg-white hover:border-gray-400 hover:text-gray-700 space-x-3 cursor-pointer border border-gray-300 active:bg-opacity-10 p-1 pr-2 rounded-3xl">
          <img className='h-7 w-7 md:h-9 md:w-9 rounded-full bg-white object-cover shadow' src={employee.picture ? employee.picture : '/avatar.png'} alt="" />
          <span className='font-roboto text-sm md:text-md'>{employee.name}</span>
          <div className=''>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
        {showemployeemenu && <div className="absolute top-11 right-0 bg-white shadow-md rounded py-2 scale-up">
          <div className="flex px-4 py-1 cursor-pointer hover:bg-slate-100">{localStorage.getItem('campus')}</div>
          <div onClick={handleLogout} className="flex px-4 py-1 cursor-pointer hover:bg-slate-100">Log out</div>
          <p className='px-4 mt-2 text-xs text-gray-600'>
            Powered by <b className="text-orange-500">CodeCrafters Inc.</b>
          </p>
        </div>}
      </div>
    </nav>
  )
}

export default Navbar