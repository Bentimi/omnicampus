import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Calendar1, Check, Plus, PlusCircle, Save, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { formatDate } from "../../services/formatDate"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { create_Session, update_Session } from "../../services/sessionApi"
import { useAuth } from "../../context/AuthContext"
import Spinner from "../Spinner"


const SessionCreationForm = ({ type, session, onClose }) => {
    const { user } = useAuth()
    const { register, handleSubmit, control, reset, formState: { 
            isSubmitted, isLoading, errors 
        } } = useForm({mode: 'onChange',
            defaultValues: {
                    session: '',
                    startDate: '',
                    endDate: ''
            }
        })

        useEffect(() => {
                if (type === 'edit' && session) {
                  reset({
                     session: session?.session || '',
                     startDate: session?.startDate ? formatDate(session?.startDate, 'normal') : "",
                     endDate: session?.endDate ? formatDate(session?.endDate, 'normal') : ""
                 })
                } else {
                     reset({
                         session: '',
                         startDate: '',
                         endDate: ''
                     })
                }
            
        }, [type, session, reset])



    const fields = [
            {name: 'session', label: 'Session', type: 'text', logo: <Calendar1 size={18} />},
            {name: 'startDate', label: 'Start Date', type: 'date', logo: <Calendar1 size={18} />},
            {name: 'endDate', label: 'End Date', type: 'date', logo: <Calendar1 size={18} />},
        ]
    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (formData) => {
            return type === 'add' ? create_Session(formData) : update_Session(session._id, formData)},
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['session'] })
            toast.success(res?.message)
        },
        onError: (e) => {
            toast.error(e?.message)
        }
    })
        
    const onSubmit = (formData) => {
        handleClose(100)
        mutation.mutate(formData)
    }
    
    const handleClose = (delay = 0) => {
       setTimeout(() => {
           onClose()
           reset()
       }, delay) 
    }
  return (
    <>
        <div className="w-full p-2">
            <div className="flex justify-between items-center dark:text-omni-light">
                <div className="flex items-center gap-2">
                    <Calendar1 /> <span>{(type === 'add') ? 'Add Session' : 'Edit Session'}</span>
                </div>
                <div>
                    <button type="button" 
                    onClick={handleClose}
                    className="text-red-600 cursor-pointer hover:scale-105 border border-red-600 p-2 rounded-lg"
                    ><X size={20} /></button>
                </div>
            </div>

            <div>
                <form 
                onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid space-y-4">
                        {
                    fields.map((item) => (
                    <div key={item.name} className='flex flex-col gap-2'>
                        <label htmlFor={item.name} className='label'>{item.label}</label>
                        <div className={`${errors?.[item.name]? 'error-input' : 'input-border'} bg-white`}>
                            <span className='input-container'>
                                {item.logo}
                                    <input type={item.type} name={item.name} id={item.name} className='off-modal-input' 
                                    placeholder={`Enter ${item.label} yyyy/yyyy`} 
                                    disabled={mutation.isPending}
                                    {...register(item.name, {
                                            required: 'Field is required',
                                            setValueAs: (value) => (typeof value === "string" ? value.trim() : value)
                                        })}
                                        disabled={mutation.isPending}
                                    />
                            </span>
                        </div>
                        {errors?.[item.name]?.message &&( <small className='error'>{errors[item.name].message}</small>)}
                    </div>
                    ))
                }

                <button 
                disabled={mutation.isPending}
                type="submit"
                className="bg-omni-accent p-3 rounded-lg font-semibold text-omni-light flex justify-center gap-2 items-center h-10 cursor-pointer"> {mutation.isPending ?  (<span className="flex items-center gap-2"><Spinner /> {type=== 'add'? 'Saving' : 'Updating'}</span> ): ((type === 'add')? <span className="flex items-center gap-1"><Save size={18} /> Add Session</span> : <span className="flex items-center gap-1"><Save size={18} /> Update Session</span>)}
                </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default SessionCreationForm