import { useMutation, useQuery } from '@tanstack/react-query';
import { Building2, Save, X } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { getFaculties } from '../../services/facultyApi';
import { addDepartment } from '../../services/departmentApi';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';

const AddEditModal = ({ onClose, status }) => {
const [isFaculty, setIsFaculty] = useState(null);

  const facultyData = useQuery({
    queryKey: ['faculty'],
    queryFn: () => getFaculties()
  }) 

  useEffect(() => {
    if (facultyData) {
      setIsFaculty(facultyData?.data)
    }
  }, [facultyData])

  console.log(isFaculty?.data)

  const allFaculties = isFaculty?.data?.faculty.map((d,i) => ({
    name: d?.faculty,
    id: d?._id
  }))

  console.log(allFaculties)

  const { register, handleSubmit, control, reset, formState:{
    isSubmitted, isLoading, errors, isSubmitting
  } } = useForm({ mode: 'onChange',
    defaultValues: {
      department: '',
      isActive: '',
      faculty: ''
    }
   });

   useEffect(() => {
    if (status === 'edit') {
      reset({
        department: '',
        isActive: '',
        faculty: ''
      })
    } else {
      reset({
        department: '',
        isActive: '',
        faculty: ''
      })
    }
   }, [status, reset])

  //  console.log(get_faculty)

  const handleClose = () => {
    onClose()
    reset()
  }

  const mutation = useMutation({
    mutationFn: (formData) => addDepartment(formData),
    onSuccess: (res) => {
      toast.success(res?.message)
      handleClose()
    },
    onError: (e) => {
              toast.error(e?.message)
    }
  });


  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }

  return (
    <div className='space-y-4'>
      <div className='flex gap-2 justify-between w-[20em]'>
        <h1 className='capitalize'>{status} Department</h1>
        <button
        onClick={handleClose}
        type="button"
        className='border border-red-500 text-red-600 hover:text-red-500 hover:scale-110 rounded-lg cursor-pointer'
        ><X /></button>
      </div>

      <main>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-1'>
          <div>
           <div>
            <label htmlFor='department'>Department</label>
             <div className={`w-full ${errors?.faculty ? 'error-input' : 'input-border'}`}>
              <span className='input-container'>
              <Building2 size={18} />
              <input type="text" 
              disabled={mutation.isPending}
              className='off-modal-input' 
              placeholder={`Enter department`}
              {...register('department', {
                required: 'Field is required',
                setValueAs: (value) => (typeof value === "string" ? value.trim() : value.trim())
              })} />
            </span>
             </div>
             {errors?.department?.message && ( <small className='error'>{errors?.department?.message}</small>)}
           </div>

          <div className='grid grid-cols-1 gap-1'>
            <label htmlFor="faculty" className='label'>Faculty</label>
            <select className={`dark:bg-omni-light border-2 border-gray-300 h-10 p-2 rounded-lg transition-colors duration-200 focus:outline-none cursor-pointer ${errors?.faculty ? 'error-input' : 'focus:ring-omni-accent/20 focus:border-omni-accent'}`} name='faculty' 
                    {...register('faculty', {
                      required: 'Field is required'
                    })}
            disabled={mutation.isPending} 
            >
              <option value=''>Select an option</option>
              {
                isFaculty?.data?.faculty.map((d,i) => (
                  <option value={d?._id} key={i}>{d?.faculty}</option>
                ))
              }
            </select>
            {errors?.faculty?.message && ( <small className='error'>{errors?.faculty?.message}</small>)}
          </div>
          </div>
          <div className='flex gap-1 items-center'>
                    <label htmlFor="isActive" className="label">Active</label>
                    <input type="checkbox" name="isActive" id="isActive" className='ml-2 cursor-pointer border rounded-md p-2 h-5 w-5'
                    {...register('isActive')}
                    disabled={isSubmitting}
                    />
                </div>
          <div className='flex gap-2 justify-between items-center py-3'>
            <button onClick={handleClose} disabled={mutation.isPending} type="button"  className='flex items-center justify-center gap-1 text-lg w-full rounded-lg h-10 cursor-pointer font-semibold text-omni-light bg-gray-500'><X />Cancel</button>
            <button disabled={mutation.isPending} type="submit" className={`flex items-center justify-center gap-3 text-lg font-semibold text-omni-light ${mutation.isPending? 'bg-omni-accent/50' : 'bg-omni-accent'} w-full rounded-lg h-10 cursor-pointer`}>{mutation.isPending? <span className='flex items-center justify-center gap-2'><Spinner /> saving...</span> : <span className='flex items-center justify-center gap-2'><Save /> Save</span>}</button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default AddEditModal