import React from 'react'

const Design = ({ child }) => {
  return (
    <div>
        <div className='h-[15rem] w-[30rem] rounded-lg shadow-2xl'>
            {child}
        </div>
    </div>
  )
}

export default Design