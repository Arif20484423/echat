import React from 'react'
import ResetPassword from './_Components/ResetPassword'
import { auth } from '@/auth'
import { redirect} from 'next/navigation';

const Page =async  () => {
    return (
        <ResetPassword/>
    )

}

export default Page