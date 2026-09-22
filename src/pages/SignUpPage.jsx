import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router'
import { useForm, useWatch } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Check, X, Dot } from 'lucide-react'

const SignUpPage = () => {
    const { register, handleSubmit, formState, control } = useForm({ mode: 'onChange' });
    const { errors, isSubmitted } = formState;

    const passwordValue = useWatch({ control, name: 'password', defaultValue: '' })
    const confirmPassword = useWatch({ control, name: 'confirm_password', defaultValue: '' })
        const passwordCriteria = [
            { label: 'At least 8 charaters', valid: passwordValue.length >= 8 },
            { label: 'One uppercase letter', valid: /[A-Z]/.test(passwordValue) },
            { label: 'One lowercase letter', valid: /[a-z]/.test(passwordValue) },
            { label: 'One number', valid: /[0-9]/.test(passwordValue) },
            { label: 'One special charater (!@#$%^&*)', valid: /[!@#\\$%\\^&\\*]/.test(passwordValue) },
            { label: 'Password match', valid: Boolean(passwordValue) && passwordValue === confirmPassword  }
    
        ]

        const mutation = useMutation();

        const onSubmit = () => {

        }
  return (
    <>
        <section className='bg-omni-light py-10 px-6 md:px-0'>
            <div className='shadow-lg grid grid-cols-1 lg:grid-cols-2 items-center justify-center w-fit md:w-3/5 min-h-[85vh] mx-auto'>
            <div className='bg-omni-accent dark:bg-omni-navy dark:text-omni-light flex flex-col items-center justify-center p-6 h-full'>
                <div>
                    <img src={logo} alt="logo" className='h-[16em]'/>
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias exercitationem suscipit blanditiis illum porro rerum, ea molestiae numquam, ipsa vero dolore, cupiditate recusandae adipisci debitis a eos laboriosam corporis est!
            </div>
            <div className='p-6'>
                <div>
                    <h1 className='text-2xl font-semibold text-center text-omni-accent dark:text-omni-navy'>Create an Account</h1>
                    <p className='text-gray-600 italic text-sm'>Carefully create an account here...</p>
                </div>
                <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <label className='label' htmlFor="first_name">First Name</label>
                        <input id='first_name' name='first_name' type="text" placeholder='Enter First Name' className={`w-full ${errors?.first_name ? 'error-input' : 'input'}`}
                        {...register('first_name',
                            {
                                required: "First name is required"
                            }
                        )
                        }
                        />
                        {errors?.first_name?.message && <small className='error'>{errors.first_name.message}</small> }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='label' htmlFor="last_name">Last Name</label>
                        <input id='last_name' name='last_name' type="text" placeholder='Enter Last Name' className={`w-full ${errors?.last_name ? 'error-input' : 'input'}`} 
                        {
                            ...register('last_name',
                                {
                                    required: "Last name is required"
                                }
                            )
                        }/>
                        {errors?.last_name?.message && <small className='error'>{errors.last_name.message}</small>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='label' htmlFor="email">Email</label>
                        <input id='email' name='email' type="email" placeholder='Enter Email' className={`w-full ${errors?.email ? 'error-input' : 'input'}`} 
                        {
                            ...register('email',
                                {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Invalid email address'
                                    }
                                }
                            )
                        }/>
                        {errors?.email?.message && <small className='error'>{errors.email.message}</small>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='label' htmlFor="password">Password</label>
                        <input id='password' name='password' type="password" placeholder='Enter Password' className={`w-full ${errors?.password ? 'error-input' : 'input'}`}
                        {
                            ...register('password',
                               {
                                 required: "Password is required",
                                 minLength: {
                                    value: 8,
                                    message: "password must be at least 8 letters long"
                                 },
                                 validate: (value) => value === confirmPassword || "Password do not match"
                               }
                            )
                        } />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='label' htmlFor="confirm_password">Confirm Password</label>
                        <input id='confirm_password' name='confirm_password' type="password" placeholder='Confirm password' className={`w-full ${errors?.confirm_password ? 'error-input' : 'input'}`}
                        {
                            ...register('confirm_password',
                                {
                                    required: 'Confirm password is required',
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 letters long"
                                    },
                                    validate: (value) => value === passwordValue || "Password do not match"
                                }
                            )
                        } />

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-1'>
                            {
                                passwordCriteria.map((item, index) => {
                                    let textColor = 'text-gray-400';
                                    let icon = <Dot size={20} />;
                                    if (item.valid) {
                                        textColor = 'text-green-500';
                                        icon = <Check size={15} />
                                    } else if (isSubmitted) {
                                        textColor = 'text-rose-700'
                                        icon = <X size={15} />
                                    }
                                    
                                    return(
                                        <span key={index} className={`flex gap-1 text-xs items-center ${textColor}`}>
                                            {icon} {item.label}
                                    </span>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <button type="submit" className='w-full bg-omni-accent dark:bg-omni-navy p-2 font-semibold rounded-lg dark:text-omni-light transition-colors duration-300 cursor-pointer hover:bg-omni-accent/85 dark:hover:bg-omni-navy/85 ease-in-out'>Create Account</button>

                    <div className='flex gap-1 justify-center'>
                        <p>Have an account Already? </p> <Link to='/login' className='text-omni-primary dark:text-omni-secondary'>LogIn</Link>
                    </div>
                </form>
            </div>
        </div>
        </section>
    </>
  )
}

export default SignUpPage