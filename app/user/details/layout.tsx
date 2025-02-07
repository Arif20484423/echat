import SetUser from '@/app/_Components/SetUser';
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const Layout = async ({children}:{children:React.ReactNode}) => {
    const session = await auth();
    if(session==null){
        redirect('/user/signin')
    }
  return (
    <><SetUser/>{children}</>
  )
}

export default Layout