"use client"

import { userSignOut } from '@/lib/actions/userActions';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
let socket=io(process.env.NEXT_PUBLIC_SOCKET_URL);
console.log(process.env.NEXT_PUBLIC_SOCKET_URL);
console.log("kdhb")
const Page = () => {
  const [room,setRoom] = useState("");
  const [message,setMessage]=useState("");
  // console.log("1");
  function send(){
      socket.emit("message",{message:message,room:room})
  }
  function join(){
    socket.emit("join_room",{room:room})
  }
  useEffect(()=>{
    socket.on("message",(data)=>{
      console.log(data);
  })  
  socket.on("connect",()=>{
    console.log("Connected");
}) })
  return (
    <div>dashboard page <br />
    <button onClick={(e)=>{
      userSignOut()
    }}>signout</button>

    <input type="text"  placeholder='room' onChange={(e)=>{
      setRoom(e.target.value)
    }}/>
    <input type="text" placeholder='message' onChange={(e)=>{
      setMessage(e.target.value)
    }}/>
    <button onClick={join}>join</button>
    <button onClick={send}>send</button>

    </div>
  )
}

export default Page