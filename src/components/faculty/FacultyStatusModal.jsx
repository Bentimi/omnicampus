import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'
import { facultyStatus } from '../../services/facultyApi'
import { Ban, CheckCircle, TriangleAlert, X } from 'lucide-react'
import Spinner from '../Spinner'

const FacultyStatusModal = ({ onClose, data }) => {
    // console.log(data.)
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (facultyId) => facultyStatus(facultyId),
        onSuccess: async (res) => {
            queryClient.invalidateQueries({ queryKey: ['faculty'] })
            toast.success(res?.message)
                onClose()
        },
        onError: (err) => {
            toast.error(err?.message)
        }
    })
    const handleBtn = (facultyId) => {
        // console.log(facultyId)
        mutation.mutate(facultyId)
        
    }

    const handleClose = () => {
        onClose()
    }
  return (
    <div className={`grid gap-y-3 w-[20em] ${onClose? 'block' : 'hidden'}`}>
        <div className='grid gap-y-2'>
            <div className='flex justify-center items-center text-red-600'>
                <TriangleAlert size={70} />
            </div>
            <h1 className='text-center dark:text-omni-light font-semibold'>
                Do you want to 
                {
                    data?.isActive ? ' deactivate' : ' activate'
                } this faculty</h1>
            </div>    
            <div className='flex gap-3'>
                <button 
                disabled={mutation.isPending}
                className={`flex items-center justify-center p-2 gap-2 border w-full rounded-lg border-gray-500 text-gray-500 hover-bg-red-600 transition-colors transform ease-in-out duration-200 hover:bg-gray-500 hover:text-omni-light font-semibold ${
                    mutation.isPending ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                type='button'
                onClick={() => handleClose()}
                >
                    <X size={20} /> Cancel
                </button>
                <button className={`flex items-center justify-center p-2 gap-2 border w-full rounded-lg  hover-bg-red-600 transition-colors transform ease-in-out duration-200 cursor-pointer hover:text-omni-light font-semibold ${
                    !data?.isActive? ' border-green-600 text-green-600 hover:bg-green-600' : ' border-red-600 text-red-600 hover:bg-red-600'
                }`}
                onClick={() => handleBtn(data?._id)}
                >
                    { mutation.isPending && (<span className='flex items-center gap-2'><Spinner /></span>)}{
                    !data?.isActive ? <span className='flex items-center gap-2'>{mutation.isPending? 'activating...' : <span className='flex gap-2 items-center justify-center'><CheckCircle size={20} /> Activate</span>}</span> : <span className='flex items-center gap-2'>{mutation.isPending? 'deactivating...' : <span className='flex gap-2 items-center justify-center'><Ban size={20} /> Deactivate</span>}</span>
                }
                </button>
            </div>
    </div>
  )
}

export default FacultyStatusModal