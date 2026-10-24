import { useState } from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Footer from './Footer';
import NavBar from './NavBar';
import { useAuth } from '../context/AuthContext';
import SideBar from './SideBar';

const AppLayout = () => {
     const [isOpen, setIsOpen] = useState(false);
     const { isAuth } = useAuth()
  return (
    <div className='min-h-screen bg-omni-light dark:bg-omni-navy'>

            <header>
            {/* <Header /> */}
            <NavBar />
            <aside>
                {isAuth && (
                <div
                    className={`fixed top-20 left-0 h-screen z-40 transition-all duration-300 ease-in-out delay-150 ${
                    isOpen ? 'w-64' : 'w-20'
                    }`}
                >
                    <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                )}
            </aside>
        </header>
   
        <div className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isAuth ? (isOpen ? 'pl-[10em]' : 'pl-[5em]') : 'pl-0'}`}>
           
        <main>
            <ToastContainer />
            <div className="min-h-[70vh] lg:min-h-[80vh] max-h-[100%] mt-[5em]">
                <Outlet />
            </div>
        </main>

        <footer>
            <Footer />
        </footer>
        </div>

    </div>
  )
}

export default AppLayout