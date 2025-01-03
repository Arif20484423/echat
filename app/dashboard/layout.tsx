import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({children}:{children:React.ReactNode}) => {
  // checking push
    const session = await auth()
    if(session==null){
        redirect('/user/signin');
    }
    else{
      console.log(session)
    }
  return (
    <>{children}</>
  )
}

export default Layout