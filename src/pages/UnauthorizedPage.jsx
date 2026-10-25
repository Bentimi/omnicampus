import { AlertCircleIcon, AlertTriangle, ArrowLeft, BanIcon, FileQuestion, HomeIcon, LogOut, ShieldAlert } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const UnauthorizedPage = () => {
  const { logout } = useAuth()
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1)
  }
  const handleLogout = async () => {
        await logout()
        navigate('/login')
    }
  return (
    <div className='h-screen items-center flex justify-center overflow-none'>
          <div className='shadow-lg dark:shadow-omni-light/10 w-full max-w-md h-fit flex flex-col gap-3 p-4 justify-center items-center rounded-lg'>
            <div className='bg-red-100 text-red-600 rounded-full p-2.5 flex justify-center items-center'>
          <ShieldAlert size={36} />
        </div>
            <span className='font-semibold text-gray-400 tracking-wider text-xs'>
             Access Denied
            </span>
            <h1 className='font-bold text-xl tracking-tight text-gray-500 dark:text-white'>Page not authorized, restricted access</h1>
            
             <div className='grid grid-cols-2 gap-2'>
            <button 
          type="button"
          className='bg-green-900 text-white w-full p-2 rounded-lg cursor-pointer hover:bg-green-800 flex items-center justify-center gap-2 text-lg font-semibold'
          onClick={handleGoBack}
        >
         <ArrowLeft /> Go back
        </button>
        <button 
          type="button"
          className='bg-orange-900 text-white w-full p-2 rounded-lg cursor-pointer hover:bg-orange-800 flex items-center justify-center gap-2 text-lg font-semibold'
          onClick={handleLogout}
        >
         <LogOut /> Logout
        </button>
          </div>
            
          </div>
        </div>
  )
}

export default UnauthorizedPage