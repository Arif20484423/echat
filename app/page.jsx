import { auth } from "@/auth"
import LandingPage from "./_Components/landingpage/LandingPage"
import React from 'react'

const page = async () => {
  const session = await auth();  
  return (
    <div>
      <LandingPage  logged={session?true:false}/>
    </div>
  )
}

export default page


