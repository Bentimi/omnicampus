import { useEffect, useState } from 'react'
import AddEditModal from '../../components/department/AddEditModal'
import Modal from '../../components/Modal';
import TableWrapper from '../../components/Table/TableWrapper';
import { useQuery } from '@tanstack/react-query';
import { allDepartment } from '../../services/departmentApi';
import { formatDate } from '../../services/formatDate';
import { CheckCircle2Icon, Edit2Icon, Eye, XCircleIcon } from 'lucide-react';

const DepartmentPage = () => {
  const [isAddEditModal, setIsAddEditModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [isDepartment, setIsDepartment] = useState(null);
  const [isDepartmentItem, setIsDepartmentItem] = useState(null);

  const columnHeaders = ['S/N', 'Name', 'Status', 'CreatedAt','Actions'];
  const tableKeys = ['sn', 'name', 'status', 'createdAt', 'actions'];
  const statusFilterOptions = ['all', 'active', 'inactive']

  const { data: departmentData, isLoading, isPending } = useQuery({
    queryKey: ['department'],
    queryFn: () => allDepartment()
  })


  useEffect(() => {
    if (departmentData) {
      setIsDepartment(departmentData?.data)
    }
  }, [departmentData])

  const department_Data = isDepartment || []
  // console.log(department_Data)


  const handleAddModal = () => {
    setIsAddEditModal(true)
    setStatus('add')
  }

  const handleEdit = (data) => {
    setStatus('edit')
    setIsAddEditModal(true)
    setIsDepartmentItem(data)
    // console.log(isDepartmentItem)
  }

  const handleStatus = (data) => {
    
  }

  const handleView = (data) => {

  }

  const tableData = department_Data.map((d, i) => ({
    sn: i + 1,
    name: d?.department,
    isActive: d?.isActive,
    status: (
      <p className={`${d?.isActive? 'bg-green-100 dark:bg-green-200 text-green-500' : 'bg-red-100 dark:bg-red-200 text-red-500'} w-[5em] flex justify-center items-center rounded-full font-semibold text-sm`}>
        {
          d?.isActive ? 'Active' : 'Inactive'
        }
      </p>
    ),
    createdAt: formatDate(d?.createdAt, 'date'),
    actions: (
        <div className='flex gap-1'>
          <button 
          onClick={() => handleEdit(d)}
          type="button"
          className='cursor-pointer text-blue-400 hover:bg-blue-100 p-1 rounded-lg'
          >
            <Edit2Icon size={18} />
          </button>
          <button 
          onClick={() => handleStatus(d)}
          type="button"
          className={`cursor-pointer p-1 rounded-lg ${d?.isActive? 'text-green-400 hover:bg-green-100' : 'text-red-400 hover:bg-red-100'}`}
          >{d?.isActive? <CheckCircle2Icon size={18} /> : <XCircleIcon size={18} />} </button>
           <button 
          onClick={() => handleView(d)}
          type="button"
          className='cursor-pointer text-gray-500 hover:bg-gray-100 p-1 rounded-lg'
          ><Eye size={18} /></button>
        </div>
      )
  }))
  return (
    <>
    <div className='p-6'>
      <div>DepartmentPage</div>

      <div className='flex justify-end items-center'>
        <button 
        type="button"
        onClick={handleAddModal}
        >Add Department</button>
      </div>

      <TableWrapper 
      header={columnHeaders}
      keys={tableKeys}
      tableData={tableData} 
      loading={isLoading} 
      filter={statusFilterOptions}
      />
    </div>
      <Modal
        isOpen={isAddEditModal}
        onClose={() => setIsAddEditModal(false)}
        children={<AddEditModal
        onClose={() => setIsAddEditModal(false)}  
        status={status}
        data={isDepartmentItem}
        />}
      />
    </>
  )
}

export default DepartmentPage