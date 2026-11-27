import { useEffect, useState } from 'react'
import AddEditModal from '../../components/department/AddEditModal'
import Modal from '../../components/Modal';
import TableWrapper from '../../components/Table/TableWrapper';
import { useQuery } from '@tanstack/react-query';
import { allDepartment } from '../../services/departmentApi';
import { formatDate } from '../../services/formatDate';

const DepartmentPage = () => {
  const [isAddEditModal, setIsAddEditModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [isDepartment, setIsDepartment] = useState(null)

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
    actions: 'Action'
  }))
  return (
    <>
    <div>
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
        />}
      />
    </>
  )
}

export default DepartmentPage