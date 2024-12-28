'use client'
import React from 'react'
import { useState } from 'react'
import Mail from './Mail'
import Verify from './Verify'
import SetPassword from './SetPassword'
const page = () => {
  const [step,setStep]=useState(1);
  const [email,setEmail]=useState("");
  console.log(email)
  return (
    <div>
      {step===1 && (
        <Mail step={step} setStep={setStep} setEmail={setEmail}/>
      )}
      {step===2 && (
        <Verify step={step} setStep={setStep} email={email}/>
      )}
      {step===3 && (
        <SetPassword email={email} />
      )}
    </div>
    
  )
}

export default page