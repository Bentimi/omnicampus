import React from 'react'

const Modal = ({ children }) => {
  return (
    <>
        <div className='inset-0 fixed flex h-screen z-30 backdrop-blur-sm justify-center items-center hidden'>
            <div className='p-6 shadow-2xl w-5/6 md:w-3/6 lg:w-2/7 flex flex-col gap-2 items-center justify-center rounded-lg bg-white dark:bg-omni-navy '>
            <div className='flex gap-2'>{children}</div>
        </div>
        </div>
    </>
  )
}

export default Modal