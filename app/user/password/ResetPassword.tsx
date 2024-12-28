"use client"
import React from 'react'
import { userResetPassword } from '@/lib/actions/userActions'
import { Response } from '@/lib/actions/userActions'
import { useFormState } from 'react-dom'
const ResetPassword = ({email}:{email:string}) => {
    let initialState:Response={message:null}
    const [status,formAction]=useFormState(userResetPassword,initialState)
  return (
    <form action={formAction}>
        {status?.message}
        <input type="hidden" name='email' value={email}/>
        <label htmlFor="currentpassword">Current Password</label>
        <input type="text" name='currentpassword' id='currentpassword'/>
        <label htmlFor="password">Password</label>
        <input type="text" name='password' id='password'/>
        <button type='submit'>submit</button>
    </form>
  )
}

export default ResetPassword