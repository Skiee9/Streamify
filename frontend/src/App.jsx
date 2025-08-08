import React from 'react'
import { Routes, Route } from 'react-router'
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
const {data}= useQuery

 






return (
    <div className='h-screen ' data-theme="coffee">

<Routes>
<Route path="/" element={<HomePage/>} />
<Route path="/login" element={<LoginPage/>}/>
<Route path="/chat" element={<ChatPage/>} />
<Route path="/call" element={<CallPage/>} />
<Route path="/notifications" element={<NotificationsPage/>} />
<Route path="/signup" element={<SignUpPage/>} />
<Route path="/onboarding" element={<OnboardingPage/>}/>

</Routes>





 {/* for toast notifications */}
<Toaster/>
    </div>
  )
}

export default App
