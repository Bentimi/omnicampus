import { AlertCircleIcon, AlertTriangle, ArrowBigLeft, ArrowLeft, BanIcon, FileQuestion, HomeIcon, LogOut } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const NotFoundPage = () => {
  const { logout } = useAuth()
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/')
  }
  const handleLogout = async () => {
    await logout()
  }
  return (
    <div className='h-screen items-center flex justify-center overflow-none'>
      <div className='shadow-lg w-full max-w-md h-fit flex flex-col gap-3 p-4 justify-center items-center rounded-lg dark:shadow-omni-light/10 dark:bg-omni-navy'>
        <div className='bg-orange-100 text-orange-600 rounded-full p-2.5 flex justify-center items-center'>
          <FileQuestion size={36} />
        </div>
        <span className='font-semibold text-orange-400 tracking-wider text-xs'>
          Error 404
        </span>
        <h1 className='font-bold text-3xl tracking-tight text-gray-500 dark:text-white'>Page Not found</h1>
        <p className='font-semibold text-sm leading-relaxed text-gray-600 dark:text-white'>
          Oops! The page you are looking for might have been removed
        </p>
        
          <div className='grid grid-cols-2 gap-1'>
            <button 
          type="button"
          className='bg-green-900 text-white w-full p-2 rounded-lg cursor-pointer hover:bg-green-800 flex items-center justify-center gap-2 text-lg font-semibold'
          onClick={() => handleNavigate()}
        >
         <HomeIcon /> Home
        </button>
        <button 
          type="button"
          className='bg-orange-900 text-white w-full p-2 rounded-lg cursor-pointer hover:bg-orange-800 flex items-center justify-center gap-2 text-lg font-semibold'
          onClick={() => navigate(-1)}
        >
         <ArrowLeft /> Previous Page
        </button>
          </div>
        
      </div>
    </div>
  )
}

export default NotFoundPage