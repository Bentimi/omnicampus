import { useEffect } from 'react'

const Modal = ({ isOpen, onClose, children }) => {
  
  return (
    <>
        <div 
        className={`inset-0 fixed flex h-screen z-40 backdrop-blur-sm justify-center items-center transition-transform transform delay-200 duration-300 ${isOpen ? 'block' : 'hidden'}`}>
            <div className='p-6 shadow-2xl w-fit flex flex-col gap-2 items-center justify-center rounded-lg bg-white dark:bg-omni-navy '>
            <div className='flex gap-2 cursor-auto'>{children}</div>
        </div>
        </div>
    </>
  )
}

export default Modal