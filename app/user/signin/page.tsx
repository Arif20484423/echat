"use client"
import React from 'react'
import { useFormState } from 'react-dom'
import { userSignIn, userSignInGithub, userSignInGoogle } from '@/lib/actions/userActions'

import { ResponseType } from '@/lib/actions/userActions'

const Page = () => {
  
  const initialState:ResponseType={message:null,errors:{}}
  const [state,formAction]=useFormState(userSignIn,initialState);
  
  return (
    <>
    <form action={formAction}>
        {state?.message}
        <label htmlFor="email">Email</label>
        <input type="text"  id='email' name='email'/>
        <label htmlFor="password">Password</label>
        <input type="text" id='password' name='password'/>
        <button type='submit'>Signin</button>
    </form>
    <button onClick={()=>{
      userSignInGoogle()

    }}>  Google</button>
    <button onClick={()=>{
      userSignInGithub()
    }}>  Github</button>
    </>
    
    
  )
}

export default Page