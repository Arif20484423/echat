'use client'
import React from 'react'
import { useState } from 'react'
import Signup from "./_Components/Signup"
import Otp from "./_Components/Otp"
import Password from "./_Components/Password"
const Page = () => {
  const [step,setStep]=useState(1);
  const [email,setEmail]=useState("");
  function next(){
    setStep((s)=>s+1);
  }
  return (
    <div>
      {step===1 && (
        <Signup  next={next} setEmail={setEmail}/>
      )}
      {step===2 && (
        <Otp next={next} email={email}/>
      )}
      {step===3 && (
        <Password  email={email} />
      )}
    </div>
    
  )
}

export default Page