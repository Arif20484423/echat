import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import { Channel } from "@/models/models";

export async function GET() {
  const session = await auth();
  const data = await Channel.find({ user: session?.user?.id , deleted : false },"user isgroup deleted channelid")
    .populate({
      path: "connections",
      match: { user: { $ne: session?.user?.id } },
      select:"user channelid",
      populate: { path: "user",select:"email description name image" },
    })
    .populate({path:"group",populate:{path:"image"}});
  return NextResponse.json({ data: data, success: true });
}
