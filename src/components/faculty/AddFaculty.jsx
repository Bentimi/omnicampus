import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Building, Mail, Phone, User, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { addFaculty } from "../../services/facultyApi"
import { toast } from "react-toastify"


const AddFaculty = ({ onClose, status }) => {
    const { register, handleSubmit, control, reset, formState: {
            errors, isSubmitting, isSubmitted
        } } = useForm({
            mode: 'onChange',
            defaultValues: {
                faculty: ''
            }
        })
    
        const fields = [
                {name: 'faculty', label: 'Faculty Name', type: 'text', logo: <Building size={18} />},
            ]
    
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data) => addFaculty(data),
        onSuccess: (res) => {
                    queryClient.invalidateQueries({ queryKey: ['faculty'] })
                    toast.success(res?.message)
                    handleClose()
                },
                onError: (e) => {
                    toast.error(e?.message)
                }
    })

    const onSubmit = (data) => {
            mutation.mutate(data)
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

                    <div>
                        <button type="submit"
                        >{status === 'add' ? 'Add Faculty' : 'Update' }</button>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}

export default AddFaculty