import {auth} from "@/auth"
import { User } from "@/models/models";
import { NextResponse } from "next/server";


//in use
export async function GET(){
    const session = await auth();
    const user=await User.findById(session?.user?.id,"name email description image");
    if(session){
        return NextResponse.json({success:true,user:user})
    }
    
    else{
        return NextResponse.json({success:false})
    }
}