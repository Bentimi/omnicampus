import StatCards from '../../components/cards/StatCards'
import { User, Book, Users, GraduationCap, Landmark, BookOpen, LineChart  } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { get_Users } from '../../services/userApi'

const Dashboard = () => {
  
  const query = useQuery({
    queryKey: ['users'],
    queryFn: get_Users
  })
  
  // console.log(query)
  const data = query?.data?.data
  // console.log(data)
  const totalUser = data?.total;
  const totalLecturers = data?.users.filter(u => u.role === 'lecturer').length;
  const totalStudents = data?.users.filter(u => u.role === 'student').length;
  const totalAspirant = data?.users.filter(u => u.role === 'aspirant').length;
  const totalInactive = data?.users.filter(u => u.active === false).length;

  const users = data?.users || []
  console.log(data)

  const stats = [
    { title: 'Total Users', icon: <User size={70} color='#aaaa' />, number: totalUser, text: 'text-red-700' },
    { title: 'Total Lecturers', icon: <Users size={70} color='#aaaa' />, number: totalLecturers, text: 'text-blue-700' },
    { title: 'Total Students', icon: <Users size={70} color='#aaaa' />, number: totalStudents, text: 'text-blue-700' },
    { title: 'Total Aspirants', icon: <Users size={70} color='#aaaa' />, number: totalAspirant, text: 'text-blue-700' },
    { title: 'Inactive Users', icon: <Users size={70} color='#aaaa' />, number: totalInactive, text: 'text-rose-700' },
    { title: 'Total Courses', icon: <Book size={70} color='#aaaa' />, number: 10, text: 'text-green-700' },
    { title: 'Total Units', icon: <GraduationCap size={70} color='#aaaa' />, number: 10, text: 'text-yellow-700' },
    { title: 'Total Faculties', icon: <BookOpen size={70} color='#aaaa' />, number: 10, text: 'text-indigo-800' },
    { title: 'Total Departments', icon: <Landmark size={70} color='#aaaa' />, number: 10, text: 'text-orange-500' }
  ]
  return (
    <div>
    <div className='bg-omni-light dark:bg-omni-navy flex justify-center'>
      {/*stat cards */}
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-2 py-5'>
        {stats.map((stat, index) => (
          <StatCards key={index} title={stat.title} icon={stat.icon} number={stat.number} text={stat.text} />
        ))}
      </div>
      </div>
    </div>

      <div>
        {
          users.map((user, index) => (

            <div key={index}>
              <p className=''>{user?.first_name} {user?.last_name} {user?.role}</p>
            </div>
          )
          )
        }
      </div>
    </div>
  )
}

export default Dashboard