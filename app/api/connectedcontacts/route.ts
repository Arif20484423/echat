import { NextResponse,NextRequest } from "next/server"
import {auth} from "@/auth"
import { Channel } from "@/models/models";

export async function GET() {
    const session =await auth();
    const data= await Channel.find({user:session?.user?.id}).populate({path:"connections",match:{user:{$ne:session?.user?.id}},populate:{path:"user"}})
    
    return NextResponse.json({data:data,success:true});

}
