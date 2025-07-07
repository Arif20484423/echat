import { User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

// in use
export async function POST(req:NextRequest){
    const body= await req.json()
    const reg=body.key;
    
    const users=await User.find({ "email": { "$regex": reg, "$options": "i" } },"name email image");
    return NextResponse.json({success:true,data:users})
}