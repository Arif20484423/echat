"use client"

import { Context } from '@/app/_context/NoteContext';
import React, { useContext, useEffect, useState } from 'react'

const Connected = ({showConnected}) => {
    const [connected,setConnected]=useState([]);
    
    const {setToUser} = useContext(Context)
    useEffect(()=>{
      fetch("/api/connectedcontacts").then(d=>d.json()).then((d)=>{
        // console.log(d.data)
        setConnected(d.data)
      });
    },[])
  return (
    <div>
      {connected.map((e,i)=>{
        const key=e.connections[0].user._id || i
        return  <p key={key} onClick={()=>{
          setToUser({id:e.connections[0].user._id,email:e.connections[0].user.email,channelid:e.connections[0].channelid})
        }}>{e.connections[0].user.email}</p>
        
      })}
    </div>
  )
}

export default Connected