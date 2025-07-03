"use client"
import { Context } from '@/app/_context/NoteContext';
import { forwardMessage } from '@/lib/actions/chatActions';
import React, { useContext, useEffect, useState } from 'react'

const Forward = ({selectedmsg,setForward}) => {
    const {user, toUser}= useContext(Context);
    const [tousers,setToUsers]= useState([]);
    const [contacts,setContacts]= useState(null);
    // console.log(selectedmsg)
useEffect(()=>{
    fetch('/api/connectedcontacts').then((d)=>d.json()).then((d)=>setContacts(d.data));
},[])
  return (
    <div>
        {contacts && contacts.map((e)=>{
            return <div key={e._id} onClick={()=>{
                setToUsers((u)=>[...u,{user:e.connections[0].user._id,channel:e.channelid}])
            }}>
                {e.isgroup?(<>{e.group[0].groupname}</>):(<>{e.connections[0].user.email}</>)}
            </div>
        })}
        <button onClick={()=>{
            // console.log(tousers)
            forwardMessage(selectedmsg,tousers,user.id)
            setForward((f)=>!f)
        }}>send</button>
    </div>
  )
}

export default Forward