import { ChevronLeftCircleIcon, ChevronRightCircleIcon, LayoutDashboard, LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const SideBar = ({ isOpen, setIsOpen }) => {
    const { isAuth, logout, user } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }
    const Links = [
            {name: "Dashboard", to: "/user/dashboard", icon: <LayoutDashboard />},
            {name: "Profile", to: "/user/profile", icon: <User />},
            {name: "Settings", to: "/user/settings", icon: <Settings />},
    ]
  return (
    <div
      className={`flex flex-col h-full bg-omni-accent dark:bg-omni-navy transition-all duration-300 ease-in-out ${
        isOpen ? 'w-40' : 'w-20'
      }`}
    >
      <div>
        {/* Toggle Button */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors dark:text-omni-light"
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
        {Links.map((link) => (
          <NavLink
            key={link.name}
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
          >
            {link.icon}
            {isOpen && <span className="font-medium">{link.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className='flex flex-col items-center gap-1 px-2 my-3'>
        <button type="button"
        onClick={logout}
        className={`bg-red-700 text-white font-semibold hover:bg-red-700/80 transform transition-colors delay-100 ease-in-out cursor-pointer ${
                  isOpen ? 'w-full justify-start' : 'justify-center w-12 h-12 '
              } border-0 rounded-lg p-3 flex items-center justify-center gap-2`}>
                  <LogOut />{isOpen && <span className="font-medium">Logout</span>}</button>
      </div>

  
        <div className='bottom-0 flex flex-col gap-3'>
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
                        <h1 className='text-omni-light font-semibold text-sm'>{user?.last_name} {user?.first_name}</h1>
                    </div>
                      )
                    }
                </div>

            </div>
      </div>

      </div>

  );
};

export default SideBar;