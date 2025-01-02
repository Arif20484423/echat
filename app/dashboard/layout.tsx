import React, { useEffect } from 'react'
import {auth } from "@/auth"
import { redirect } from 'next/navigation';
const Layout =async   ({children}:{children:React.ReactNode}) => {

  const session = await auth();
  if(session==null){
    redirect("/user/signin")
  }
   
  return (
    <>{children}</> 
  )
}

export default Layout