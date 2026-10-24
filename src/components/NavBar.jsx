import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router';
import logo from "../assets/logo.png";
import { 
    X, Menu, Home, User, Rss, LogIn, LogOut,
    MonitorCog, Sun, Moon,
    Gauge,
    Settings,
    Book,
    BookOpen,
    Info
  } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SideBar from './SideBar';
import { div } from 'motion/react-client';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme');
    });

    const { isAuth, logout, user } = useAuth()

    useEffect(() => {
        const root = document.documentElement;

        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (theme === 'light') {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            // root.classList.toggle('dark', systemDark);
            // localStorage.setItem('theme', 'system');
        } else if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        //  else if (theme === 'system') {
        //     if (systemDark) {
        //         root.classList.add('dark');
        //     } else {
        //         root.classList.remove('dark');
        //     }
        // }
        }, [theme]);

    // useEffect(() => {
    //     document.body.style.overflow = isOpen? 'hidden' : 'auto';
    //     const overlay = document.getElementById('overlay');
    //     if (isOpen) {
    //         overlay.classList.add('over-flow-hidden')
    //         overlay.classList.add('block')
    //     } else {
    //         overlay.classList.add('hidden')
    //         overlay.classList.remove('block')
    //         overlay.classList.remove('over-flow-hidden')
    //     }
        
    // }, [isOpen])


    const links = [
        { name: "Home", to: "/", icon: <Home/> },
        { name: "Blog", to: "/blog", icon: <Rss /> },
        { name: "AboutUs", to: "/about", icon: <Info /> },
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
    
    <header className='bg-omni-accent dark:bg-omni-navy w-full fixed h-[5em] top-0 z-30 flex items-center justify-between px-4'>

            <div className='min-h-[4em] max-h-full flex items-center justify-center pt-2'>
                <img src={logo}alt="logo-img" loading='lazy' className='h-30' />
            </div>

            <div>
                <button onClick={() => {
                    if (theme === 'dark') {
                         setTheme('light');
                    } else if (theme === 'light') {
                         setTheme('dark');
                    } else {
                         setTheme('light');
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
                            <NavLink key={link.name} to={link.to} className={`transform cursor-pointer w-34 p-3 rounded-lg flex items-center gap-2 text-white/80 hover:bg-white/10 font-semibold delay-100 duration-300 transition-colors ease-in-out ${
                                ({isActive}) => isActive ? ('active') : ('inactive')
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
                    className='border-2 border-omni-light text-omni-light rounded-lg h-10 w-10 transform transition-all delay-150 duration-700 cursor-pointer shadow-lg flex items-center justify-center'
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
            
        isOpen && (
            <aside className={`lg:hidden top-20 bg-omni-accent dark:bg-omni-navy h-full w-60 fixed z-30 transition-transform duration-700 delay-500 ease-in-ou ${isOpen? 'translate-x-0' : '-translate-x-full' }`}>
        <div className='flex flex-col h-[88vh]'>
            <ul className='flex flex-col gap-3 p-5'>
                {
                    links.map(link => (
                        <NavLink  key={link.name} to={link.to}
                        onClick={() => setIsOpen(false)}
                        className={`ease-in-out cursor-pointer w-34 p-3 rounded-lg flex items-center gap-2  text-white/80 hover:bg-white/10 font-semibold delay-100 duration-300 transition-colors ease-in-out${({isActive}) =>
                            isActive&& ('active')
                        }`}
                        >
                          {link.icon}  {link.name}
                        </NavLink>
                    ))
                }
            </ul>

            <div className='p-5'>
                <Link to='/login'
                onClick={() => setIsOpen(false)}
                className='bg-omni-navy dark:bg-omni-accent text-white font-semibold hover:bg-omni-navy/90 dark:hover:bg-omni-accent/90 transform transition-colors delay-100 ease-in-out cursor-pointer w-34 border-0 rounded-lg p-3 flex items-center justify-center gap-2'>
                  <LogIn />  Login
                </Link>
            </div>

        </div>
        

    </aside>
        )
    }
    <div id='overlay' 
    className={`fixed z-20 inset-0 bg-black/50 transition-all transform ease-in-out duration-1000 delay-500 ${
        isOpen ? 'overflow-hidden' : 'hidden'
    } lg:hidden`}
    onClick={() => setIsOpen(false)}
    ></div>


    </>
  )
}

export default NavBar