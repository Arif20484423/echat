"use client"
import { Context } from '@/app/_context/NoteContext';
import { createGroupChannel } from '@/lib/actions/chatActions';
import React, { useContext } from 'react'
import { useState,useEffect } from 'react'

const CreateGroup = ({setShowConnected}) => {
    const {setToUser,user} = useContext(Context)
    const [users,setUsers]= useState([]);
    const [groupMembers,setGroupMember]= useState([])
    const [key,setKey]= useState("");
    const [name,setName]= useState("");
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
                setGroupMember([...groupMembers,e._id]);
            }}>{e.email}</p>
        })}

        <input type="text" onChange={(e)=>{
            setName(e.target.value)
        }} />
        <button onClick={async ()=>{
            console.log(groupMembers)
            const channel=await createGroupChannel(user.id,groupMembers,name)
            setToUser({isgroup:true,channelid:channel,email:name})
            setShowConnected(1)
        }}>create group</button>
  </div>
  )
}

export default CreateGroup