import { useMutation } from '@tanstack/react-query';
import { Check, Dot, Eye, EyeClosed, LockKeyhole, X } from 'lucide-react'
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { change_Password } from '../../services/userApi';
import logo from '../../assets/logo.png'

const ChangePassword = () => {
    const [isShow, setIsShow] = useState({
        password: false,
        newPassword: false,
        confirmPassword: false
    })

    const [isClose, setIsClose] = useState(false)

    
    const { register, handleSubmit, formState, control, reset } = useForm({ mode: 'onChange' });
    const { errors, isSubmitted } = formState;
    
    const OldpasswordValue = useWatch({ control, name: 'password', defaultValue: '' })
    const passwordValue = useWatch({ control, name: 'newPassword', defaultValue: '' })
    const confirmPassword = useWatch({ control, name: 'confirmPassword', defaultValue: '' })

    const passwordCriteria = [
           { label: 'At least 8 charaters', valid: passwordValue.length >= 8 },
            { label: 'One uppercase letter', valid: /[A-Z]/.test(passwordValue) },
            { label: 'One lowercase letter', valid: /[a-z]/.test(passwordValue) },
            { label: 'One number', valid: /[0-9]/.test(passwordValue) },
            { label: 'One special charater (!@#$%^&*)', valid: /[!@#\\$%\\^&\\*]/.test(passwordValue) },
            { label: 'Password match', valid: Boolean(passwordValue) && passwordValue === confirmPassword  }
    ]

    const mutation = useMutation({
        mutationFn: (formData) => change_Password(formData),
        onSuccess: (res) => {
            reset();
            toast.success(res?.message)
        },
        onError: (err) => {
            toast.error(err?.message)
        }
    })

    const onSubmit = (data) => {
        mutation.mutate(data)
    }

    const passwordConfirm = () => {
        if (passwordValue === OldpasswordValue) {
            return false;
        }
        return Boolean(passwordValue) && passwordValue === confirmPassword
    }
    
  return (
    <div>
        <div className='p-4 flex justify-center items-center h-[85vh]'>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='shadow-lg w-full lg:w-2/6 p-6 grid grid-cols-1 gap-3'>
                <div className='flex justify-center flex-col items-center space-y-2'>
                    <img src={logo} className='h-[8em]' />
                    <h1 className='font-semibold capitalize text-2xl text-gray-600/90 text-center'>Change Password</h1>
                    {
                        
                       Boolean(passwordValue) && ((OldpasswordValue === passwordValue) && (
                            <div className={`bg-red-100 p-3 border-l-6 border-l-red-500 transition-all duration-800 transform transform-content flex items-center justify-between space-x-3 ${isClose? 'hidden' : 'block'}`}>
                            <h1 className='text-red-500'>Old and new password cannot be the same</h1>
                            <button 
                            className='text-red-600 hover:text-red-700 hover:scale-120 cursor-pointer'
                            type='button'
                            onClick={() => setIsClose(true)}
                            >
                                <X size={15} />
                            </button>
                        </div>
                       ))
                    }
                </div>
                <div>
                    <label htmlFor="password" className='label'>Old Password</label>
                    <div className={`flex justify-between items-center ${errors?.password ? 'error-input' : 'input-border'}`}>
                        <span className='input-container'>
                            <LockKeyhole size={18} />
                            <input id='password' name='password'
                            type={isShow.oldPassword? "text" : "password"} className='off-input'
                            placeholder='Old password'
                            disabled={mutation.isPending}
                            {
                                ...register('password', {
                                    required: 'Old password is required',
                                    setValueAs: (value) => (typeof value === "string" ? value.trim() : value.trim())
                                })
                            }
                        />
                        </span>
                        <button type="button" onClick={(e) => {
                            e.stopPropagation()
                            setIsShow({...isShow, oldPassword: !isShow.oldPassword})
                        }}
                        className='cursor-pointer transition-transform duration-600 ease-in-out'
                        disabled={mutation.isPending}
                            >
                            {
                                isShow.oldPassword ? <Eye size={18} /> : <EyeClosed size={18} />
                            }
                        </button>
                    </div>
                    {errors?.password?.message && <small className='error'>{errors.password.message}</small>}
                </div>
                <div>
                    <label htmlFor="newPassword" className='label'>New Password</label>
                    <div className={`flex justify-between items-center ${errors?.newPassword ? 'error-input' : 'input-border'}`}>
                        <span className='input-container'>
                            <LockKeyhole size={18} />
                            <input
                            id='newPassword' name='newPassword'
                            type={isShow.newPassword ? "text" : "password"} 
                            className='off-input'
                            placeholder='New password'
                            disabled={mutation.isPending}
                            {
                                ...register('newPassword', {
                                    required: 'New password is required',
                                    setValueAs: (value) => (typeof value === "string" ? value.trim() : value.trim())
                                })
                            }
                            />
                        </span>
                        <button type="button" onClick={(e) => {
                            e.stopPropagation()
                            setIsShow({...isShow, newPassword: !isShow.newPassword})}}
                        className='cursor-pointer'
                        disabled={mutation.isPending}
                            >
                            {
                                isShow.newPassword ? <Eye size={18} /> : <EyeClosed size={18} />
                            }
                        </button>
                    </div>
                    {errors?.newPassword?.message && <small className='error'>{errors.newPassword.message}</small>}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className='label'>Confirm Password</label>
                    <div className={`flex justify-between items-center ${errors?.confirmPassword ? 'error-input' : 'input-border'}`}>
                        <span className='input-container'>
                            <LockKeyhole size={18} />
                            <input
                            id='confirmPassword' name='confirmPassword'
                            type={isShow.confirmPassword ? "text" : "password"} 
                            className='off-input'
                            placeholder='Confirm password'
                            disabled={mutation.isPending}
                            {
                                ...register('confirmPassword', {
                                    required: "Confirm password is required",
                                    setValueAs: (value) => (typeof value === "string" ? value.trim() : value.trim())
                                })
                            }
                            />
                        </span>
                        <button type="button" onClick={(e) => {
                            e.stopPropagation()
                            setIsShow({...isShow, confirmPassword: !isShow.confirmPassword})}}
                        className='cursor-pointer'
                        disabled={mutation.isPending}
                            >
                            {
                                isShow.confirmPassword ? <Eye size={18} /> : <EyeClosed size={18} />
                            }
                        </button>
                    </div>
                    {errors?.confirmPassword?.message && <small className='error'>{errors.confirmPassword.message}</small>}
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
                
                <button type="submit" className={`w-full flex justify-center items-center h-10 bg-omni-accent rounded-lg font-semibold text-omni-light transition-colors ${
                    (!passwordConfirm() || mutation.isPending)? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                disabled={!passwordConfirm() || mutation.isPending}>{
                    mutation.isPending ? 
                    <div className='border-2 border-omni-light border-t-omni-navy animate-spin h-5 w-5 rounded-full'></div> : 'Save'
                }</button>
            </form>
        </div>
    </div>
  )
}

export default ChangePassword