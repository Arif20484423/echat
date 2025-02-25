"use client"
import React,{useEffect} from 'react'
import { useContext } from 'react';
import {Context} from '../_context/NoteContext'

const SetUser = () => {
    const {setUser,user}= useContext(Context)
    useEffect(()=>{
        fetch("/api/user").then(d=>d.json()).then(d=>{
            setUser(()=>({id:d.user._id,email:d.user.email,name:d.user.name,image:d.user.image,description:d.user.description}))
            
        });
      },[])
      return <></>;
}

export default SetUser