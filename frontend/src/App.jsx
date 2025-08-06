import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import NotificationsPage from './pages/NotificationsPage'
import SignUpPage from './pages/SignUpPage'
import OnboardingPage from './pages/OnboardingPage'
import LoginPage from './pages/LoginPage'
import toast, { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className='bg-red-500 h-screen' data-theme="coffee">
  <button onClick={()=> toast.success('Hello lady!')}>Click me</button>
<Routes>
<Route path="/" element={<HomePage/>} />
<Route path="/login" element={<LoginPage/>}/>
<Route path="/chat" element={<ChatPage/>} />
<Route path="/call" element={<CallPage/>} />
<Route path="/notifications" element={<NotificationsPage/>} />
<Route path="/signup" element={<SignUpPage/>} />
<Route path="/onboarding" element={<OnboardingPage/>}/>

</Routes>

<Toaster/>
    </div>
  )
}

export default App
