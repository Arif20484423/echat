"use client"
import { Context } from '@/app/_context/NoteContext';
import { createChannel } from '@/lib/actions/chatActions';
import React, { useContext, useEffect, useState } from 'react'

const SearchUser = ({setShowConnected}) => {
    const {setToUser,user} = useContext(Context)
    const [key,setKey]= useState("");
    const [users,setUsers]= useState([]);

    useEffect(()=>{
        fetch("/api/users",{
            method:"POST",
            body:JSON.stringify({key:key})
        }).then(d=>d.json()).then(d=>setUsers(d));
    },[key])
  return (
    <div>

        <p>SearchUser</p>
        <input type="text" onChange={(e)=>{
            setKey(()=>e.target.value);
        }}/>
        
        {users.map((e)=>{
            return <p key={e._id} onClick={async ()=>{
                // selecting touser  new user if needed else created channelid will be assisigned and chat will be opened
                const channelid=await createChannel(user.id,e._id)
                setToUser({id:e._id,email:e.email,channelid:channelid})                
                setShowConnected(()=>1)
            }}>{e.email}</p>
        })}

    </div>
  )
}

export default SearchUser