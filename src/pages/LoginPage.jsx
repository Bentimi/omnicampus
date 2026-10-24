import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router';
import logo from '../assets/logo.png';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { X, Check, Eye, EyeOff, Lock, User, Mail, LogIn } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { register, handleSubmit, formState, control, reset } = useForm({ mode: 'onChange' });
    const { errors, isSubmitted } = formState;
    const { login } = useAuth();
    const [ showPassword, setShowPassword ] = useState(false);

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data) => login(data),
        onSuccess: (res) => {
            toast.success(res?.message);
            reset();
            if (res?.data?.user?.role === 'user') {
                navigate('/user/dashboard')
            } else if (res?.data?.user?.role === 'admin') {
                navigate('/user/dashboard')
            } else if (res?.data?.user?.role === 'student') {
                navigate('/user/profile')
            }
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data)
    }

  return (
    <>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center w-fit md:w-3/5 min-h-[85vh] mx-auto py-10 px-3 md:px-0'>
            <div className='bg-omni-accent dark:bg-omni-navy dark:text-omni-light flex flex-col items-center justify-center p-6 h-full'>
                <div>
                    <img src={logo} alt="logo" className='h-[16em]'/>
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias exercitationem suscipit blanditiis illum porro rerum, ea molestiae numquam, ipsa vero dolore, cupiditate recusandae adipisci debitis a eos laboriosam corporis est!
            </div>
            <div className='bg-omni-light shadow-lg flex flex-col items-center justify-center p-6 h-full'>

                <h1 className='text-xl font-semibold dark:text-omni-navy text-omni-accent'>Login</h1>

                <p className='my-2'>Welcome back! Please log in to your account</p>

                <form 
                    onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='label'>Email </label>
                        <div className={`w-[20em] ${errors?.credentials ? 'error-input' : 'input-border'}`}>
                            <span className='flex items-center gap-2'>
                            <Mail size={18} />
                            <input className='off-input' id='email' name='credentials' type="email" placeholder='Enter your email'  
                        disabled={mutation.isPending}
                        {...register('credentials', 
                            {
                                required: "Email is required",
                                setValueAs: (value) => (typeof value === "string" ? value.trim() : value.trim()),
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                }
                            }
                        )}
                        />
                        </span>
                        </div>
                        {errors?.credentials?.message && <small className='error'>{errors.credentials.message}</small>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='label'>Password </label>
                        <div 
                        className={`w-[20em] flex justify-between items-center ${errors?.password ? 'error-input' : 'input-border'}`}>
                            <span className='flex items-center gap-2 flex-1'>
                                <Lock size={18} />
                           
                            <input name="password" id='password' 
                                type={showPassword ? 'text' : "password"} 
                                placeholder='Enter your password' 
                                className='off-input'
                            
                        disabled={mutation.isPending}
                        {...register('password', 
                            {
                                required: "Password is required",
                                setValueAs: (value) => (typeof value === "string" ? value.trim() : value.trim())
                            }
                        )} 
                        />
                         </span>
                        <button type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowPassword(pwd => !pwd)
                        }} className='cursor-pointer transition-transform duration-600 ease-in-out'
                        disabled={mutation.isPending}
                        >
                            {
                                showPassword ? <Eye size={18} /> : <EyeOff size={18} />
                            }
                        </button>
                        </div>
                        {errors?.password?.message && <small className='error'>{errors.password.message}</small>}
                        <Link to='/forget-password' className='text-omni-primary dark:text-omni-secondary text-end py-1'>
                            Forget Password?
                        </Link>
                    </div>
                    <button className={`bg-omni-accent dark:bg-omni-navy hover:bg-omni-accent/85 dark:hover:bg-omni-navy/85 dark:text-omni-light w-[20em] h-10 rounded-lg transition-colors duration-200 ease-in-out font-semibold flex justify-center items-center gap-2 text-omni-light ${
                        mutation.isPending? 'cursor-not-allowed' : 'cursor-pointer'
                    }`} type="submit"
                    disabled={mutation.isPending}>
                         {!mutation.isPending && (<LogIn />)}{mutation.isPending ? 
                            <div className='border-2 border-omni-light border-t-omni-navy animate-spin h-5 w-5 rounded-full'></div>
                        : 'Login'}
                    </button>
                    
                    <div className='flex gap-1'>
                        <p>Don't have an account?</p>
                        <Link 
                        to='/signup'
                        className='underline text-omni-primary dark:text-omni-secondary'>
                            SignUp
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default LoginPage