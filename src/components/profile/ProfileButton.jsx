import { Ban, Pen } from 'lucide-react'
import React from 'react'

const ProfileButton = () => {
  return (
    <>
        <div className='flex flex-wrap gap-3'>
            <button type="button" className='border border-blue-700 p-2 w-[8em] font-semibold transition-colors duration-200 hover:bg-blue-700 ease-in-out hover:text-omni-light cursor-pointer text-blue-700 flex items-center justify-center gap-2 rounded-lg'><Pen size={16} /> Edit</button>
            <button type="button" className='border border-red-700 p-2 w-[8em] font-semibold transition-colors duration-200 hover:bg-red-700 ease-in-out hover:text-omni-light cursor-pointer text-red-700 flex items-center justify-center gap-2 rounded-lg'><Ban size={16} /> Deactivate</button>
        </div>
    </>
  )
}

export default ProfileButton