import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import VideoRoom from './pages/VideoRoom.jsx'
function App() {
  return (
   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/room/:roomID' element={<VideoRoom/>}/>
   </Routes>
  )
}

export default App;
