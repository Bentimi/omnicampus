import { useMutation } from '@tanstack/react-query'
import { Calendar, FolderArchive, FolderEdit, Mail, MapPin, Phone, Save, User, UserPlus2, X } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const AddUserModal = ({ onClose, type }) => {

    const { register, handleSubmit, control, reset, formState: {
        errors, isSubmitting, isSubmitted
    } } = useForm({
        mode: 'onChange',
        defaultValues: {
            first_name: '',
            last_name: '',
            email: ''
        }
    })

    const fields = [
            {name: 'first_name', label: 'First Name', type: 'text', logo: <User size={18} />},
            {name: 'last_name', label: 'Last Name', type: 'text', logo: <User size={18} />},
            {name: 'email', label: 'Email', type: 'email', logo: <Mail size={18} />},
            {name: 'phone_number', label: 'Phone Number', type: 'text', logo: <Phone size={18} />},
            {name: 'dob', label: 'D.O.B', type: 'date', logo: <Calendar size={18} />},
            {name: 'state_Of_Origin', label: 'State of Origin', type: 'text', logo: <MapPin size={18} />},
            {name: 'next_Of_Kin', label: 'Next of Kin', type: 'text', logo: <User size={18} />},
            {name: 'next_Of_Kin_Number', label: 'Next of Kin Phone Number', type: 'number', logo: <Phone size={18} />}
        ]

    const mutation = useMutation({
        onSuccess: (res) => {
            toast.success(res?.message)
            handleClose()
        },
        onError: (e) => {
            toast.error(e)
        }
    })

    const onSubmit = () => {
        mutation.mutate()
    }

    const handleClose = () => {
        onClose()
        reset()
    }
  return (
    <div className='w-[55vw] lg:w-[40vw]'>
        <div className='flex justify-between py-6'>
            <div className='dark:text-omni-light flex gap-2 items-center'>
                <UserPlus2 />
                <h1 className='capitalize text-lg'>add {type} </h1>
            </div>
            <button 
            className='text-red-700 font-semibold cursor-pointer hover:scale-105 border-red-600 border rounded-lg p-2'
            type="button"
            onClick={handleClose}
            ><X /></button>
        </div>

        <div>
            <form 
            onSubmit={handleSubmit(onSubmit)}
            >

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 h-[50vh] w-full overflow-scroll scrollbar-none p-2'>
                    {
                    fields.map((item) => (
                        <div key={item.name} className='grid grid-cols-1 gap-2'>
                            <label htmlFor={item.name}
                            className='label'
                            >{item.label}</label>
                            <div className='w-full input-border'>
                                <span className='input-container'>
                                    {item.logo}
                                <input type={item.type} name={item.name} id={item.name} className='off-modal-input' 
                                    placeholder={`Enter ${item.label}`} 
                                    {...register(item.name, {
                                            required: 'Field is required',
                                            setValueAs: (value) => (typeof value === "string" ? value.trim() : value.trim())
                                        })}
                                        disabled={isSubmitting}
                                    />
                                    </span>
                            </div>
                            {errors?.[item.name]?.message && <small className='error'>{errors?.[item.name]?.message}</small>}
                        </div>
                    ))
                }
                </div>

                <div className='flex gap-3 py-6'>
                    <button type="button"
                className='hover:bg-red-700 border-red-700 border text-red-700 w-full h-12 p-2 flex justify-center items-center gap-2 text-lg font-semibold hover:text-omni-light cursor-pointer rounded-lg transition-colors duration-500 delay-150 ease-in-out'
                onClick={handleClose}
                ><X /> Cancel</button>
                <button type="submit"
                className='hover:bg-blue-700 border-blue-700 border text-blue-700 w-full h-12 p-2 flex justify-center items-center gap-2 text-lg font-semibold hover:text-omni-light cursor-pointer rounded-lg transition-colors duration-500 delay-150 ease-in-out'
                ><Save /> Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddUserModal