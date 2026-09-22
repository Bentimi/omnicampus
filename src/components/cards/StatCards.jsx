import React from 'react'

const StatCards = ({title, icon, number, text}) => { 
  return (
    <>
      <div className='flex justify-between w-[20em] lg:w-[18em] h-30 shadow-lg dark:shadow-omni-light/5 dark:border-omni-light dark:border-1 p-3 bg-white dark:bg-omni-navy rounded-lg gap-2'>
        <div className='flex justify-center items-center'>
          {icon}
        </div>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='font-semibold text-xl dark:text-omni-light'>{title}</h1>
          <h1 className={`flex justify-end items-center text-5xl text-clip font-bold ${text}`}>{number}</h1>
        </div>
      </div>
    </>
  )
}

export default StatCards