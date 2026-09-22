import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ProfileCards from '../../components/profile/ProfileCards';

const ProfilePage = () => {
    const { user } = useAuth();
    const [isOpenModal, setIsOpenModal] = useState(false)
  return (
    <>
        <div className='bg-omni-light dark:bg-omni-navy min-h-screen py-3'>
           
           <div>
            <h1 className='text-3xl font-semibold p-4 h-18 dark:text-omni-light flex items-center'>
                Profile
            </h1>
           </div>

            <div>
                <ProfileCards isOpen={!isOpenModal} user={user} />
            </div>

            {/* Edit Modal */}
        </div>
    </>
  )
}

export default ProfilePage