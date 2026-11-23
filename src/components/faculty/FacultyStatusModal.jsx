import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'
import { facultyStatus } from '../../services/facultyApi'
import { Ban, CheckCircle, TriangleAlert, X } from 'lucide-react'

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
                className='flex items-center justify-center p-2 gap-2 border w-full rounded-lg border-red-500 text-red-500 hover-bg-red-600 transition-colors transform ease-in-out duration-200 cursor-pointer hover:bg-red-500 hover:text-omni-light font-semibold'
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
                    {
                    !data?.isActive ? <span className='flex items-center gap-2'><CheckCircle size={20} /> Activate</span> : <span className='flex items-center gap-2'><Ban size={20} /> Deactivate</span>
                }
                </button>
            </div>
    </div>
  )
}

export default FacultyStatusModal