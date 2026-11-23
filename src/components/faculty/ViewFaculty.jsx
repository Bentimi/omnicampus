import React from 'react'
import { formatDate } from '../../services/formatDate'

const ViewFaculty = ({ data, onClose }) => {
  return (
    <div className='flex flex-col gap-2'>
        <div>ViewFaculty</div>
        {data?._id}
        {data?.faculty}
        {data?.createdBy?.email}
        {formatDate(data?.createdAt, 'date')}
        <button 
        type="button" 
        onClick={onClose}
        className='cursor-pointer'
        >Close</button>
    </div>
  )
}

export default ViewFaculty