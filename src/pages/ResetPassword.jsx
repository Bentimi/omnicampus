import { Check, Dot, Eye, EyeClosed, Lock, LockKeyhole, Save, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router'
import { reset_password } from '../services/userApi';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const ResetPassword = () => {

     const [isShow, setIsShow] = useState({
            newPassword: false,
            confirmPassword: false
        })
    
    const [isClose, setIsClose] = useState(false)

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitted } } = useForm({ mode: 'onChange' })

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
    
        const navigate = useNavigate()
        const mutation = useMutation({
            mutationFn: (data) => reset_password(data, token),
            onSuccess: (res) => {
                toast.success(res?.message);
                reset();
                navigate('/login')
            },
            onError: (err) => {
                toast.error(err?.message)
            }
        })
    
        const onSubmit = (data) => {
            mutation.mutate(data)
        }

        const passwordConfirm = () => {
        // if (passwordValue === OldpasswordValue) {
        //     return false;
        // }
        return Boolean(passwordValue) && passwordValue === confirmPassword
    }
    
  return (
      <>
          <div className='flex justify-center items-center h-[70vh] bg-omni-light'>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 p-5 shadow-lg w-[20em] lg:w-2/6 h-fit justify-center bg-white'>
                  <h1 className='text-2xl font-semibold text-center text-omni-accent dark:text-omni-navy'>Reset Password</h1>
                  <div className='flex flex-col gap-2'>
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
                  <button type="submit" className={`w-full bg-omni-accent dark:bg-omni-navy font-semibold dark: text-omni-light p-2 rounded-lg flex justify-center items-center gap-2 ${(!passwordConfirm() || mutation.isPending)? 'cursor-not-allowed bg-omni-accent/70' : 'cursor-pointer transition-colors ease-in-out duration-300 hover:bg-omni-accent/85 dark:hover:bg-omni-navy/85'}`}
                  disabled={!passwordConfirm() || mutation.isPending}
                  >{!mutation.isPending && (<Save size={18} />)} {
                      mutation.isPending ? <div className='border-2 border-omni-light border-t-omni-navy animate-spin h-5 w-5 rounded-full'></div> : 'Save'
                  }</button>
                  </div>
              </form>
      </div>
      </>
    )
}

export default ResetPassword