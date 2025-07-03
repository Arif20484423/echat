"use client"
import React,{useEffect} from 'react'
import { useContext } from 'react';
import {Context} from '../_context/NoteContext'

const SetUser = () => {
    const {setUser,user}= useContext(Context)
    useEffect(()=>{
        fetch("/api/user").then(d=>d.json()).then(d=>{
            setUser(() => ({ ...d.user, id: d.user._id }));
            
        });
      },[])
      return <></>;
}

export default SetUser