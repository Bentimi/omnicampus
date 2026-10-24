import { CheckCircle, CheckCircle2Icon, Edit, Edit2, PlusCircle, XCircleIcon, Calendar, Settings2, LucideSparkle, LucideSparkles, Ban, LucideXCircle, MonitorPlay, XCircle, Eye } from 'lucide-react'
import Modal from '../../components/Modal'
import SessionCreationForm from '../../components/session/SessionCreationForm'
import { useEffect, useState } from 'react'
import StatCards from '../../components/cards/StatCards'
import { useQuery } from '@tanstack/react-query'
import { all_Session } from '../../services/sessionApi'
import { formatDate } from '../../services/formatDate'
import { div, tr } from 'motion/react-client'
import { set } from 'date-fns'
import Spinner from '../../components/Spinner'
import Loading from '../../components/Spinner/Loading'
import Table from '../../components/Table'
import SessionProfile from '../../components/session/SessionProfile'
import SessionAction from '../../components/session/SessionAction'
import SessionVerification from '../../components/session/SessionVerification'

const SessionPage = () => {
  const [openCreateModal, SetOpenCreateModal] = useState(false)
  const [type, setType] = useState('add');
  const [session, setSession] = useState(null)
  const [isEditItem, setIsEditItem] = useState(null)

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5)

  const [isProfile, setIsProfile] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const [search, setSearch] = useState('');
  const [verification, setVerification] = useState(false);

  const {  data: sessionData, isLoading, isPending, isError, error } = useQuery({
    queryKey: ['session', page, pageSize, search],
    queryFn: () => all_Session(page, pageSize, search)
  })

  
  
  useEffect(() => {
    if (sessionData) {
      setSession(sessionData?.data)
    }
  }, [sessionData, setSession])
  // console.log(session)
  
  const handlePageSize = (newPerPage, newPage) => {
      setPageSize(newPerPage)
      setPage(newPage)
    }
  
  const handlePage = (newPage) => {
    setPage(newPage)
  }

  const handleEditItem = (id) => {
    const itemToEdit = session?.sessions.find((item) => item._id === id)
    setType('edit')
    setIsEditItem(itemToEdit)
     SetOpenCreateModal(true)
  } 

  const handleProfile = (id) => {
    const itemToEdit = session?.sessions.find((item) => item._id === id)
    setIsEditItem(itemToEdit)
    setIsProfile(true)
  }

  const handleAction = (id) => {
    const itemToEdit = session?.sessions.find((item) => item._id === id)
    setIsEditItem(itemToEdit)
    setIsAction(true)
  } 

  const handleVerification = (id) => {
    const itemToEdit = session?.sessions.find((item) => item._id === id)
    setIsEditItem(itemToEdit)
    setVerification(true)
  } 

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    setPage(1);
  }

  const columns = [
    {
      name: 'S/N',
      cell: (row, index) => index + 1,
      width: '5em'
    },
    {
      name: 'Session',
      selector: (row) => row.session,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2 font-semibold ">
          <Calendar size={16} className="text-omni-accent" />
          {row.session}
        </div>
      ),
      width: '20em',
    },
    {
      name: 'Status',
      selector: (row) => row.isActive,
      sortable: true,
      cell: (row) => (
        <span
          className={`p-1 rounded-full text-xs font-medium flex justify-center items-center h-8 w-8 ${
            row.isActive
              ? 'bg-green-600/10 text-green-700'
              : 'text-red-700 bg-red-600/10'
          }`}
        >
          {row.isActive ? <CheckCircle size={15} /> : <XCircle size={15} />}
        </span>
      ),
       width: '14em'
    },
    {
      name: 'Payment Status',
      selector: (row) => row.paymentStatus,
      sortable: true,
      cell: (row) => (
        <span
          className={`p-1 rounded-full text-xs font-medium flex justify-center items-center h-8 w-8 ${
            row.paymentStatus
              ? 'bg-green-600/10 text-green-700'
              : 'text-red-700 bg-red-600/10'
          }`}
        >
          {row.paymentStatus ? <CheckCircle size={15} /> : <XCircle size={15} />}
        </span>
      ),
       width: '14em'
    },
    {
      name: 'Registration Status',
      selector: (row) => row.regStatus,
      sortable: true,
      cell: (row) => (
        <span
          className={`p-1 rounded-full text-xs font-medium flex justify-center items-center h-8 w-8 ${
            row.regStatus
              ? 'bg-green-600/10 text-green-700'
              : 'text-red-700 bg-red-600/10'
          }`}
        >
          {row.regStatus ? <CheckCircle size={15} /> : <XCircle size={15} />}
        </span>
      ),
       width: '14em'
    },
    {
      name: 'Current',
      selector: (row) => row.current,
      sortable: true,
      cell: (row) => (
        <span
          className={`p-1 rounded-full text-xs font-medium flex justify-center items-center h-8 w-8 ${
            row.current
              ? 'bg-green-600/10 text-green-700'
              : 'text-red-700 bg-red-600/10'
          }`}
        >
          {row.current ? <CheckCircle size={15} /> : <XCircle size={15} />}
        </span>
      ),
       width: '10em'
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button
          onClick={() => handleEditItem(row._id)}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
          title="Edit Session"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => handleProfile(row._id)}
          className="p-1.5 text-omni-accent hover:bg-omni-accent/10 rounded-lg transition cursor-pointer"
          title="Session Profile"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={() => handleVerification(row._id)}
          className="p-1.5 hover:bg-gray-300 rounded-lg transition cursor-pointer"
          title="Session Settings"
        >
          <Settings2 size={18} />
        </button>
        <button
          onClick={() => handleAction(row._id)}
          className={`p-1.5  rounded-lg transition cursor-pointer ${row.isActive? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}
          title="Status"
        >
          {
            row.isActive? 
            <CheckCircle2Icon size={18} /> :
            <XCircleIcon size={18} />
          }
        </button>
        </div>
      ),
      width: '8rem',
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]

  // console.log(session?.sessions.filter(u => u.isActive !== true).length)
  const activeSession = session?.sessions.filter(u => u.isActive === true).length
  const inActiveSession = session?.sessions.filter(u => u.isActive !== true).length
  const totalSession = session?.total
  const isCurrentsession = session?.sessions.find(u => u.current)
  const currentSession = isCurrentsession?.session ?? 'None'

  return (
    <>
    <div className='bg-omni-light dark:bg-omni-navy min-h-[120vh] lg:min-h-[95vh] py-6'>
      <div className='flex justify-center'>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 space-y-3 space-x-2 p-2 justify-start'>
        <StatCards number={activeSession} text='text-green-800' icon={<LucideSparkle size={50} color='green' />} title='Active Sessions' />
        <StatCards number={inActiveSession} text='text-red-600' icon={<LucideXCircle size={50} color='red' />} title='Inactive Sessions' />
        <StatCards number={totalSession} text='text-orange-300' icon={<LucideSparkle size={50} color='orange' />} title='Total Sessions' />
        <StatCards number={currentSession} text='text-green-800' icon={<LucideSparkles size={50} color='green' />} title='Current Session' />
      </div>
      </div>

      <div className='dark:text-omni-light my-3 bg-transparent h-[50vh] w-full lg:w-4/5 mx-auto space-y-3 px-3'>
        <div className='flex justify-end'>
        <button type="button" className='flex gap-2 items-center p-3 border-2 border-green-900 rounded-lg text-green-900 font-semibold cursor-pointer hover:bg-green-900 hover:text-omni-light transition-colors duration-700 delay-150 ease-in-out'
        onClick={() => {
          setType('add')
          SetOpenCreateModal(true)
        }}><PlusCircle size={18} />  Add Session</button>
      </div>
        <Table 
        columns={columns}
        data={session?.sessions}
        paginationTotalRows={session?.total || 1}
        onChangePage={handlePage}
        onChangeRowsPerPage={handlePageSize}
        progressPending={isLoading}
        page={page}
        pageSize={pageSize}
        onSearch={handleSearch}
        />
      </div>
    </div>

      <div>
        <Modal isOpen={openCreateModal} onClose={() => SetOpenCreateModal(false)} children={<SessionCreationForm type={type} session={isEditItem}  onClose={() => SetOpenCreateModal(false)} />} />

        <Modal isOpen={isProfile} onClose={() => setIsProfile(false)}
        children={<SessionProfile 
        session={isEditItem} onClose={() => setIsProfile(false)}
        />}
        />

        <Modal
        isOpen={isAction} onClose={() => setIsAction(false)}
        children={<SessionAction 
        session={isEditItem} onClose={() => setIsAction(false)}
        />}
        />
        <Modal
        isOpen={verification} onClose={() => setVerification(false)}
        children={<SessionVerification
        session={isEditItem} onClose={() => setVerification(false)}
        />}
        />
      </div>

        </>
  )
}

export default SessionPage