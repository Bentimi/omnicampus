import { useState } from 'react'
import AddEditModal from '../../components/department/AddEditModal'
import Modal from '../../components/Modal';

const DepartmentPage = () => {
  const [isAddEditModal, setIsAddEditModal] = useState(false);
  const [status, setStatus] = useState(null);
  const handleAddModal = () => {
    setIsAddEditModal(true)
    setStatus('add')
  }
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
      <Modal
        isOpen={isAddEditModal}
        onClose={() => setIsAddEditModal(false)}
        children={<AddEditModal
        onClose={() => setIsAddEditModal(false)}  
        status={status}
        />}
      />
    </div>
    </>
  )
}

export default DepartmentPage