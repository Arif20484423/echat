"use client"
import { Context } from '@/app/_context/NoteContext'
import React, { useContext , useEffect, useState} from 'react'

const Chat = () => {
    const {toUser} = useContext(Context)
    const [message,setMessage]= useState("");
    
    
  return (
    <div><p>Chat</p>
    <p>{toUser && toUser.email}</p>
    <input type="text" onChange={(e)=>{
        setMessage(e.target.value)
    }}/>
    <button>send</button>
    </div>
  )
}

export default Chat