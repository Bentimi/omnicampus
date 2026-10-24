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
import ChangePassword from '../pages/general/ChangePassword';
import Settings from '../pages/general/Settings';
import EditProfilePage from '../pages/general/EditProfilePage';
import SessionPage from '../pages/admin/SessionPage';
import AddUser from '../pages/admin/AddUser';
import UsersPage from '../pages/admin/UsersPage';
import ResetPassword from '../pages/ResetPassword';


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
        <Route path='/user/reset-password' element={<ResetPassword />} />
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
        <Route
          path='/user/change-password'
          element={
            <ProtectedRoutes allowedRoles={['user', 'student', 'principal', 'staff', 'admin', 'aspirant']}>
              <ChangePassword />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/user/settings'
          element={
            <ProtectedRoutes allowedRoles={['user', 'student', 'principal', 'staff', 'admin', 'aspirant']}>
              <Settings />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/user/edit-profile'
          element={
            <ProtectedRoutes allowedRoles={['user', 'student', 'principal', 'staff', 'admin', 'aspirant']}>
              <EditProfilePage />
            </ProtectedRoutes>
          }
        />


        {/* Admin Routes */}

        <Route
          path='/session'
          element={
            <ProtectedRoutes allowedRoles={['admin']}>
              <SessionPage />
            </ProtectedRoutes>
          }
        />

        <Route
          path='/user/add-user'
          element={
            <ProtectedRoutes allowedRoles={['admin']}>
              <AddUser />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/users'
          element={
            <ProtectedRoutes allowedRoles={['admin']}>
              <UsersPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/user/profile/:id'
          element={
            <ProtectedRoutes allowedRoles={['admin']}>
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