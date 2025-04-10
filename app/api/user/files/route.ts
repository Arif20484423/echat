import { UserFile } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body= await req.json();
    console.log(body.folder)
    const data= await UserFile.find({folder:body.folder,delete:{$ne:true}}).populate("file")
    return NextResponse.json({success:true,data:data});
}