import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { useQuery } from '@tanstack/react-query'
import { get_Users } from '../../services/userApi'
import { CheckCircle2Icon, Edit, Eye, Settings2, Shield, SwordIcon, SwordsIcon, UserCircle, UserPenIcon, UserPlus2, Users2Icon, XCircleIcon } from 'lucide-react'
import Modal from '../../components/Modal'
import EditModal from '../../components/profile/EditModal'
import { useNavigate } from 'react-router'
import Deactivate from '../../components/profile/Deactivate'
import StatCards from '../../components/cards/StatCards'
import AddUserModal from '../../components/users/AddUserModal'
import { useAuth } from '../../context/AuthContext'
import UserRole from '../../components/users/UserRole'

const UsersPage = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState(null)
    const [userId, setUserId] = useState(null);
    const [isEditModal, setIsEditModal] = useState(false)
    const [isDeactivateModal, setIsDeactivateModal] = useState(false)
    const [user, setUser] = useState(null);
    const [isStaffModal, setIsStaffModal] = useState(false)
    const [isStudentModal, setIsStudentModal] = useState(false)
    const [isUserRoleModal, setIsUserRoleModal] = useState(false)
    

    const { data: userData, isLoading, isPending } = useQuery({
        queryKey: ['user', page, pageSize, search],
        queryFn: () => get_Users(page, pageSize, search) 
    })

    const navigate = useNavigate()
    
    useEffect(() => {
        if (userData) {
            setUsers(userData?.data)
        }
    }, [userData, setUsers])
    // console.log(users)

    const handlePage = (newPage) => {
        setPage(newPage)
    }

    const handlePageSize = (newPage, newPageSize) => {
        setPageSize(newPageSize)
        setPage(newPage)
    }

    const handleProfileEdit = (id) => {
        const getUser = users?.users.find((u) => u._id === id)
        setUser(getUser)
        setIsEditModal(true)
    }

    const handleProfile = (id) => {
        navigate(`/user/profile/${id}`)
    }

    const handleActivation = (id) => {
       const getUser = users?.users.find((u) => u._id === id)
        setUser(getUser)
        setIsDeactivateModal(true)
    } 

    const handleRole = (id) => {
       const getUser = users?.users.find((u) => u._id === id)
        setUser(getUser)
        setIsUserRoleModal(true)
    } 

    const handleSearch = (searchValue) => {
    setSearch(searchValue);
    setPage(1);
  }

    const columns = [
        {
            name: 'S/N',
            cell: (row, index) => index + 1
        },
        {
            name: 'Photo',
            selector: (row) => row?.image,
            cell: (row) => (
            <div className="flex items-center justify-center mx-auto font-semibold ">
           {row?.image ?
            <img src={row?.image} alt="image" loading='lazy' /> :

                <UserCircle size={40} />
        } 
            </div>
      ),
        },
        {
            name: 'Name',
            selector: (row) => row?.first_name,
            cell: (row) => (
            <div className="flex items-center gap-2 font-semibold truncate">
           {row?.first_name} {row?.last_name} 
            </div>
      ),
        },
        {
            name: 'Email',
            selector: (row) => row?.email,
            cell: (row) => (
            <div className="flex items-center gap-2 font-semibold truncate">
           {row?.email} 
            </div>
      ),
        },
        {
            name: 'Gender',
            selector: (row) => row?.gender,
            cell: (row) => (
            <div className="flex items-center gap-2 font-semibold ">
           {row?.gender} 
            </div>
      ),
        },
        {
            name: 'Status',
            selector: (row) => row?.role,
            cell: (row) => (
            <div className="flex items-center gap-2 font-semibold ">
           {row?.role} 
            </div>
      ),
        },
        {
            name: 'Department',
            selector: (row) => row?.department,
            cell: (row) => (
            <div className="flex items-center gap-2 font-semibold mx-auto">
           {row?.department ? row?.department : '-'} 
            </div>
      ),
        },
        {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button
          onClick={() => handleProfileEdit(row._id)}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
          title="Edit Session"
        >
          <Edit size={15} />
        </button>
        <button
          onClick={() => handleProfile(row._id)}
          className="p-1.5 text-omni-accent hover:bg-omni-accent/10 rounded-lg transition cursor-pointer"
          title="Settigs Session"
        >
          <Eye size={15} />
        </button>
        <button
          onClick={() => handleRole(row._id)}
          className={`p-1.5  rounded-lg transition cursor-pointer text-indigo-600 hover:bg-indigo-100`}
          title="Settigs Session"
        >
          <Shield size={15} />
        </button>
        <button
          onClick={() => handleActivation(row._id)}
          className={`p-1.5  rounded-lg transition cursor-pointer ${row.active? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}
          title="Settigs Session"
        >
          {
            row.active? 
            <CheckCircle2Icon size={15} /> :
            <XCircleIcon size={15} />
          }
        </button>
        </div>
      ),
      width: '9em',
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    ]

    const handleAddStudentModal = () => {
        setIsStudentModal(true)
    }

    const handleAddStaffModal = () => {
        setIsStaffModal(true)
    }
  return (
    <>
    <div className='bg-omni-light dark:bg-omni-navy p-5 flex flex-col space-y-20 min-h-screen'>

        <div className='flex justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mx-auto'>
            <StatCards title='Lecturer' icon={<Users2Icon color='orange' size={50} />} number={20} text='text-orange-400' />
            <StatCards title='Students' icon={<Users2Icon color='indigo' size={50} />} number={20} text='text-indigo-900' />
            <StatCards title='Security' icon={<Shield color='red' size={50} />} number={20} text='text-red-600' />
            <StatCards title='Admin' icon={<SwordsIcon color='green' size={50} />} number={20} text='text-green-600' />
        </div>
        </div>

        <div className='w-full lg:w-[80%] mx-auto  lg:px-2'>
            <div className='flex gap-3 justify-end pb-4'>
                <button
                type='button'
                className='h-12 w-38 border rounded-lg border-green-900 text-green-900 font-semibold transition-colors ease-in-out duration-700 delay-150 cursor-pointer hover:bg-green-900 hover:text-omni-light flex items-center justify-center gap-2 text-sm lg:text-lg'
                onClick={handleAddStaffModal}
                >
                    <UserPlus2 /> Add Staff
                </button>
                <button
                type='button'
                className='h-12 w-38 border rounded-lg border-blue-900 text-blue-900 font-semibold transition-colors ease-in-out duration-700 delay-150 cursor-pointer hover:bg-blue-900 hover:text-omni-light flex items-center justify-center gap-2 text-sm lg:text-lg'
                onClick={handleAddStudentModal}
                >
                    <UserPlus2 /> Add Student
                </button>
            </div>
            <Table
                columns={columns}
                data={users?.users}
                onChangePage={handlePage}
                onChangeRowsPerPage={handlePageSize} 
                page={page}
                pageSize={pageSize}
                onSearch={handleSearch}
                paginationTotalRows={users?.total || 1}
                progressPending={isLoading}
            />
        </div>
    </div>


        <div>
            <Modal
            isOpen={isEditModal}
            onClose={() => setIsEditModal(false)}
            children={<EditModal 
                user={user} 
                onClose={() => setIsEditModal(false)} 
                />}
            />

            <Modal
            isOpen={isDeactivateModal}
            onClose={() => setIsDeactivateModal(false)}
            children={<Deactivate 
                text='admin'
                user={user} 
                onClose={() => setIsDeactivateModal(false)} 
                />}
            />

            <Modal 
            isOpen={isStaffModal}
            onClose={() => setIsStaffModal}
                children={<AddUserModal
                    onClose={() => setIsStaffModal(false)}
                    type='staff'
                    />}
            />

            <Modal 
            isOpen={isStudentModal}
            onClose={() => setIsStudentModal}
                children={<AddUserModal
                    onClose={() => setIsStudentModal(false)}
                    type='student'
                    />}
            />

            <Modal 
            isOpen={isUserRoleModal}
            onClose={() => setIsUserRoleModal}
                children={<UserRole
                    onClose={() => setIsUserRoleModal(false)}
                    user={user}
                    />}
            />
        </div>
    </>
  )
}

export default UsersPage