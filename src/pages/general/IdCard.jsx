import React from 'react'
import FrontCardWrapper from '../../components/id-card/FrontCardWrapper'
import BackCardWrapper from '../../components/id-card/BackCardWrapper'

const IdCard = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'> 
        <div className='flex-col flex lg:flex-row gap-3 w-full justify-center items-center'>
            <FrontCardWrapper />
            <BackCardWrapper />
        </div>

    </div>
  )
}

export default IdCard