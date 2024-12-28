"use client"
import React from 'react'
import { userEmailOtp } from '@/lib/actions/userActions'
import { useFormState } from 'react-dom'
import { ResponseType } from '@/lib/actions/userActions'
const Mail = ({step,setStep,setEmail}:{step:number,setStep:Function,setEmail:Function}) => {
    const initialState:ResponseType={message:null,errors:{},success:false}
  const [state,formAction] = useFormState(userEmailOtp,initialState);
  if(state?.success){
    setStep(step+1);
  }
  return (
    <form action={formAction}>
      {state?.message}
      <label htmlFor="email">Email</label>
      <input type="text" name='email' id='email'  onChange={(e)=>{
        setEmail(e.target.value)
      }}/>
      <button type='submit'>Send Otp</button>
    </form>
  )
}

export default Mail