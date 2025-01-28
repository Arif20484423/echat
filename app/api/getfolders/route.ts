import { UserFolder } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body= await req.json();
    const data= await UserFolder.find({parentfolder:body.folder})
    return NextResponse.json({success:true,data:data})
}