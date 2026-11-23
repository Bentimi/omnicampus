import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Building, Mail, Phone, Save, User, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { addFaculty, editFaculty } from "../../services/facultyApi"
import { toast } from "react-toastify"
import Spinner from "../Spinner"
import { useEffect } from "react"


const AddFaculty = ({ onClose, status, data }) => {
    const { register, handleSubmit, control, reset, formState: {
            errors, isSubmitting, isSubmitted
        } } = useForm({
            mode: 'onChange',
            defaultValues: {
                faculty: ''
            }
        })
        // console.log(data)
    
        useEffect(() => {
            if (status === 'edit' && data) {
                reset({
                    faculty: data?.faculty || ''
                })
            } else {
                reset({
                    faculty: ''
                })
            }
        }, [status, data, reset])
        
        const fields = [
                {name: 'faculty', label: 'Faculty Name', type: 'text', logo: <Building size={18} />},
            ]
    
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (formData) => {
            return status === 'add' ? addFaculty(formData) : editFaculty(data._id, formData)
        },
        onSuccess: (res) => {
                    queryClient.invalidateQueries({ queryKey: ['faculty'] })
                    toast.success(res?.message)
                    handleClose()
                },
                onError: (e) => {
                    toast.error(e?.message)
                }
    })

    const onSubmit = (formData) => {
            mutation.mutate(formData)
        }
    const handleClose = () => {
        onClose()
        reset()
    }
    return (
        <>
            <div className="w-fit">
            <div className='flex justify-between'>
                <h1 className="flex gap-2 capitalize">
                   <p className='capitalize'>
                    {status}
                    </p> 
                    Faculty
                </h1>
                <div>
                    <button type="button" onClick={handleClose}
                    ><X /></button>
                </div>
            </div>

            <div>
                <form 
            onSubmit={handleSubmit(onSubmit)}
            className='flex justify-center flex-col gap-2 w-full'
            >

                <div className='grid grid-cols-1 gap-2 w-full overflow-scroll scrollbar-none p-2'>
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

                    {/* <div> */}
                        <button 
                                        disabled={mutation.isPending}
                                        type="submit"
                                        className="bg-omni-accent p-3 rounded-lg font-semibold text-omni-light flex justify-center gap-2 items-center h-10 cursor-pointer w-[18.5em] mx-auto"> {mutation.isPending ?  (<span className="flex items-center gap-2"><Spinner /> {status === 'add'? 'Saving' : 'Updating'}</span> ): ((status === 'add')? <span className="flex items-center gap-1"><Save size={18} /> {status === 'add' &&'Add Faculty'}</span> : <span className="flex items-center gap-1"><Save size={18} /> {status !== 'add' && 'Update Faculty'}</span>)}
                                        </button>
                        {/* <button type="submit"
                        className="bg-omni-accent w-full flex justify-center items-center h-10 p-3 font-semibold text-white rounded-md shadow-md cursor-pointer"
                        >{status === 'add' ? 'Add Faculty' : 'Update' }</button> */}
                    {/* </div> */}
                </form>
            </div>
            </div>
        </>
    )
}

export default AddFaculty