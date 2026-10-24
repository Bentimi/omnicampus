import { Ban, CheckCheckIcon, CheckCircle, TriangleAlert, X } from 'lucide-react'
import { session_Status } from '../../services/sessionApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { data } from 'react-router'
import { toast } from 'react-toastify'
import Spinner from '../Spinner'

const SessionAction = ({ session, onClose }) => {
    const queryClient  = useQueryClient();
    const mutation = useMutation({
        mutationFn: (sessionId) => session_Status(sessionId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['session'] })
            onClose()
            toast.success(data?.message)
        },
        onError: (err) => {
            toast.error(err?.message)
        }
    })
    
    const handleBtn = (sessionId) => {
        mutation.mutate(sessionId)
    }

  return (
    <div className='flex flex-col space-y-6 w-[20em]'>
        <div className='text-red-600 flex justify-center items-center'>
            <TriangleAlert size={60} />
        </div>
        <p className='font-semibold dark:text-white text-center'>Do you want to {session?.isActive? 'activate' : 'deactive'} this section?</p>
        <div className='flex gap-4'>
            <button 
            className={`flex justify-center items-center font-semibold text-blue-600 border border-blue-500 w-full p-3 h-10 gap-2 rounded-lg transition-colors ease-in-out delay-150 duration-200 hover:text-white hover:bg-blue-500 ${
                mutation.isPending ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            disabled={mutation.isPending}
            onClick={onClose}
            ><X /> Cancel</button>
            {
                !session?.isActive ?
                <button 
            className={`flex justify-center items-center font-semibold text-green-600 border border-green-500 w-full p-3 h-10 gap-2 rounded-lg transition-colors ease-in-out delay-150 duration-200 hover:text-white hover:bg-green-500 cursor-pointer ${
                mutation.isPending ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            disabled={mutation.isPending}
            onClick={() => handleBtn(session._id)}
            >
                {mutation.isPending ? <span className='flex gap-2'><Spinner /> Activating...</span>: <span className='flex justify-between items-center text-lg gap-2'><CheckCircle size={22} /> Activate</span>}
            </button> : <button 
            className={`flex justify-center items-center font-semibold text-red-600 border border-red-500 w-full p-3 h-10 gap-2 rounded-lg transition-colors ease-in-out delay-150 duration-200 hover:text-white hover:bg-red-500 ${
                mutation.isPending ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            disabled={mutation.isPending}
            onClick={() => handleBtn(session._id)}
            > {mutation.isPending ? <span className='flex gap-2'><Spinner /> Deactivating...</span>: <span className='flex justify-between items-center text-lg gap-2'><Ban size={22} /> Deactivate</span>}</button>
            }
        </div>
    </div>
  )
}

export default SessionAction