import { Book, BookCopy, BookOpenCheck, Building, Calendar, ChevronDown, ChevronLeftCircleIcon, ChevronRightCircleIcon, ChevronUp, CreditCard, Currency, Edit, LayoutDashboard, Lock, LogOut, Settings, User, UserPlus, UserPlus2Icon, Users, Users2, Users2Icon } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { div, span } from 'motion/react-client';

const SideBar = ({ isOpen, setIsOpen }) => {
    const { isAuth, logout, user } = useAuth()
    const navigate = useNavigate()

    const [openIndex, setOpenIndex] = useState(null);

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }
    const generalLinks = [
            {name: "Dashboard", to: "/user/dashboard", icon: <LayoutDashboard />},
            // {name: "Profile", to: "/user/profile", icon: <User />},
            // {name: "Settings", to: "/user/settings", icon: <Settings />},
            // {name: "Change Password", to: "/user/change-password", icon: <Lock />}
    ]
    const accordionLinks = [
      {name: 'Profile', logo: <User size={18} />, content: [
        {title: 'User Profile', to: '/user/profile', icon: <User size={12} />},
        // {title: 'Edit Profile', to: '/user/edit-profile', icon: <Edit size={12} />},
        {title: 'Change Password', to: '/user/change-password', icon: <Lock size={12} />},
      ]},
      {name: 'Course', logo: <Book size={18} />, content: [
        {title: 'Course Form', to: '/user/profile', icon: <User size={12} />},
        {title: 'Examination', to: '/user/change-password', icon: <Lock size={12} />},
        {title: 'Result', to: '/user/change-password', icon: <Lock size={12} />},
      ]},
      {name: 'Payment', logo: <CreditCard size={18} />, content: [
        {title: 'Pay Fees', to: '/user/profile', icon: <CreditCard size={12} />},
        {title: 'Receipts', to: '/user/change-password', icon: <Lock size={12} />},
      ]}
    ]

    const adminLinks = [
      {name: 'Profile', logo: <User size={18} />, content: [
        {title: 'User Profile', to: '/user/profile', icon: <User size={12} />},
        // {title: 'Edit Profile', to: '/user/edit-profile', icon: <Edit size={12} />},
        {title: 'Change Password', to: '/user/change-password', icon: <Lock size={12} />},
      ]},
      {name: 'Users', logo: <Users size={18} />, content: [
        {title: 'All Users', to: '/users', icon: <Users2Icon size={12} />},
        {title: 'Add User', to: '/user/add-user', icon: <UserPlus2Icon size={12} />},
      ]},
      {name: 'Course', logo: <BookCopy size={18} />, content: [
        {title: 'Faculty', to: '/faculty', icon: <Building size={12} />},
        {title: 'Department', to: '/department', icon: <Building size={12} />},
        {title: 'Courses', to: '/courses', icon: <BookCopy size={12} />}
      ]},
      {name: 'Exam', logo: <BookOpenCheck size={18} />, content: [
        {title: 'Session', to: '/session', icon: <Calendar size={12} />},
        {title: 'Examination', to: '/user/change-password', icon: <BookOpenCheck size={12} />}
      ]},
      {name: 'Payment', logo: <CreditCard size={18} />, content: [
        {title: 'Fess', to: '/user/change-password', icon: <CreditCard size={12} />},
      ]},
      {name: 'Admission', logo: <UserPlus2Icon size={18} />, content: [
        {title: 'Aspirants', to: '/user/change-password', icon: <UserPlus size={12} />},
        {title: 'Settings', to: '/user/profile', icon: <Settings size={12} />},
      ]}
    ]
  return (
    <div
      className={`flex flex-col h-full bg-omni-accent dark:bg-omni-navy transition-all duration-300 ease-in-out shadow-lg shadow-gray-100/10 ${
        isOpen ? 'w-40' : 'w-20'
      }`}
    >
      <div>
        {/* Toggle Button */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          className="p-2 rounded-full hover:bg-white/10 transition-all text-omni-light cursor-pointer transform ease-in-out delay-200 duration-1000"
        >
          {isOpen ? (
            <ChevronRightCircleIcon size={22} />
          ) : (
            <ChevronLeftCircleIcon size={22} />
          )}
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col items-center gap-1 px-2 mt-1">
        {generalLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'active'
                  : 'inactive'
              } ${
                  isOpen ? 'w-full justify-start' : 'justify-center w-12 h-12 '
              }`
            }
            onClick={() => {
              if (!isOpen) {
                setIsOpen(true)
              } 
              setOpenIndex(openIndex === null)
            }}
          >
            {link.icon}
            {isOpen && <span className="font-medium">{link.name}</span>}
          </NavLink>
        ))}

      {/* Accordion Links   */}
      
      <div className='grid grid-cols-1 gap-1'>
        {
        ((user?.role === 'admin')? adminLinks : accordionLinks).map((links, index) => (
          <div key={index} className='grid grid-cols-1 gap-2'>
            <button type="button" 
            onClick={() => {
              if (!isOpen) {
                setIsOpen(true)
              }
              setOpenIndex(openIndex === index?null:index)
            }}
            >
              <div className={`flex justify-start gap-2 items-center h-12 p-3 cursor-pointer rounded-lg font-semibold hover:bg-white/10 hover:delay-300 hover:ease-in-out hover:transition-colors hover-duration-700 ${
                isOpen? 'w-36' : 'w-fit'
              } ${
                openIndex === index? 'border bg-omni-light/20 text-omni-light' : 'text-omni-light w-36'
              }`}>{links.logo} {isOpen && (
              <span className='font-medium flex items-center gap-1'>{links.name} <span className='transition-all duration-400 delay-150 transform'>
                {
                openIndex === index? <ChevronUp size={18} /> : <ChevronDown size={18} />
              }</span></span>
            )} </div>
            </button>
            {
              (openIndex === index && isOpen) && (

              <div key={index} className={`${openIndex === index? 'h-fit block' : 'h-0 hidden'} overflow-hidden transition-all duration-800 transform ease-in-out delay-300 gap-1 grid grid-cols-1`}>
                {
                  links.content.map((link, i) => (
                    <NavLink key={link.title} to={link.to} 
                    className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors delay-100 duration-300 text-xs ${
                  isActive
                    ? 'active'
                    : 'inactive'
                } ${
                    isOpen ? 'w-full justify-start' : 'justify-center w-12 h-12'
                } ${!isOpen && ('justify-center')}`}
                    >
                      {link.icon} {isOpen && (link.title)}
                    </NavLink>
                  ))
                }
              </div>
              )
            }
          </div>
        ))
      }
      </div>
      
      </nav>

      <div className='flex flex-col items-center gap-1 px-2 my-3'>
        <button type="button"
        onClick={logout}
        className={`bg-red-700 text-white font-semibold hover:bg-red-700/80 transform transition-colors delay-100 ease-in-out cursor-pointer ${
                  isOpen ? 'w-full justify-start' : 'justify-center w-12 h-12 '
              } border-0 rounded-lg p-3 flex items-center justify-center gap-2`}>
                  <LogOut />{isOpen && <span className="font-medium">Logout</span>}</button>
      </div>

  
        {/* <div className='bottom-0 flex flex-col gap-3'>
                <hr className='border-omni-light' />
                
                <div className='flex items-center justify-between gap-2 px-2 py-4'>
                    <div>
                      {user?.image ?
                      <img src={user?.image} className='h-12 w-12 rounded-full flex items-center justify-center object-contain' />
                      :
                      <div className='border h-12 w-12 rounded-full flex items-center justify-center dark:border-omni-light dark:text-omni-light'>
                          <h1 className='uppercase font-semibold text-2xl'>{user?.first_name.charAt(0)}</h1>
                      </div>
                      }
                    </div>
                    {
                      isOpen && (
                        <div>
                        <h1 className='text-omni-light font-semibold text-sm truncate w-[6em]'>{user?.first_name} {user?.last_name}</h1>
                    </div>
                      )
                    }
                </div>

            </div> */}
      </div>

      </div>

  );
};

export default SideBar;