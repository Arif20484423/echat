import React from 'react'
import {auth } from "@/auth"
import { redirect } from 'next/navigation';
import SetUser from "../_Components/SetUser"
import SetSocket from '../_Components/SetSocket';
const Layout =async   ({children}) => {

  const session = await auth();
  if(session==null){
    redirect("/user/signin")
  }
  else{
    console.log(session);
  
  }
   
  return (
    <>
    
    <SetUser/>
    <SetSocket/>
    {/* <p>{session.user?.email}</p> */}
    {children} </> 
  )
}

export default Layout