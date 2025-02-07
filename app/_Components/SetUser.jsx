"use client"
import React,{useEffect} from 'react'
import { useContext } from 'react';
import {Context} from '../_context/NoteContext'

const SetUser = () => {
    const {setUser}= useContext(Context)
    useEffect(()=>{
        fetch("/api/userlogged").then(d=>d.json()).then(d=>{
            setUser({id:d.id,email:d.email})
        });
      },[])
      return <></>;
}

export default SetUser