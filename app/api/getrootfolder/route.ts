import { UserFolder } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body= await req.json();
    const data= await UserFolder.findOne({name:"root",user:body.user})
    return NextResponse.json({success:true,data:data});
}