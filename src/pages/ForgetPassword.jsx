import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'

const ForgetPassword = () => {
    const { register, handleSubmit, control, formState: { errors, isSubmitted } } = useForm({ mode: 'onChange' })

    const mutation = useMutation()

    const onSubmit = () => {

    }

  return (
    <>
        <div className='flex justify-center items-center h-[70vh] bg-omni-light'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 p-5 shadow-lg w-[20em] lg:w-1/4 h-3/6 justify-center bg-white'>
                <h1 className='text-2xl font-semibold text-center text-omni-accent dark:text-omni-navy'>Forget Password</h1>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='label'>Email</label>
                    <input name='email' id='email' type="email" className={`w-full ${errors?.email ? 'error-input' : 'input'}`}
                    disabled={mutation.isPending}
                    placeholder='Enter your email'
                    {
                        ...register("email",
                            {
                                required: "Email is required"
                            }
                        )
                    } />
                    {errors?.email?.message && <small className='error'>{errors.email.message}</small>}
                </div>
                <button type="submit" className='w-full bg-omni-accent dark:bg-omni-navy font-semibold dark: text-omni-light cursor-pointer transition-colors ease-in-out duration-300 hover:bg-omni-accent/85 dark:hover:bg-omni-navy/85 p-2 rounded-lg'
                disabled={mutation.isPending}
                >Send</button>
            </form>
    </div>
    </>
  )
}

export default ForgetPassword