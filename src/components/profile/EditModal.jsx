import { Check, Pen, X } from 'lucide-react'
import React from 'react'

const EditModal = () => {
  return (
    <div className='dark:text-omni-light'>
    <span className='flex items-center gap-2 text-2xl font-semibold py-3 dark:text-omni-light'>
        <Pen />
        EditModal
    </span>

    <form >
            <div className='py-3 grid grid-cols-1 lg:grid-cols-2 gap-3 h-[60vh] overflow-scroll scroll-smooth scrollbar-none'>
        <div className='flex flex-col gap-2'>
            <label htmlFor="first_name" className='label'>First Name</label>
            <input type="text" name="first_name" id="first_name" className='modal-input w-[20em] lg:w-full' 
            placeholder='Enter First Name'/>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="last_name" className='label'>Last Name</label>
            <input type="text" name="last_name" id="last_name" className='modal-input w-[20em] lg:w-full' 
            placeholder='Enter Last Name'/>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='label'>Email</label>
            <input type="email" name="email" id="email" className='modal-input w-[20em] lg:w-full' 
            placeholder='Enter your Email'/>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="fisrt_name" className='label'>First Name</label>
            <input type="text" name="first_name" id="first_name" className='modal-input w-[20em] lg:w-full' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="fisrt_name" className='label'>First Name</label>
            <input type="text" name="first_name" id="first_name" className='modal-input w-[20em] lg:w-full' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="fisrt_name" className='label'>First Name</label>
            <input type="text" name="first_name" id="first_name" className='modal-input w-full' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="fisrt_name" className='label'>First Name</label>
            <input type="text" name="first_name" id="first_name" className='modal-input w-full' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="fisrt_name" className='label'>First Name</label>
            <input type="text" name="first_name" id="first_name" className='modal-input w-full' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="fisrt_name" className='label'>First Name</label>
            <input type="text" name="first_name" id="first_name" className='modal-input w-full' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="fisrt_name" className='label'>First Name</label>
            <input type="text" name="first_name" id="first_name" className='modal-input w-full' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="fisrt_name" className='label'>First Name</label>
            <input type="text" name="first_name" id="first_name" className='modal-input w-full' />
        </div>
    </div>
    <div className='flex gap-3 py-3'>
        <button className='flex gap-2 justify-center items-center p-2 border border-red-600 rounded-lg text-red-600 cursor-pointer hover:bg-red-600 hover:text-omni-light font-semibold transition-colors duration-300 transform w-full '>
          <X size={20} />  Close
        </button>
        <button className='flex gap-2 justify-center items-center p-2 border border-green-900 rounded-lg text-green-900 cursor-pointer hover:bg-green-900 hover:text-omni-light font-semibold transition-colors duration-300 transform w-full '>
          <Check size={20} />  Save
        </button>
    </div>
    </form>
    </div>
  )
}

export default EditModal