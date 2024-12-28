"use client"
import React from 'react'
import { useFormState } from 'react-dom'
import { Response } from '@/lib/actions/userActions'
import { userVerifyOtp } from '@/lib/actions/userActions'
const Verify = ({step,setStep,email}:{step:number,setStep:Function,email:string}) => {
    const initialState:Response={message:null}
    const [status,formAction] = useFormState(userVerifyOtp,initialState)
    if(status?.success){
      setStep(step+1)
    }
  return (
    <form action={formAction}>
        {status?.message}
        <input type="hidden" name='email' value={email}/>
        <label htmlFor="otp">OTP</label>
        <input type="text" name='otp' id='otp'/>
        <button type='submit'>Verify</button>
    </form>
  )
}

export default Verify