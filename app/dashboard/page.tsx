"use client"

import { userSignOut } from '@/lib/actions/userActions';
import React, { useEffect, useState } from 'react'

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