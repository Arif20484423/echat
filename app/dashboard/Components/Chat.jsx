"use client"
import { Context } from '@/app/_context/NoteContext'
import { addMessage } from '@/lib/actions/chatActions'
import React, { useContext , useEffect, useState} from 'react'

const Chat = () => {
    const {toUser,messageNotification,setMessageNotification,socket} = useContext(Context)
    const [message,setMessage]= useState("");
    const [messages,setMessages]= useState([]);
    useEffect(()=>{
        if(toUser){
            fetch("/api/getmessages",{
                method:"POST",
                body:JSON.stringify({channelid:toUser.channelid})
            }).then(d=>d.json()).then(d=>{
                // console.log(d.data); 
                setMessages(d.data)
            })
        }
        
    },[messageNotification,toUser]);
  return (
    <div><p>Chat</p>
    <p>{toUser && toUser.email}</p>
    <input type="text" onChange={(e)=>{
        setMessage(e.target.value)
    }}/>
    <button onClick={async ()=>{
        await addMessage(toUser.channelid,toUser.id,message)
        socket.emit("message",{to:toUser.id,message:message})
        setMessageNotification(message)
    }}>send</button>


    {
        messages.map((e)=>{
            return (
                <div key={e._id}>
                    <p>{e.user.email}</p>
                    <p>{e.message}</p>
                    <br />
                </div>
            )
        })
    }
    </div>
  )
}

export default Chat