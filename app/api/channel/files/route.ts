import { ChannelMessage } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";


//in use
export async function POST(req:NextRequest){
    const body = await req.json();
    const files = await ChannelMessage.find({channel:body.channelid,user:body.user,delete:false},"file").populate({path:"file",populate:"file"});
    return NextResponse.json({
        success:true,
        data:files
    })
    
}