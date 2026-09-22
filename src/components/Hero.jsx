import React from 'react'
import hero from '../assets/hero.png'
import { Link } from 'react-router'

const Hero = () => {
  const heroLinks = [
    {to : '#aboutus', name : 'About Us'},
    {to : '#contactus', name : 'ContactUs'}
  ]
  return (
    <div className='bg-omni-light dark:bg-omni-navy dark:text-omni-light h-screen'>
        <div className='relative h-full'>
          <img src={hero} className='object-cover w-ful h-[50vh]' />

          <div className='flex justify-center items-center gap-3 z-10'>
            {
              heroLinks.map((link, index) => (
                <a className='border-2 dark:border-omni-light bg-transparent dark:hover:bg-omni-accent hover:bg-omni-navy hover:text-omni-light h-12 w-46 flex justify-center items-center cursor-pointer font-semibold shadow-lg transform transition-colors duration-200 ease-in-out' href={link.to} key={index}>
                  {link.name}
                </a>
              ))
            }
          </div>

          <div className='absolute inset-0 bg-omni-navy/20 pointer-events-none'></div>
        </div>
    </div>
  )
}

export default Hero