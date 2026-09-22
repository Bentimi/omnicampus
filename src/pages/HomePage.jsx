import React from 'react'
import Hero from '../components/Hero'
import Blog from '../components/Blog'
import ContactUs from '../components/ContactUs'

const HomePage = () => {
  return (
    <div className='mt-[5em]  h-full'>
    <Hero />
    <Blog id='aboutus'/>
    <ContactUs id='contactus' />
     </div>
    
  )
}

export default HomePage