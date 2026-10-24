import React from 'react'
import { Mail, Phone, MapPin, FaceNeutral, User, Smartphone, Captions } from 'lucide-react'
import { Link } from 'react-router'

const ContactUs = ({id}) => {
    const links = [
        {name : 'email', logo : <Mail />, title : 'support@omnicampus.com', url: 'mailto:'},
        {name : 'phone', logo : <Phone />, title : '+234 807 1446 378', url: 'tel: +2348071446378'},
        {name : 'location', logo : <MapPin />, title : 'Somewhere in the World', url: '#'},
        {name : 'social', title : 'Social Profiles', profiles: [
            { logo: <FaceNeutral />, url: '' },
            { logo: <FaceNeutral />, url: '' },
            { logo: <FaceNeutral />, url: '' }
        ]}
    ]
  return (
    <div id={id} className='dark:bg-omni-navy bg-omni-light/10 h-full px-10 pb-7 scroll-mt-15'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-6 dark:text-omni-light'>
            <h1 className='text-bold text-xl'>Contact Us</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores obcaecati, enim molestias fugit nobis, excepturi minus, repellendus consequuntur assumenda voluptate nisi pariatur facilis possimus itaque necessitatibus temporibus recusandae repellat illum!
            </p>
        </div>
        <div className='shadow-lg p-8  bg-white grid grid-cols-1 md:grid-cols-[3fr_1fr] lg:grid-cols-[2.5fr_1fr] gap-8 rounded-lg'>
            <div className=''>
               <form action="" className='flex flex-col justify-center gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="first_name" className='label'>First Name </label>
                        <div className='input-border'>
                            <span className='input-container'>
                                <User size={18} />
                                <input id='first_name' name='first_name' type="text" placeholder='Enter First Name' className='off-input w-full' />
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="last_name" className='label'>Last Name </label>
                        <div className='input-border'>
                            <span className='input-container'>
                                <User size={18} />
                                <input id='last_name' name='last_name' type="text" placeholder='Enter Last Name' className='off-input w-full' />
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='label'>Email </label>
                        <div className='input-border'>
                            <span className='input-container'>
                                <Mail size={18} />
                                <input id='email' name='email' type="email" placeholder='Enter your Email' className='off-input w-full' />
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="phone" className='label'>Phone </label>
                        <div className='input-border'>
                            <span className='input-container'>
                                <Smartphone size={18} />
                                <input id='phone' name='phone' type="number" placeholder='Phone Number' className=' off-input w-full' />
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col col-span-full gap-1'>
                        <label htmlFor="subject" className='label'>Subject </label>
                        <div className='input-border'>
                            <span className="input-container">
                                <Captions size={18} />
                                <input id='subject' name='subject' type="text" placeholder='Enter Subject' className='off-input w-full' />
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col col-span-full gap-1'>
                        <label htmlFor="message" className='label'>Message </label>
                        <textarea name="message" id="message" rows="5" className='border-2 border-gray-300 p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-3 focus:ring-omni-accent/20 dark:focus:ring-omni-navy/20 focus:border-omni-accent dark:focus:border-omni-navy w-full' placeholder='Enter your Message here...'></textarea>
                    </div>

                    </div>
                    <div className='flex justify-center'>
                        <button className='bg-omni-accent w-full md:w-full lg:w-1/3 h-14 text-omni-light text-semibold cursor-pointer rounded-lg transition-colors duration-200 hover:bg-omni-accent/95 p-2 dark:bg-omni-navy dark:hover:bg-omni-navy/85'>Send your Message</button>
                    </div>
               </form>
            </div>


            <div className='flex flex-col gap-6 justify-center items-center'>
               {
                links.map((link, index) => {
                    if (link.name === 'social') {
                        return (
                            <div key={index} className='flex flex-col gap-3 justify-center items-center bg-omni-light/10 h-26 w-60 p-4 border-2 border-omni-light rounded-lg'>
                                <div className='flex gap-2'>
                                    {
                                    link.profiles.map((profile, idk) => (
                                        <a href={profile.url} key={idk} className='p-2 rounded-lg bg-omni-light'>
                                            {profile.logo}
                                        </a>
                                    ))
                                }
                                </div>
                                <span>{link.title}</span>
                            </div>
                        )
                    } 
                    
                    return (
                       <div key={index}>
                             <a href={link.url} className='flex justify-center flex-col items-center bg-omni-light/10 h-26 w-60 p-4 border-2 border-omni-light rounded-lg gap-2'>
                            <span className='bg-omni-light p-2 rounded-lg'>{link.logo}</span>
                            <span>{link.title}</span>
                        </a>
                       </div>
                    )
                }
            )
               }

            </div>
        </div>
     </div>
  )
}

export default ContactUs