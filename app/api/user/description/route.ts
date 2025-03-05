import { auth } from "@/auth";
import { User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const session = await auth();
    if(session){
        const body = await req.json();
        await User.findByIdAndUpdate(session.user?.id,{description:body.description});
        return NextResponse.json({success:true});

    }
    else{
        return NextResponse.redirect("/user/signin");
    }
}