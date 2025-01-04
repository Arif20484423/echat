"use client"
import { Context } from '@/app/_context/NoteContext';
import { createChannel } from '@/lib/actions/channelActions';
import React, { useContext, useEffect, useState } from 'react'

const SearchUser = ({setShowConnected}) => {
    const {setToUser,user} = useContext(Context)
    const [key,setKey]= useState("");
    const [users,setUsers]= useState([]);

    useEffect(()=>{
        fetch("/api/searchuser",{
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
                await createChannel(user.id,e._id)
                setToUser({id:e._id,email:e.email})                
                setShowConnected(t=>!t)
            }}>{e.email}</p>
        })}

    </div>
  )
}

export default SearchUser