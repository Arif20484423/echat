import { Message } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const body=await req.json();
    const data=await  Message.find({channel:body.channelid}).populate("user")
    return NextResponse.json({success:true,data})
}