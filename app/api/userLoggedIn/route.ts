import {auth} from "@/auth"
import { NextResponse } from "next/server";

export async function GET(){
    const session = await auth();
    if(session){
        return NextResponse.json({success:true,id:session.user?.id})
    }
    
    else{
        return NextResponse.json({success:false})
    }
}