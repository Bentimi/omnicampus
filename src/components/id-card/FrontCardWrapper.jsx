import React from 'react'
import Design from './Design'
import FrontView from './FrontView'

const FrontCardWrapper = () => {
  return (
    <div>
      <Design child={<FrontView />} />
    </div>
  )
}

export default FrontCardWrapper