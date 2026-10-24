import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Save, ShieldCogCorner, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { role_allocation } from '../../services/userApi'
import { toast } from 'react-toastify'
import Spinner from '../Spinner'

const UserRole = ({ user, onClose }) => {
    const { register, handleSubmit, control, reset, formState: {
        isSubmitted, isLoading, errors
    } } = useForm({
        mode: 'onChange',
        defaultValues: {
            role: ''
        }
    })

    useEffect(() => {
        if (user) {
            reset({
                role: user?.role || ''
            })
        }
    }, [user, reset])

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data) => role_allocation(user?._id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            handleClose()
            toast.success(res?.message)
        },
        onError: (e) => {
            toast.error(e?.message)
        }
    })

    const onSubmit = (data) => {
        mutation.mutate(data)
    }

    const handleClose = () => {
        onClose()
        reset()
    }
  return (
    <div>
        <div className='flex justify-between w-[20em]'>
            <h1 className='flex items-center gap-2 font-semibold text-xl'><ShieldCogCorner /> Role Allocation</h1>
            <button 
            type="button"
            onClick={() => handleClose()}
            >
                <X className='border border-red-600 text-red-600 hover:scale-110 cursor-pointer rounded-md' />
            </button>
        </div>
        <div>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='p-3 grid grid-cols-1 gap-3 min-h-[20vh] max-h-[60vh] w-full overflow-scroll'>
                <div className='flex gap-2 items-center'>
                    <label htmlFor="role" className='label'>Name:</label>
                    <span>{user?.first_name} {user?.last_name}</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <label htmlFor="email" className='label'>Email:</label>
                    <span>{user?.email}</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <label htmlFor="phone_number" className='label'>Phone Number:</label>
                    <span>{user?.phone_number}</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <label htmlFor="gender" className='label'>Gender:</label>
                    <span className='capitalize'>{user?.gender ?? 'Not Provided'}</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <label htmlFor="role" className='label'>User Role:</label>
                    <select className={`dark:bg-omni-light border-2 border-gray-300 h-10 p-2 rounded-lg transition-colors duration-200 focus:outline-none cursor-pointer ${errors?.role ? 'error-input' : 'focus:ring-omni-accent/20 focus:border-omni-accent'}`} name='role' 
                    disabled={mutation.isPending}
                    {...register('role', {
                        required: 'Field is required'
                    })}
                    >
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="aspirant">Aspirant</option>
                        <option value="lecturer">Lecturer</option>
                        <option value="principal">Principal</option>
                        <option value="staff">Staff</option>
                        <option value="student">Student</option>
                        <option value="user">User</option>
                    </select>
                    {errors?.role?.message && <small className='error'>{errors?.role?.message}</small>}
                </div>
                <button 
                    type="submit"
                    className='bg-omni-accent p-2 rounded-lg text-white font-semibold cursor-pointer'
                    disabled={mutation.isPending}
                >{mutation.isPending? <span className="flex gap-2 items-center justify-center"><Spinner /> Updating...</span> : <span className="flex gap-2 items-center justify-center"><Save /> Update User</span>}</button>
            </form>
        </div>
    </div>
  )
}

export default UserRole