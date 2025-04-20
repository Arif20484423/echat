import { auth } from "@/auth";
import { UserFile } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const session = await auth();
    if(session){
        const data = await UserFile.find({user:session.user?.id,delete:{$ne:true}}).populate({path:"file",match:{type:"video"}})
        return NextResponse.json({success:true,data:data});
    }
    else{
         return NextResponse.redirect("/user/signin");
    }
}

