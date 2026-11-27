import { useEffect, useState } from 'react'
import AddEditModal from '../../components/department/AddEditModal'
import Modal from '../../components/Modal';
import TableWrapper from '../../components/Table/TableWrapper';
import { useQuery } from '@tanstack/react-query';
import { allDepartment } from '../../services/departmentApi';

const DepartmentPage = () => {
  const [isAddEditModal, setIsAddEditModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [isDepartment, setIsDepartment] = useState(null)

  const columnHeaders = ['s/n', 'Name', 'Status', 'CreatedAt','Actions'];
  const tableKeys = ['s/n', 'name', 'status', 'createdAt', 'actions'];
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

  console.log(isDepartment)


  const handleAddModal = () => {
    setIsAddEditModal(true)
    setStatus('add')
  }

  // const tableData = 
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