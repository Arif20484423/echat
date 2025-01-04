import { User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest){
    const body= await req.json()
    const reg=body.key;
    
    const users=await User.find({ "email": { "$regex": reg, "$options": "i" } });
    return NextResponse.json(users)
}