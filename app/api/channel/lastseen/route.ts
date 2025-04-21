import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import { Channel } from "@/models/models";

export async function POST(req:NextRequest) {
  const body = await req.json();
  console.log(body.id)
  await Channel.findByIdAndUpdate(body.id,{"lastSeen":new Date()})
  const data = Channel.findById(body.id);
  console.log("lastseen ",data)
  return NextResponse.json({  success: true });
}
