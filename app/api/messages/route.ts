import { Channel, ChannelMessage, Message } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import { timeLog } from "node:console";
import { addMessage } from "../_chatfunctions/chatfunctions";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const time = await Channel.find({
    channelid: body.channelid,
    user: body.user,
  });
  console.log(time)
  const data = await ChannelMessage.find({
    channel: body.channelid,
    user: body.user,
    time:{$gte:time[0].starttime}
  },"file message delete").populate({
    path: "message",
    populate: { path: "user" ,select:"name"},
  }).populate({
    path:"file",
    populate:{path : "file"}
    
  });
  return NextResponse.json({ success: true, data });
}
