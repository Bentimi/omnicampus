import { ArrowBigRight, ArrowRight, Calendar, Calendar1, X } from 'lucide-react'
import React from 'react'
import { formatDate } from '../../services/formatDate'

const SessionProfile = ({ session, onClose }) => {
  return (
    <div>
        <div className='dark:text-omni-light w-[20em] lg:w-[30em] p-2'>
            <div className='flex justify-between py-2'>
                <h1 className='font-semibold text-xl flex gap-2 items-center'><span><Calendar size={18} /></span> Session Profile</h1>
                <button type="button"
                className='cursor-pointer text-red-500 border p-2 hover:scale-110 rounded-lg'
                onClick={onClose}
                >
                    <X size={18} />
                </button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 space-x-3 space-y-2'>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Session</p>
                    <h1 className='font-semibold'>{session?.session}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Start Date</p>
                    <h1 className='font-semibold'>{formatDate(session?.startDate)}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>End Date</p>
                    <h1 className='font-semibold'>{formatDate(session?.endDate)}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Registered By</p>
                    <a href={`/user/profile/${session?.createdBy?._id}`}>
                        <h1 className='font-semibold  flex items-center gap-1'>{session?.createdBy?.first_name} {session?.createdBy?.last_name} 
                            <span className='hover:scale-110 hover:animate-pulse'>
                                <ArrowRight size={18} /></span>
                            </h1> 
                    </a>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Updated By</p>
                    <a href={`/user/profile/${session?.lastUpdatedBy?._id}`}>
                    <h1 className='font-semibold'>
                        {
                            session?.lastUpdatedBy ? <span className='flex gap-1 items-center'>{session?.lastUpdatedBy?.first_name} {session?.lastUpdatedBy?.last_name} <span className='hover:scale-110 hover:animate-pulse'>
                                <ArrowRight size={18} /></span></span> : 'Not Provided'
                        }
                        </h1>
                        </a>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Status</p>
                    <h1 className={`font-semibold text-xs w-fit p-2 rounded-lg ${session?.isActive ? 'text-green-500 bg-green-500/20' : 'text-red-500 bg-red-500/20'}`}>{session?.isActive ? 'Active' : 'Inactive'}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SessionProfile