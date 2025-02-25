import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { createGroupChannel } from "../../_chatfunctions/chatfunctions";


export async function POST(req:NextRequest){

    const session =  await auth()
    if(session){
        const formData= await req.formData();
        const res = await createGroupChannel(formData);
        return NextResponse.json(res);
    }
    else{
        return NextResponse.redirect("http://localhost:3000/user/signin")
    }
}