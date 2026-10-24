import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { Calendar, Check, Edit, Mail, MapPin, Phone, PhoneCall, Save, User, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { edit_User } from '../../services/userApi'
import { toast } from 'react-toastify'
import { formatDate } from '../../services/formatDate'

const EditModal = ({ user, onClose }) => {
    // console.log(user)
    const { register, handleSubmit, control, reset, formState: { 
        isSubmitted, isLoading, errors 
    } } = useForm({
        mode: 'onChange',
        defaultValues: {
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            email: user?.email || "",
            gender: user?.gender || "",
            marital_status: user?.marital_status || "",
            phone_number: user?.phone_number || "",
            next_Of_Kin: user?.next_Of_Kin || "",
            next_Of_Kin_Number: user?.next_Of_Kin_Number || "",
            next_Of_Kin_Relationship: user?.next_Of_Kin_Relationship || "",
            state_Of_Origin: user?.state_Of_Origin || "",
            country: user?.country || "",
            address: user?.address || "",
            // image: user?.image || "",
            dob: user?.dob ? formatDate(user.dob, 'normal') : ""
        }
    } )


    useEffect(() => {
        if (user) {
            reset({
                first_name: user?.first_name || "",
                last_name: user?.last_name || "",
                email: user?.email || "",
                gender: user?.gender || "",
                marital_status: user?.marital_status || "",
                phone_number: user?.phone_number || "",
                next_Of_Kin: user?.next_Of_Kin || "",
                next_Of_Kin_Number: user?.next_Of_Kin_Number || "",
                next_Of_Kin_Relationship: user?.next_Of_Kin_Relationship || "",
                state_Of_Origin: user?.state_Of_Origin || "",
                country: user?.country || "",
                address: user?.address || "",
                dob: user?.dob ? formatDate(user.dob, 'normal') : ""
            })
        }
    }, [user, reset])


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

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (formData) => edit_User(formData, user?._id),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            onClose()
            toast.success(res?.message)

            
        },
        onError: (err) => {
            toast.error(err?.message)
        }
    })

    const onSubmit = (formData) => {
        // console.log(user)
        mutation.mutate(formData)
    }

    const handleClose = () => {
        onClose()
        reset()
    }
  return (
    <div className={`${onClose ? 'block' : 'hidden'}`}>
    <span className='flex items-center justify-between text-2xl font-semibold py-3 dark:text-omni-light'>
        <span className='flex items-center gap-2'>
            <Edit />
            EditModal
        </span>
        <button type="button"
        className='flex items-center justify-center cursor-pointer hover:scale-105 text-red-600 hover:text-white border-red-600 border-2 rounded-lg p-1 hover:bg-red-500 transition-colors duration-500 delay-75 ease-in-out'
        onClick={handleClose}
        disabled={mutation.isPending}
        ><X size={22} /></button>
    </span>

    <form 
        onSubmit={handleSubmit(onSubmit)}
    >
            <div className='p-3 grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-[20vh] max-h-[60vh] w-full overflow-scroll scroll-smooth scrollbar-none'>
                {
                    fields.map((item) => (
                    <div key={item.name} className='flex flex-col gap-2'>
                        <label htmlFor={item.name} className='label'>{item.label}</label>
                        <div className={`${errors?.[item.name]? 'error-input' : 'input-border'} bg-white`}>
                            <span className='input-container'>
                                {item.logo}
                                    <input type={item.type} name={item.name} id={item.name} className='off-modal-input' 
                                    placeholder={`Enter ${item.label}`} 
                                    {...register(item.name, {
                                            required: 'Field is required',
                                            setValueAs: (value) => (typeof value === "string" ? value.trim() : value.trim())
                                        })}
                                        disabled={mutation.isPending}
                                    />
                            </span>
                        </div>
                        {errors?.[item.name]?.message &&( <small className='error'>{errors[item.name].message}</small>)}
                    </div>
                    ))
                }

            <div className='flex flex-col gap-2'>
            <label htmlFor="next_Of_Kin_Relationship" className='label'>Next of Kin Relationship</label>
            <select className={`dark:bg-omni-light border-2 border-gray-300 h-10 p-2 rounded-lg transition-colors duration-200 focus:outline-none cursor-pointer ${errors?.next_Of_Kin_Relationship ? 'error-input' : 'focus:ring-omni-accent/20 focus:border-omni-accent'}`} name='next_Of_Kin_Relationship' 
            {...register('next_Of_Kin_Relationship', {
                    required: 'Select an Option'
                })}
                disabled={mutation.isPending}
            >
                <option value="">Select an Option</option>
                <option value="brother">Brother</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="sister">Sister</option>
                <option value="others">Others</option>
            </select>
            {errors?.next_Of_Kin_Relationship?.message && <small className='error'>{errors?.next_Of_Kin_Relationship?.message}</small>}
            </div>

            <div className='flex flex-col gap-2'>
            <label htmlFor="gender" className='label'>Gender</label>
            <select className={`dark:bg-omni-light border-2 border-gray-300 h-10 p-2 rounded-lg transition-colors duration-200 focus:outline-none cursor-pointer ${errors?.gender ? 'error-input' : 'focus:ring-omni-accent/20 focus:border-omni-accent'}`} name='gender' 
            {...register('gender', {
                    required: 'Select an Option'
                })}
                disabled={mutation.isPending}
            >
                <option value="">Option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            {errors?.gender?.message && <small className='error'>{errors?.gender?.message}</small>}
            </div>

            <div className='flex flex-col gap-2'>
            <label htmlFor="marital_status" className='label'>Marital Status</label>
            <select className={`dark:bg-omni-light border-2 border-gray-300 h-10 p-2 rounded-lg transition-colors duration-200 focus:outline-none cursor-pointer ${errors?.marital_status ? 'error-input' : 'focus:ring-omni-accent/20 focus:border-omni-accent'}`} name='marital_status' 
            {...register('marital_status', {
                    required: 'Select an Option'
                })}
                disabled={mutation.isPending}
            >
                <option value="">Select an option</option>
                <option value="married">Married</option>
                <option value="single">Single</option>
                <option value="divorced">Single</option>
                <option value="complicated">Single</option>
            </select>
            {errors?.marital_status?.message && <small className='error'>{errors?.marital_status?.message}</small>}
            </div>

            <div className='flex flex-col gap-2'>
            <label htmlFor="country" className='label'>Country</label>
            <select className={`dark:bg-omni-light border-2 border-gray-300 h-10 p-2 rounded-lg transition-colors duration-200 focus:outline-none cursor-pointer ${errors?.country ? 'error-input' : 'focus:ring-omni-accent/20 focus:border-omni-accent'}`} name='country' 
            {...register('country', {
                    required: 'Select an Option'
                })}
                disabled={mutation.isPending}
            >
                <option value="">Select an option</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Niger">Niger</option>
                <option value="Others">Others</option>
            </select>
            {errors?.country?.message && <small className='error'>{errors?.country?.message}</small>}
            </div>

            <div className='flex flex-col gap-2 col-span-full'>
            <label htmlFor="address" className='label'>Address</label>
            <textarea name="address" id="address" rows='5'
            className={`dark:bg-omni-light border-2 border-gray-300 p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-3  ${errors?.address ? 'focus:ring-rose-700/20 focus:border-rose-700 border-rose-700 ring-rose-700/20 ring-3' : 'focus:ring-omni-accent/20 focus:border-omni-accent'}`} 
            placeholder='Type your address...'
            {...register('address', {
                    required: 'Field is required',
                    setValueAs: (value) => (typeof value === "string" ? value.trim() : value.trim())
                })}
            disabled={mutation.isPending}
            ></textarea>
            {errors?.address?.message && <small className='error'>{errors?.address?.message}</small>}
            </div>
    </div>
    <div className='flex gap-3 py-3'>
        <button 
        className='flex gap-2 justify-center items-center p-2 border border-red-600 rounded-lg text-red-600 cursor-pointer hover:bg-red-600 hover:text-omni-light font-semibold transition-colors duration-400 ease-in-out delay-100 transform w-full'
        type='button'
        disabled={mutation.isPending}
        onClick={handleClose}
        >
          <X size={20} />  Close
        </button>
        <button className={`flex gap-2 justify-center items-center p-2 border border-green-900 rounded-lg text-green-900 hover:bg-green-900 hover:text-omni-light font-semibold transition-colors duration-400 ease-in-out delay-100 transform w-full ${mutation.isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={mutation.isPending}
        >
          {mutation.isPending? <div className='flex gap-2 items-center'>
            <div className='h-6 w-6 border-2 border-white rounded-full border-t-omni-navy animate-spin' ></div> <h1 className='text-omni-light'>Saving...</h1>
          </div> :  <div className='flex gap-2 items-center'>
            <span><Save size={20} /></span> <h1>Save</h1>
          </div>}
        </button>
    </div>
    </form>
    </div>
  )
}

export default EditModal