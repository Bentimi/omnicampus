import { useEffect } from 'react'
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, children }) => {

  // useEffect({
  //   const cliv
  // })

  const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }
    };
  
  return (
    <>
    <motion.div
    variants={containerVariants}
                initial="hidden"
                animate="visible"
    // >

    //     <div 
        className={`inset-0 fixed flex h-screen z-40 backdrop-blur-sm justify-center items-center transition-transform transform delay-200 duration-300 ${isOpen ? 'block' : 'hidden'}`}>
            <motion.div
            variants={itemVariants}
             className='p-6 shadow-2xl w-fit flex flex-col gap-2 items-center justify-center rounded-lg bg-white dark:bg-omni-navy '>
            <div className='flex gap-2 cursor-auto'>{children}</div>
        </motion.div>
        {/* </div> */}

        </motion.div>
    </>
  )
}

export default Modal