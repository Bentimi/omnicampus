import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Ban, CheckCircle, TriangleAlert, X } from 'lucide-react'
import React from 'react'
import { deactivate_User } from '../../services/userApi'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router'

const Deactivate = ({ text, user, onClose }) => {
    const { logout, userAuth } = useAuth()
    // console.log(userAuth?._id)
    // console.log(user?._id)
    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (userId) => deactivate_User(userId),
        onSuccess: async (res) => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            toast.success(res?.message)
            if (user?._id === userAuth?._id) {
                await logout()
                // navigate('/login')
            } else {
                onClose()
            }
        },
        onError: (err) => {
            toast.error(err?.message)
        }
    })
    const handleBtn = (userId) => {
        mutation.mutate(userId)
        
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
                    user?.active ? ' deactivate' : ' activate'
                } {text ? 'this' : 'your'} account?</h1>
            </div>    
            <div className='flex gap-3'>
                <button 
                className='flex items-center justify-center p-2 gap-2 border w-full rounded-lg border-green-900 text-green-900 hover-bg-red-600 transition-colors transform ease-in-out duration-200 cursor-pointer hover:bg-green-900 hover:text-omni-light font-semibold'
                type='button'
                onClick={() => handleClose()}
                >
                    <X size={20} /> Cancel
                </button>
                <button className={`flex items-center justify-center p-2 gap-2 border w-full rounded-lg  hover-bg-red-600 transition-colors transform ease-in-out duration-200 cursor-pointer hover:text-omni-light font-semibold ${
                    !user?.active? ' border-green-600 text-green-600 hover:bg-green-600' : ' border-red-600 text-red-600 hover:bg-red-600'
                }`}
                onClick={() => handleBtn(user._id)}
                >
                    {
                    !user?.active ? <span className='flex items-center gap-2'><CheckCircle size={20} /> Activate</span> : <span className='flex items-center gap-2'><Ban size={20} /> Deactivate</span>
                }
                </button>
            </div>
    </div>
  )
}

export default Deactivate