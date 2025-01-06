"use client"
import { Context } from '@/app/_context/NoteContext'
import { addMessage } from '@/lib/actions/chatActions'
import React, { useContext , useEffect, useState} from 'react'
var cryptojs= require("crypto-js")
const Chat = () => {
    const {toUser,user,messageNotification,setMessageNotification,socket} = useContext(Context)
    const [message,setMessage]= useState("");
    const [messages,setMessages]= useState([]);
    useEffect(()=>{
        
        if(toUser ){
            
            fetch("/api/getmessages",{
                method:"POST",
                body:JSON.stringify({channelid:toUser.channelid})
            }).then(d=>d.json()).then(d=>{
                setMessages(d.data)
            })
        }
        
    },[messageNotification,toUser]);
    useEffect(()=>{ 
        if(!toUser){
            alert("mesage")
            // refetch contacts
        }
        if(messageNotification && messageNotification.from){
            if(messageNotification.from!==toUser.id){
                alert("mesage")
                // refetch contacts
            }
            else{
                alert("same")
                
            }
        }

    },[messageNotification])
  return (
    <div><p>Chat</p>
    <p>{toUser && toUser.email}</p>
    <input type="text" onChange={(e)=>{
        setMessage(e.target.value)
    }}/>
    <button onClick={async ()=>{
        await addMessage(toUser.channelid,user.id,message)
        socket.emit("message",{to:toUser.id,message:message})
        setMessageNotification(message)
    }}>send</button>


    {
        messages.map((e)=>{
            const bytes=cryptojs.AES.decrypt(e.message,process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY);
            const decryptedMessage=bytes.toString(cryptojs.enc.Utf8)
            return (
                <div key={e._id}>
                    <p>{e.user.email}</p>
                    <p>{decryptedMessage}</p>
                    <br />
                </div>
            )
        })
    }
    </div>
  )
}

export default Chat