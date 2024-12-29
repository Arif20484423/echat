"use client"
import { auth } from '@/auth'
import { userSignOut } from '@/lib/actions/userActions';
import React from 'react'

const Page = () => {
  
  return (
    <div>dashboard page <br />
    <button onClick={(e)=>{
      userSignOut()
    }}>signout</button>
    </div>
  )
}

export default Page