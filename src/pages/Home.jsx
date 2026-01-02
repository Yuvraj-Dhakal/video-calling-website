import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  let navigate=useNavigate()
  let [input,setInput]=useState("")
  function handlejoin(){
    navigate(`/room/${input}`)
  }
  return (
    <div id="home">
      <input type="text" placeholder='Enter Room ID' value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button onClick={handlejoin}>Join Room</button>
    </div>
  )
}

export default Home




