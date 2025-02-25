import { auth } from "@/auth";
import { User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const session=await auth();
    const id=session?.user?.id
    try{
        const user=await User.findById(id,"name description image");
        return NextResponse.json({success:true,data:user})
    }catch(error){
        return NextResponse.json({success:false})
    }   
}

// export async function POST(req:NextRequest){
//     const session=await auth();
//     const id=session?.user?.id
//     try{
//         const user=await User.findById(id,"name description image");
//         return NextResponse.json({success:true,data:user})
//     }catch(error){
//         return NextResponse.json({success:false})
//     }   
// }