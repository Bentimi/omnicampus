import React from 'react'
import { formatDate } from '../../services/formatDate'
import { X } from 'lucide-react';

const ViewFaculty = ({ data, onClose }) => {
  const handleClose = () => {
    onClose();
  }
  return (
    <div className='flex flex-col gap-2 w-[20em] lg:w-[30em] p-2'>
        {/* <div>ViewFaculty</div>
        {data?._id}
        {data?.faculty}
        {data?.createdBy?.email}
        {formatDate(data?.createdAt, 'date')}
        <button 
        type="button" 
        onClick={onClose}
        className='cursor-pointer'
        >Close</button> */}
        <div className='flex justify-between items-center w-full'>
          <h1 className='font-semibold text-lg'>Faculty Details</h1>
          <button type="button" onClick={handleClose} className='text-red-600 hover:text-red-500 font-semibold border rounded-lg hover:scale-105 cursor-pointer'><X /></button>
        </div>

        <main className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
          <div>
            <p className='text-gray-400 text-md font-semibold'>Faculty Name</p>
            <h1 className='font-semibold'>{data?.faculty}</h1>
          </div>
          <div>
            <p className='text-gray-400 text-md font-semibold'>Created By</p>
            <h1 className='font-semibold'>{data?.createdBy?.first_name}</h1>
          </div>
          <div>
            <p className='text-gray-400 text-md font-semibold'>Last Updated By</p>
            <h1 className='font-semibold'>{data?.lastUpdatedBy?.first_name || 'Not updated'}</h1>
          </div>
          <div>
            <p className='text-gray-400 text-md font-semibold'>Faculty Name</p>
            <h1 className='font-semibold'>{data?.faculty}</h1>
          </div>
          <div>
            <p className='text-gray-400 text-md font-semibold'>Status</p>
            <h1 className={`font-semibold w-[5em] text-center rounded-md p-2 ${data?.isActive ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'}`}>{data?.isActive? 'Active' : 'Inactive'}</h1>
          </div>
        </main>

        <div className='flex justify-end h-12 items-center'>
          <button type="button" onClick={handleClose} className='text-red-600 hover:text-red-500 font-semibold cursor-pointer'>
            close
          </button>
        </div>
    </div>
  )
}

export default ViewFaculty