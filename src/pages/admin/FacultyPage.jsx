import TableWrapper from '../../components/Table/TableWrapper'
import { useQuery } from '@tanstack/react-query';
import { getFaculties } from '../../services/facultyApi';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import AddFaculty from '../../components/faculty/AddFaculty';
import { formatDate } from '../../services/formatDate';
import { Activity, ActivityIcon, CheckCircle, CheckCircle2Icon, Edit2Icon, Eye, Sigma, Trash2Icon, X, XCircleIcon } from 'lucide-react';
import StatCards from '../../components/cards/StatCards';
import ViewFaculty from '../../components/faculty/ViewFaculty';
import FacultyStatusModal from '../../components/faculty/FacultyStatusModal';


const FacultyPage = () => {

  const [isFaculty, setIsFaculty] = useState(null)
  const [isAddFacultyModal, setIsAddFacultyModal] = useState(false)
  const [isViewFacultyModal, setIsViewFacultyModal] = useState(false)
  const [isFacultyItem, setIsFacultyItem] = useState(null)
  const [isStatus, setIsStatus] = useState('')

  const columnHeader = ['s/n', 'Name', 'Status', 'CreatedAt', 'Actions']
  const tableKeys = ['sn', 'name', 'status', 'createdAt', 'actions']
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

  // console.log(isFaculty)

  const faculty_Data = isFaculty?.faculty || []

  // console.log(faculty_Data)

  const handleView = (data) => {
    // const data = isFacult?.sessions.find((item) => item._id === id)
    setIsViewFacultyModal(true)
    setIsFacultyItem(data)
    // console.log(isFacultyItem)
  }

  const handleEdit = (data) => {
    setIsStatus('edit')
    setIsAddFacultyModal(true)
    setIsFacultyItem(data)
  }

  const tableData = faculty_Data.map((d, i) => ({
    
      sn: i + 1,
      name: d?.faculty,
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
          onClick={() => handleView(d)}
          type="button"
          className='cursor-pointer text-green-400 hover:bg-green-100 p-1 rounded-lg'
          ><Eye size={18} /></button>
          <button 
          onClick={() => handleView(d)}
          type="button"
          className='cursor-pointer text-red-400 hover:bg-red-100 p-1 rounded-lg'
          ><Trash2Icon size={18} /></button>
        </div>
      )

 }))


  const handleAddModal = () => {
    setIsStatus('add')
    setIsAddFacultyModal(true)
    // alert(isAddModal)
  }
  
  return (
    <>
      <div className='p-6'>
        <div className='flex justify-center'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 space-y-3 space-x-2 p-2 justify-start'>
            <StatCards number={isFaculty?.activeTotal} text='text-green-800' 
            icon={<CheckCircle2Icon color='green' size={50} />} title='Active'
            />
            <StatCards number={isFaculty?.inActiveTotal} text='text-red-600' 
            icon={<XCircleIcon color='red' size={50} />} title='Inactive'
            />
            <StatCards number={isFaculty?.total} text='text-primary-600' 
            icon={<Sigma color='blue' size={50} />} title='Total'
            />
          </div>
        </div>

        <div className='flex justify-end'>
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
          data={isFacultyItem}
          />}
        />

        <Modal
        isOpen={isViewFacultyModal}
        onClose={() => setIsViewFacultyModal(false)}
        children={<ViewFaculty
          onClose={() => setIsViewFacultyModal(false)}
          data={isFacultyItem}
          />}
        />

        <Modal
        isOpen={isViewFacultyModal}
        onClose={() => setIsViewFacultyModal(false)}
        children={<FacultyStatusModal
          onClose={() => setIsViewFacultyModal(false)}
          data={isFacultyItem}
          />}
        />
      </div>
    </>
  )
}

export default FacultyPage