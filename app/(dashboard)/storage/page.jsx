"use client"

import { Context } from '@/app/_context/NoteContext'
import React, { useContext, useEffect, useState } from 'react'

const Page = () => {
  const {user}= useContext(Context)
  const [location , setLocation ]= useState([]);
  useEffect(()=>{
    if(user){
      fetch("/api/getrootfolder",{
        method:"POST",
        body:JSON.stringify({user:user.id})
      }).then(d=>d.json()).then((d)=>{
        console.log(d);
        setLocation((l)=>[...l,d.data._id])
        console.log(location)
      })
    }
    return ()=>{
      console.log("Owuvdy")
      setLocation((l)=>[])
    }
  },[user])

  return (
    <div>page {location.map((e)=>{
      return (
        <>{e}</>
      )
    })}</div>
  )
}

export default Page