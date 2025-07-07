import { auth } from "@/auth";
import { User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

// in use
export async function POST(req:NextRequest){
    const session = await auth();
    if(session){
        const body = await req.json();
        await User.findByIdAndUpdate(session.user?.id,{name:body.name});
        return NextResponse.json({success:true});

    }
    else{
        return NextResponse.redirect("/user/signin");
    }
}