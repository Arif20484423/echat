'use client'
import React from 'react'
import { useState } from 'react'
import Signup from "./_Components/Signup"
import Otp from "./_Components/Otp"
import Password from "./_Components/Password"
const Page = () => {
  const [step,setStep]=useState(1);
  const [email,setEmail]=useState("");
  return (
    <div>
      {step===1 && (
        <Signup  step={step} setStep={setStep} setEmail={setEmail}/>
      )}
      {step===2 && (
        <Otp step={step} setStep={setStep} email={email}/>
      )}
      {step===3 && (
        <Password  email={email} />
      )}
    </div>
    
  )
}

export default Page