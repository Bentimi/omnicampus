import { Ban, Pen } from 'lucide-react'
import React from 'react'

const ProfileButton = ({ isEditOpen, isDeactivateOpen }) => {
  return (
    <>
        <div className='flex flex-wrap items-center justify-center gap-3'>
            <button 
            type="button" 
            className='border border-blue-700 p-2 w-full lg:w-[8em] font-semibold transition-colors duration-200 hover:bg-blue-700 ease-in-out hover:text-omni-light cursor-pointer text-blue-700 flex items-center justify-center gap-2 rounded-lg'
            onClick={isEditOpen}
            ><Pen size={16} /> Edit</button>
            <button 
            type="button" 
            className='border border-red-700 p-2 w-full lg:w-[8em] font-semibold transition-colors duration-200 hover:bg-red-700 ease-in-out hover:text-omni-light cursor-pointer text-red-700 flex items-center justify-center gap-2 rounded-lg'
            onClick={isDeactivateOpen}
            ><Ban size={16} /> Deactivate</button>
        </div>
    </>
  )
}

export default ProfileButton