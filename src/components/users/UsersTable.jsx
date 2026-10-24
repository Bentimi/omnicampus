import { useQuery } from "@tanstack/react-query";
import { CheckCircle2Icon, Edit, Eye, Table, UserCircle, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import EditModal from "../profile/EditModal";


const UsersTable = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState(null)
    const [userId, setUserId] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null);


    
    useEffect(() => {
        if (userData) {
            setUsers(userData?.data)
        }
    }, [userData, setUsers])
    console.log(users)

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
        setIsOpen(true)
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
            <div className="flex items-center gap-2 font-semibold ">
           {row?.first_name} {row?.last_name} 
            </div>
      ),
        },
        {
            name: 'Email',
            selector: (row) => row?.email,
            cell: (row) => (
            <div className="flex items-center gap-2 font-semibold ">
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
            <div className="flex items-center gap-2 font-semibold ">
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
          <Edit size={18} />
        </button>
        <button
          onClick={() => handleProfile(row._id)}
          className="p-1.5 text-omni-accent hover:bg-omni-accent/10 rounded-lg transition cursor-pointer"
          title="Settigs Session"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={() => handleAction(row._id)}
          className={`p-1.5  rounded-lg transition cursor-pointer ${row.isActive? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}
          title="Settigs Session"
        >
          {
            row.isActive? 
            <CheckCircle2Icon size={18} /> :
            <XCircleIcon size={18} />
          }
        </button>
        </div>
      ),
      width: '8em',
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    ]
  return (
    <>
    <div className='bg-omni-light'>

        <div>
            <Table
            columns={columns}
            data={users?.users}
            onChangePage={handlePage}
            onChangeRowsPerPage={handlePageSize} 
            page={page}
            pageSize={pageSize}
            />
        </div>
    </div>


        <div>
            <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            children={<EditModal 
                user={user} 
                onClose={() => setIsOpen(false)} 
                />}
            />
        </div>
    </>
  )
}

export default UsersTable