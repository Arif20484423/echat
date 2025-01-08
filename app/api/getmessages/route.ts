import {  Channel, ChannelMessage, Message } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const body=await req.json();
    const time= await Channel.find({channelid:body.channelid,user:body.user})
    const data= await ChannelMessage.find({channel:body.channelid,user:body.user}).populate({path:"message",match:{time:{$gte:time[0].starttime}},populate:{path:"user"}})
    return NextResponse.json({success:true,data})
}