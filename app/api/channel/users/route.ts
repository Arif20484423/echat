import { Channel } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const body= await req.json();
    const data= await Channel.find({channelid:body.channelid,user:{$ne:body.user}},"user")
    const users=data.map((e)=>{
        return e.user;
    })

    return NextResponse.json({success:true,data:users})
}