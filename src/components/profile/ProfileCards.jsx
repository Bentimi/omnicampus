import { Ban, Pen } from 'lucide-react'
import { useState } from 'react'
import Modal from '../Modal'
import EditModal from './EditModal'
import Deactivate from './Deactivate'
import { formatDate } from '../../services/formatDate'
import ProfileButton from './ProfileButton'

const ProfileCards = ({ user }) => {
    const [isEditModal, setIsEditModal] = useState(false);
    const [isDeactivateModal, setIsDeactivateModal] = useState(false);
  return (
    <>
       <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-5 p-4'>
        <div className='bg-white shadow-lg p-6 dark:border-omni-accent border-omni-navy border h-full dark:text-omni-light dark:bg-omni-navy dark:shadow-omni-light/10 rounded-lg'>
            <div className='flex justify-between items-center'>
                <div className='grid grid-cols-1 md:flex md:items-center gap-4'>
                {
                    user?.image ? <img src={user?.image} className='w-20 h-20 rounded-full object-contain' />
                    : <div className='w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold bg-omni-accent text-omni-light'>
                        {user?.first_name.charAt(0)} {user?.last_name.charAt(0)}
                    </div>
                }
                <div>
                    <h1 className='font-semibold text-md lg:text-xl truncate block max-w-[12em]'>{user?.first_name} {user?.last_name}</h1>
                    <p className='text-gray-400 text-lg capitalize font-semibold'>{user?.role}</p>
                    <p className='italic font-semibold text-xs text-omni-primary'>Last login: {formatDate(user?.last_login, 'relative')}</p>
                </div>
            </div>
            <div className='hidden md:flex'>
                <ProfileButton isEditOpen={() => setIsEditModal(true)} isDeactivateOpen={() => setIsDeactivateModal(true)} />
            </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 py-3 gap-y-3'>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>First Name</p>
                    <h1 className='font-semibold text-lg'>{user?.first_name ? user.first_name : "Not Provided"}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Last Name</p>
                    <h1 className='capitalize font-semibold text-lg'>{user?.last_name ? user.last_name : "Not Provided"}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Gender</p>
                    <h1 className='capitalize font-semibold text-lg'>{user?.gender ? user.gender : 'Not Provided'}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Marital Status</p>
                    <h1 className='capitalize font-semibold text-lg'>{user?.marital_status ? user.marital_status : "Not Provided"}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>D.O.B</p>
                    <h1 className='font-semibold text-lg'>{user?.dob ? formatDate(user.dob, 'date') : 'Not Provided'}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Department</p>
                    <h1 className='font-semibold text-lg'>{user?.department ? user.department : 'Not Provided'}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Last LogIn</p>
                    <h1 className='font-semibold text-lg'>{formatDate(user?.last_login)}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Date Joined</p>
                    <h1 className='font-semibold text-lg'>{formatDate(user?.createdAt)}</h1>
                </div>
            </div>
            <div className='md:hidden'>
                <ProfileButton isEditOpen={() => setIsEditModal(true)} isDeactivateOpen={() => setIsDeactivateModal(true)} />
            </div>
        </div>
        <div className='bg-white shadow-lg p-6 dark:border-omni-accent border-omni-navy border h-full dark:text-omni-light dark:bg-omni-navy dark:shadow-omni-light/10 rounded-lg'>
            <h1 className='font-semibold text-2xl'>Contact Information</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 py-3 gap-y-3'>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Email</p>
                    <h1 className='font-semibold text-lg lg:hidden'>{user?.email.length>15? user?.email.slice(0,15)+'...' : user?.email}</h1>
                    <h1 className='font-semibold text-lg hidden lg:block'>{user?.email.length>20? user?.email.slice(0,20)+'...' : user?.email}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Phone Number</p>
                    <h1 className='font-semibold text-lg'>{user?.phone_number ? user.phone_number : "Not Provided"}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Address</p>
                    <h1 className='font-semibold text-lg'>{user?.address>20? (user?.address.slice(0,20)+'...') : (user?.address ? user.address : "Not Provided")}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>State of Origin</p>
                    <h1 className='font-semibold text-lg'>{user?.state_Of_Origin ? user.state_Of_Origin : "Not Provided"}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Country</p>
                    <h1 className='font-semibold text-lg'>{user?.country ? user.country : "Not Provided"}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Next of Kin</p>
                    <h1 className='font-semibold text-lg'>{user?.next_Of_Kin ? user.next_Of_Kin : "Not Provided"}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Next of Kin Number</p>
                    <h1 className='font-semibold text-lg'>{user?.next_Of_Kin_Number ? user.next_Of_Kin_Number : "Not Provided"}</h1>
                </div>
                <div>
                    <p className='text-gray-400 text-md font-semibold'>Next of Kin Relationship</p>
                    <h1 className='font-semibold text-lg'>{user?.next_Of_Kin_Relationship ? user.next_Of_Kin_Relationship : "Not Provided"}</h1>
                </div>
            </div>
        </div>
       </div>

       <div>
        <Modal isOpen={isEditModal} onClose={() => setIsEditModal(false)} children={<EditModal user={user} onClose={() => setIsEditModal(false)} />} />
        <Modal isOpen={isDeactivateModal} onClose={() => setIsDeactivateModal(false)} children={<Deactivate user={user} onClose={() => setIsDeactivateModal(false)} />} />
       </div>
    </>
  )
}

export default ProfileCards