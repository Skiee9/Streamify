import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import NotificationsPage from './pages/NotificationsPage'
import SignUpPage from './pages/SignUpPage'

const App = () => {
  return (
    <div className='bg-red-500 h-screen' data-theme="coffee">
  
<Routes>
<Route path="/" element={<HomePage/>} />
<Route path="/chat" element={<ChatPage/>} />
<Route path="/call" element={<CallPage/>} />
<Route path="/notifications" element={<NotificationsPage/>} />
<Routes path="/signup" element={<SignUpPage/>}/>

</Routes>
    </div>
  )
}

export default App
