import { auth } from "@/auth";
import { UserFile } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

//in use
export async function POST(req:NextRequest){
    const body= await req.json();
    const data = await UserFile.find({ user: body.userid }).populate({
      path: "file",
      match: { type: { $nin: ["image", "video"] } },
    });
        return NextResponse.json({success:true,data:data})
    
}

