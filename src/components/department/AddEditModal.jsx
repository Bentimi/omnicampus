import { useQuery } from '@tanstack/react-query';
import { Save, X } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { getFaculties } from '../../services/facultyApi';

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
    isSubmitted, isLoading, errors
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
        <form>
          <div>
            <select name="" id="">
              <option>Select an option</option>
              {
                isFaculty?.data?.faculty.map((d,i) => (
                  <option value="" key={i}>{d?.faculty}</option>
                ))
              }
            </select>
          </div>
          <div className='flex gap-2 justify-between items-center'>
            <button onClick={handleClose} type="button"  className='flex items-center justify-center gap-3 text-lg border w-full rounded-lg h-10 cursor-pointer'>Cancel</button>
            <button type="submit" className='flex items-center justify-center gap-3 text-lg border w-full rounded-lg h-10 cursor-pointer'><Save /> Save</button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default AddEditModal