import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const layout =async  ({children}:{children:React.ReactNode}) => {
  const session=await auth()
  if(session){
    redirect('/dashboard')
  }
  return (
    <>{children}</>
  )
}

export default layout