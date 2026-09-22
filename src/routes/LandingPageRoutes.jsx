import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage';
import AppLayout from '../components/AppLayout';
import Blog from '../components/Blog';
import ContactUs from '../components/ContactUs';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import SignUpPage from '../pages/SignUpPage';
import ForgetPassword from '../pages/ForgetPassword';
import Dashboard from '../pages/general/Dashboard';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import ProtectedRoutes from '../context/ProtectedRoutes';
import ProfilePage from '../pages/general/ProfilePage';


const queryClient = new QueryClient();


const LandingPageRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/unauthorized' element={<UnauthorizedPage />} />
        <Route path='*' element={<NotFoundPage />} />

      {/* General */}
        <Route 
          path='/user/dashboard' 
          element={
            <ProtectedRoutes allowedRoles={['admin', 'user']}>
              <Dashboard />
            </ProtectedRoutes>
          } />

        <Route
          path='/user/profile'
          element={
            <ProtectedRoutes allowedRoles={['user', 'student', 'principal', 'staff', 'admin', 'aspirant']}>
              <ProfilePage />
            </ProtectedRoutes>
          }
        />

        

        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default LandingPageRoutes