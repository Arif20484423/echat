'use client'
import React from 'react'
import { userSetPassword } from '@/lib/actions/userActions'
import { useFormState } from 'react-dom'
import { Response } from '@/lib/actions/userActions'
import { useRouter } from 'next/navigation'
const SetPassword = ({email}:{email:string}) => {
    const router= useRouter()
    const initialState:Response={message:null}
    const [status,formAction]=useFormState(userSetPassword,initialState);
    if(status?.success){
        router.push('/dashboard');
    }
  return (
    <form action={formAction}>
        {status?.message}
        <input type="hidden" name='email' value={email}/>
        <label htmlFor="password">Password</label>
        <input type="text" name='password' id='password'/>
        <label htmlFor="passwordcheck">Retype Password</label>
        <input type="text" name='passwordcheck' id='passwordcheck'/>
        <button type='submit'>submit</button>
    </form>
  )
}

export default SetPassword