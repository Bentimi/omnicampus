import React from 'react'
import StatCards from '../../components/cards/StatCards'
import { User, Book, Users, GraduationCap, Landmark, BookOpen, LineChart  } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', icon: <User size={70} color='#aaaa' />, number: 10, text: 'text-red-700' },
    { title: 'Total Courses', icon: <Book size={70} color='#aaaa' />, number: 10, text: 'text-green-700' },
    { title: 'Total Students', icon: <Users size={70} color='#aaaa' />, number: 10, text: 'text-blue-700' },
    { title: 'Total Units', icon: <GraduationCap size={70} color='#aaaa' />, number: 10, text: 'text-yellow-700' },
    { title: 'Total Faculties', icon: <BookOpen size={70} color='#aaaa' />, number: 10, text: 'text-indigo-800' },
    { title: 'Total Departments', icon: <Landmark size={70} color='#aaaa' />, number: 10, text: 'text-orange-500' }
  ]
  return (
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
  )
}

export default Dashboard