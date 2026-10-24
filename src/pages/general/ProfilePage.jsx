import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ProfileCards from '../../components/profile/ProfileCards';
import { useQuery } from '@tanstack/react-query';
import { user_Profile } from '../../services/userApi';
import { div } from 'motion/react-client';
import Loading from '../../components/Spinner/Loading';

const ProfilePage = () => {
    const { user } = useAuth();
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isUser, setIsUser] = useState(null)

    
    const userId = user?._id
    // console.log(userId)
    const { data: userData, isLoading, isPending } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => user_Profile(userId)
    })

    
    useEffect(() => {
        if (userData) {
            setIsUser(userData?.data)
        }
    }, [userData, setIsUser]);
    // console.log(userData?.data?.first_name)

    if (isLoading) {
        return (
            <Loading />
        )
    } 
  return (
    <>
        <div className='bg-omni-light dark:bg-omni-navy min-h-screen py-3'>
           
           <div>
            <h1 className='text-3xl font-semibold p-4 h-18 dark:text-omni-light flex items-center'>
                Profile
            </h1>
           </div>

            <div>
                <ProfileCards isOpen={!isOpenModal} user={isUser} />
            </div>

            {/* Edit Modal */}
        </div>
    </>
  )
}

export default ProfilePage