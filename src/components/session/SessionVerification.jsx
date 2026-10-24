import { BookCheck, CheckCheckIcon, CreditCard, GlobeCheck, GlobeCheckIcon, Save, ShieldCheck, ToggleLeft, ToggleRight, X } from 'lucide-react'
import React, { useEffect } from 'react'
import Spinner from '../Spinner';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { session_verification } from '../../services/sessionApi';
import { toast } from 'react-toastify';

const SessionVerification = ({ session, onClose }) => {
     const { register, handleSubmit, control, reset, formState: { 
                isSubmitted, isLoading, errors 
            } } = useForm({mode: 'onChange',
                defaultValues: {
                        paymentStatus: false,
                        active: false,
                        regStatus: false,
                        current: false
                }
            })
        
    useEffect(() => {
            if (session) {
                reset({
                    paymentStatus: session?.paymentStatus || false,
                    active: session?.isActive || false,
                    regStatus: session?.regStatus || false,
                    current: session?.current || false
                })
            }    
        }, [session, reset])

    const fields = [
        {
            name: 'paymentStatus', label: 'Payment Status', type: 'checkbox', logo: <CreditCard size={18} />
        },
        {
            name: 'active', label: 'Active', type: 'checkbox', logo: <CheckCheckIcon size={18} />
        },
        {
            name: 'regStatus', label: 'Registration Status', type: 'checkbox', logo: <GlobeCheckIcon size={18} />
        },
        {
            name: 'current', label: 'Current Session', type: 'checkbox', logo: <BookCheck size={18} />
        }
    ]

    // console.log(session)

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data) => session_verification(session._id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['session'] })
            toast.success(res?.message)
            handleClose()
        },
        onError: (e) => {
            toast.error(e?.message)
        }
    })

    const handleClose = () => {
        onClose();
        reset()
    }

    const onSubmit = (data) => {
        mutation.mutate(data)
    }
  return (
    <div className='flex flex-col space-y-6 w-[20em]'>
        <div className='flex justify-between items-center w-full'>
            <h1 className='flex items-center gap-1 font-semibold text-lg'> <ShieldCheck /> Session Settings</h1>
            <button
            className='text-red-600 border border-red-600 hover:scale-105 rounded-sm cursor-pointer'
            onClick={handleClose}
            disabled={mutation.isPending}
            >
                <X size={22} />
            </button>
        </div>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='py-2'>
                <div className='flex gap-2 text-lg justify-between'>
                    <label className='font-semibold'>Session:</label>
                    <h1 className='italic'>
                        {
                            session?.session
                        }
                    </h1>
                </div> <hr />
                <div>
                   {
                    fields.map((item) => (
                        <div key={item.name}>
                            <div className='flex gap-2 items-center justify-between py-2'>
                                <label htmlFor={item.name} className='font-semibold'>{item.label}</label>

                            <Controller
                            name={item.name}
                            control={control}
                            defaultValue={false}
                            render={({ field: { value, onChange } }) =>(
                                <button
                                type='button'
                                id={item.name}
                                onClick={() => onChange(!value)}
                                className={`cursor-pointer transform transition-colors duration-150 delay-100 ease-in-out ${!value ? 'text-gray-600' : 'text-green-600 '} ${
                                    mutation.isPending? 'opacity-50' : ''
                                }`}
                                disabled={mutation.isPending}
                                >
                                    {!value ? <ToggleLeft size={26} /> : <ToggleRight size={26} />}
                                </button>
                            )}
                             />
                            </div>
                            <hr />
                        </div>
                    ))
                   }
                </div>
                </div>
                <div className='flex gap-2 py-1'>
                    <button type="button"
                className='hover:bg-red-600 border border-red-600 text-red-600 hover: w-full p-2 rounded-lg hover:text-white font-semibold cursor-pointer transition-colors delay-100 ease-in-out duration-200 flex items-center justify-center gap-2'
                onClick={() => handleClose()}
                disabled={mutation.isPending}
                ><X size={18} />Close</button>
                    <button type="submit"
                className='bg-omni-accent w-full p-2 rounded-lg text-white font-semibold cursor-pointer flex items-center justify-center gap-2'
                disabled={mutation.isPending}
                >{mutation.isPending ? <span className='flex items-center gap-2'><Spinner /> Updating...</span> : <span className='flex items-center gap-2'><Save size={18} /> Update</span>}</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SessionVerification