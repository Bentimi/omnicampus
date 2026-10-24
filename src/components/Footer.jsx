import React from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router';
import { Home, Rss, User, Copyright, Mail, Phone, MapPin, LogIn, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
    const contactLinks = [
            { name: "Email", to: "bentimi02@gmail.com", icon: <Mail /> },
            { name: "Phone", to: "+234 807 144 6378", icon: <Phone /> },
            { name: "Location", to: "Somewhere in the World", icon: <MapPin /> }
        ]

    const socialLinks = [
            { name: "Instagram", to: "/", icon: <Home /> },
            { name: "Facebook", to: "/blog", icon: <Rss /> },
            { name: "Twitter", to: "/contactus", icon: <User /> },
            { name: "LinkedIn", to: "/contactus", icon: <User /> }
        ]
        
    const quickLinks = [
            { name: "Home", to: "/", icon: <Home /> },
            { name: "Blog", to: "/blog", icon: <Rss /> },
            { name: "AboutUs", to: "/aboutus", icon: <Info /> },
            { name: "ContactUs", to: "/contactus", icon: <User /> },
            { name: "Login", to: "/login", icon: <LogIn /> }
        ]

    const date = new Date();
    const getYear = date.getFullYear();

    const { isAuth } = useAuth();
  return (
    <>
        {
            !isAuth && (
                <div>
                    <div className='min-h-[4.5em] bg-omni-accent dark:bg-omni-navy flex flex-col md:flex-row justify-start md:justify-between md:items-center px-4 lg:px-16 gap-8 md:gap-1 lg:gap-0 pb-3 pt-5 text-omni-light'>
           
           <div>
             <img src={logo} alt="omnicampus-logo" className='h-[12em]'/>
             <div>
                <ul className='flex flex-col gap-4'>
                    {
                    contactLinks.map(link => (
                        <div key={link.name} className='flex gap-2 items-center font-semibold dark:text-omni-light px-3'>{link.icon}{link.to}</div>
                    ))
                }
                </ul>
             </div>
           </div>
            
            <div className='flex flex-col md:flex-row gap-5'>
                <nav>
                    <h1 className='font-semibold dark:text-omni-light text-center'>Qiuck Links</h1>
                    <ul className='grid grid-cols-2 gap-1 p-1'>
                {
                    quickLinks.map(link => (
                        <Link key={link.name} to={link.to} className='flex gap-2 items-center hover:text-white transform transition-colors delay-100 duration-300 ease-in-out cursor-pointer w-34 p-3 rounded-lg font-semibold hover:bg-white/10 dark:text-omni-light'>{link.icon}{link.name}</Link>
                    ))
                }
            </ul>
                </nav>

                <div className='flex flex-col gap-3'>
                    <h1 className='font-semibold dark:text-omni-light'>Social Profiles</h1>
                    <ul className='flex gap-2'>
                    {
                    socialLinks.map(link => (
                        <Link key={link.name} to={link.to} className='flex gap-2 items-center text-white transform transition-colors delay-100 duration-700 ease-in-out cursor-pointer p-3 rounded-lg font-semibold hover:bg-white/10 dark:text-omni-light border-2 dark:border-omni-light'>{link.icon}</Link>
                    ))
                }
                </ul>
                </div>
            </div>
        </div>

         <div className='min-h-[4.5em] bg-omni-accent dark:bg-omni-navy'>
        <div className='px-8 py-4'>
             <hr className='border-omni-light' />
        </div>
            <h2 className='flex items-center justify-center px-4 h-[4em] text-omni-light gap-2 font-semibold text-[1em]'>
                <Copyright /> {getYear} Big-B. All rights reserved.
            </h2>
         </div>
                </div>
            )
        }
    </>
  )
}

export default Footer