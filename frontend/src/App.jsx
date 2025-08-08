import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import NotificationsPage from './pages/NotificationsPage'
import SignUpPage from './pages/SignUpPage'
import OnboardingPage from './pages/OnboardingPage'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios.js' 

const App = () => {
  //tanstack query
const {data:authData, isLoading,error}= useQuery({
  queryKey:["authUser"],
  queryFn: async () => {
    const response = await axiosInstance.get("/auth/me")
    return res.data
  },
  retry: false, // Disable retry on failure
})

const authUser = authData?.user || null;
 






return (
    <div className='h-screen ' data-theme="coffee">

<Routes>
<Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
<Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>} />
<Route path="/login" element={!authUser ? <LoginPage/>: <Navigate to="/"/>}/>
<Route path="/notifications" element={authUser ? <NotificationsPage/> : <Navigate to="/login"/>} />
<Route path="/chat" element={ authUser ? <ChatPage/>: <Navigate to="/login"/>} />
<Route path="/call" element={authUser ? <CallPage/> : <Navigate to="/login"/>} />
<Route path="/onboarding" element={ authUser ? <OnboardingPage/> : <Navigate to="/login"/>}/>

</Routes>





 {/* for toast notifications */}
<Toaster/>
    </div>
  )
}

export default App
