import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import { Channel } from "@/models/models";

export async function POST(req:NextRequest) {
  const body = await req.json();
  await Channel.findByIdAndUpdate(body.id,{"lastSeen":new Date()})
  return NextResponse.json({  success: true });
}
