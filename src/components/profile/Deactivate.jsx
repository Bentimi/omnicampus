import { Ban, TriangleAlert, X } from 'lucide-react'
import React from 'react'

const Deactivate = () => {
  return (
    <div className='grid gap-y-3'>
        <div className='grid gap-y-2'>
            <div className='flex justify-center items-center text-red-600'>
                <TriangleAlert size={70} />
            </div>
            <h1 className='text-center dark:text-omni-light font-semibold'>Do you want to Deactivate your account</h1>
            </div>    
            <div className='flex gap-3'>
                <button className='flex items-center justify-center p-2 gap-2 border w-[8em] rounded-lg border-green-900 text-green-900 hover-bg-red-600 transition-colors transform ease-in-out duration-200 cursor-pointer hover:bg-green-900 hover:text-omni-light font-semibold'>
                    <X size={20} /> Cancel
                </button>
                <button className='flex items-center justify-center p-2 gap-2 border w-[8em] rounded-lg border-red-600 text-red-600 hover-bg-red-600 transition-colors transform ease-in-out duration-200 cursor-pointer hover:bg-red-600 hover:text-omni-light font-semibold'>
                    <Ban size={20} /> Deactivate
                </button>
            </div>
    </div>
  )
}

export default Deactivate