'use client'
import React from 'react'
import { useState } from 'react'
import Signup from "./_Components/Signup"
import Otp from "./_Components/Otp"
import Password from "./_Components/Password"
import Verify from './Verify'
import SetPassword from './SetPassword'
const Page = () => {
  const [step,setStep]=useState(1);
  const [email,setEmail]=useState("");
  console.log(email)
  return (
    <div>
      {step===1 && (
        // <Mail step={step} setStep={setStep} setEmail={setEmail}/>
        <Signup/>
      )}
      {step===2 && (
        // <Verify step={step} setStep={setStep} email={email}/>
        <Otp/>
      )}
      {step===3 && (
        // <SetPassword email={email} />
        <Password/>
      )}
    </div>
    
  )
}

export default Page