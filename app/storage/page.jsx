"use client"
import React, { useContext, useEffect } from 'react'
import { Context } from '../_context/NoteContext';

const Page = () => {
    const {user}= useContext(Context)
    const [folder,setFolder]= useState([]);
    useEffect(()=>{
        fetch("/api/getrootfolder",{
            method:"POST",
            body:JSON.stringify({user:user.id})
        }).then((d)=>d.json()).then((d)=>console.log(d.data))
        // fetch("/api/")
    },[])
  return (
    <div>page</div>
  )
}

export default page