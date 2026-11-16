import TableWrapper from '../../components/Table/TableWrapper'
import { useQuery } from '@tanstack/react-query';
import { getFaculties } from '../../services/facultyApi';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import AddFaculty from '../../components/faculty/AddFaculty';


const FacultyPage = () => {

  const [isFaculty, setIsFaculty] = useState(null)
  const [isAddFacultyModal, setIsAddFacultyModal] = useState(false)
  const [isStatus, setIsStatus] = useState('')

  const columnHeader = ['s/n', 'Name', 'Status', 'CreatedAt']
  const tableKeys = ['sn', 'name', 'status', 'createdAt']
  // const dataTable = 

  const { data: facultyData, isLoading, isPending } = useQuery({
    queryKey: ['faculty'],
    queryFn: () => getFaculties()
  })

  // console.log(facultyData?.data)

  useEffect(() => {
    if (facultyData) {
      setIsFaculty(facultyData?.data)
    }
  }, [facultyData])

  console.log(isFaculty)

  const faculty_Data = isFaculty?.faculty || []

  console.log(faculty_Data)

  const tableData = faculty_Data.map((d, i) => ({
    
      sn: i + 1,
      name: d?.faculty,
      status: d?.isActive ? 'Active' : 'Inactive',
      createdAt: d?.createdAt

 }))


  const handleAddModal = () => {
    setIsStatus('add')
    setIsAddFacultyModal(true)
    // alert(isAddModal)
  }
  
  return (
    <>
      <div>
        <div>FacultyPage</div>

        <div>
          <button type="button"
          className='h-12 w-38 border rounded-lg border-blue-900 text-blue-900 font-semibold transition-colors ease-in-out duration-700 delay-150 cursor-pointer hover:bg-blue-900 hover:text-omni-light flex items-center justify-center gap-2 text-sm lg:text-lg'
          onClick={handleAddModal}>
            Add Faculty
          </button>
        </div>

        <TableWrapper header={columnHeader} keys={tableKeys} tableData={tableData} />

        <Modal
        isOpen={isAddFacultyModal}
        onClose={() => setIsAddFacultyModal(false)}
        children={<AddFaculty
          onClose={() => setIsAddFacultyModal(false)}
          status={isStatus}
          />}
        />
      </div>
    </>
  )
}

export default FacultyPage