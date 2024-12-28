import React from 'react'
import ResetPassword from './ResetPassword'
import { auth } from '@/auth'
import { redirect} from 'next/navigation';

const page =async  () => {
    const session = await auth();
    const email=session?.user?.email
    console.log(session)
    if(email){
        return (

            <ResetPassword email={email}/>
        )
    }
    else{
        redirect('/user/signin')
    }

}

export default page