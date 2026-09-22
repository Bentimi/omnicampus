import React from 'react'
import LandingPageRoutes from './routes/LandingPageRoutes'
import { AuthProvider } from './context/AuthContext'


const App = () => {
  return (
    // <>
    <AuthProvider>
      <LandingPageRoutes />
    </AuthProvider>
    // {/* </> */}
  )
}

export default App