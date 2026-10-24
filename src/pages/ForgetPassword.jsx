import { useMutation } from '@tanstack/react-query'
import { Mail, Send } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { forget_password } from '../services/userApi'
import { toast } from 'react-toastify'

const ForgetPassword = () => {
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitted } } = useForm({ mode: 'onChange' })

    const mutation = useMutation({
        mutationFn: (data) => forget_password(data),
        onSuccess: (res) => {
            toast.success(res?.message);
            reset();
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
        }
    })

    const onSubmit = (data) => {
        mutation.mutate(data)
    }

  return (
    <>
        <div className='flex justify-center items-center h-[70vh] bg-omni-light'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 p-5 shadow-lg w-[20em] lg:w-1/4 h-3/6 justify-center bg-white'>
                <h1 className='text-2xl font-semibold text-center text-omni-accent dark:text-omni-navy'>Forget Password</h1>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='label'>Email</label>
                    <div className={`w-full ${errors?.email ? 'error-input' : 'input-border'}`}>
                        <span className='input-container'>
                            <Mail size={18} />
                             <input name='email' id='email' type="email" 
                             className='off-input'
                                disabled={mutation.isPending}
                                placeholder='Enter your email'
                                {
                                    ...register("email",
                                        {
                                            required: "Email is required",
                                            setValueAs: (value) => (typeof value === "string" ? value.trim() : value.trim())
                                        }
                                    )
                                } />
                        </span>
                    </div>
                   
                    {errors?.email?.message && <small className='error'>{errors.email.message}</small>}
                </div>
                <button type="submit" className='w-full bg-omni-accent dark:bg-omni-navy font-semibold dark: text-omni-light cursor-pointer transition-colors ease-in-out duration-300 hover:bg-omni-accent/85 dark:hover:bg-omni-navy/85 p-2 rounded-lg flex justify-center items-center gap-2'
                disabled={mutation.isPending}
                >{
                    mutation.isPending ? <div className='border-2 border-omni-light border-t-omni-navy animate-spin h-5 w-5 rounded-full'></div> : 'Send'
                } {!mutation.isPending && (<Send size={18} />)}</button>
            </form>
    </div>
    </>
  )
}

export default ForgetPassword