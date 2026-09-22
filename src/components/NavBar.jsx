import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router';
import logo from "../assets/logo.png";
import { 
    X, Menu, Home, User, Rss, LogIn, LogOut,
    MonitorCog, Sun, Moon,
    Gauge,
    Settings,
    Book,
    BookOpen
  } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SideBar from './SideBar';
import { div } from 'motion/react-client';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'system';
    });

    const { isAuth, logout, user } = useAuth()

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'system') {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', systemDark);
            localStorage.setItem('theme', 'system');
        } else if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        }, [theme]);


    const links = [
        { name: "Home", to: "/", icon: <Home/> },
        { name: "Blog", to: "/blog", icon: <Rss /> },
        { name: "AboutUs", to: "/about", icon: <Rss /> },
        { name: "ContactUs", to: "/contactus", icon: <User /> }
    ]
    const userlinks = [
        { name: "Dashboard", to: "/user/dashboard", icon: <Gauge /> },
        { name: "Profile", to: "/user/profile", icon: <User /> },
        { name: "Courses", to: "/about", icon: <BookOpen /> },
        { name: "Settings", to: "/contactus", icon: <Settings /> }
    ]

    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }
  return (
    <>
    
    <header className='bg-omni-accent dark:bg-omni-navy w-full fixed h-[5em] top-0 z-10 flex items-center justify-between px-4'>

            <div className='min-h-[4em] max-h-full flex items-center justify-center pt-2'>
                <img src={logo}alt="logo-img" loading='lazy' className='h-30' />
            </div>

            <div>
                <button onClick={() => {
                    if (theme === 'system') {
                         setTheme('light');
                    } else if (theme === 'light') {
                         setTheme('dark');
                    } else {
                        setTheme('system');
                    }
                }} className='transition cursor-pointer duration-300 dark:text-omni-light'>
                    {theme === 'system' && <MonitorCog />}
                    {theme === 'light' && <Sun />}
                    {theme === 'dark' && <Moon />}
                </button>
                    
            </div>

            <div>
                {/* Nav Bar */}
                {
                    !isAuth && (
                        <div className='hidden lg:flex gap-2 items-center'>
                        <ul className='flex gap-1'>
                    {
                       links.map(link => (
                            <NavLink key={link.name} to={link.to} className={`font-semiboldtransform transition-colors delay-100 ease-in-out cursor-pointer w-34 p-3 rounded-lg flex items-center gap-2 text-white/80 ${
                                ({isActive}) => isActive ?('active') : ('inactive')
                            }`}>
                                {link.icon}{link.name}
                            </NavLink>
                        ))
                    }
                </ul>

                <div>
                    <Link to='/login' className='bg-omni-navy/90 dark:bg-omni-accent text-white font-semibold hover:bg-omni-navy dark:hover:bg-omni-accent/90 transform transition-colors delay-100 ease-in-out cursor-pointer w-34 border-0 rounded-lg p-3 flex items-center justify-center gap-2'> <LogIn /> Login </Link>
                </div>
                        </div>
                    )
                }

            {/* Sider Bar BTN */}

            {
                isAuth? 
                (
                    <div>
                    {user?.image ?
                    <img src={user?.image} className='h-12 w-12 rounded-full flex items-center justify-center object-contain' />
                    :
                    <div className='border h-12 w-12 rounded-full flex items-center justify-center dark:border-omni-light dark:text-omni-light'>
                        <h1 className='uppercase font-semibold text-2xl'>{user?.first_name.charAt(0)}</h1>
                    </div>
                    }
                    </div>
                ) : 

            <div className='lg:hidden'>
                <button
                    className='border-2 border-omni-light text-omni-light rounded-lg h-10 w-10 transform transition-transform duration-300 cursor-pointer shadow-lg flex items-center justify-center'
                    onClick={() => {
                    setIsOpen(prev => !prev)
                }}>
                    {
                        isOpen? <X /> : <Menu />
                    }
                </button>
            </div>
            }

            </div>

    </header>


    {/* Side Bar */}

    {
        !isAuth && (
            
        isOpen && (
            <aside className={`lg:hidden top-20 bg-omni-accent dark:bg-omni-navy h-full w-60 fixed transform transition-transform duration-500 ease-in-out z-10 ${isOpen? 'translate-x-0' : '-translate-x-full' }`}>
        <div className='flex flex-col h-[88vh]'>
            <ul className='flex flex-col gap-3 p-5'>
                {
                    links.map(link => (
                        <NavLink  key={link.name} to={link.to}
                        className={`dark:text-white font-semibold hover:bg-gray-50/50 hover:text-omni-navy transform transition-colors delay-100 ease-in-out cursor-pointer w-34 p-3 rounded-lg flex items-center gap-2 ${({isActive}) =>
                            isActive&& ('active')
                        }`}
                        >
                          {link.icon}  {link.name}
                        </NavLink>
                    ))
                }
            </ul>

            <div className='p-5'>
                <Link to='/login' className='bg-omni-navy dark:bg-omni-accent text-white font-semibold hover:bg-omni-navy/90 dark:hover:bg-omni-accent/90 transform transition-colors delay-100 ease-in-out cursor-pointer w-34 border-0 rounded-lg p-3 flex items-center justify-center gap-2'>
                  <LogIn />  Login
                </Link>
            </div>

        </div>


    </aside>
        )
        )
    }

    {/* Portal SideBar

    {isAuth && (
    <div
        className={`fixed top- left-0 h-screen z-40 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
        }`}
    >
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} logout={handleLogout} user={user} />
    </div>
    )} */}

    </>
  )
}

export default NavBar