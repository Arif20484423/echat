import { ChannelMessage } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const body = await req.json();
    const messages = await ChannelMessage.find({channel:body.channelid,user:body.user,delete:false},"file").populate({path:"file",populate:"file"});
    const files:any = []
     messages.forEach((m)=>{
        if(m.file){
            files.push(m);
        }
    })
    console.log(files)
    return NextResponse.json({
        success:true,
        data:files
    })
    
}