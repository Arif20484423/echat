"use client"
import { auth } from '@/auth'
import { userSignOut } from '@/lib/actions/userActions';
import React from 'react'

const page = () => {
  
  return (
    <div>dashboard page <br />
    <button onClick={(e)=>{
      userSignOut()
    }}>signout</button>
    </div>
  )
}

export default page