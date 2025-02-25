import { auth } from "@/auth";
import { Channel } from "@/models/models";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { addMessageGroup } from "../../_chatfunctions/chatfunctions";


export async function POST(req:NextRequest) {
    const session= await auth();
    console.log("1")
    if(session ){
        const formData= await req.formData();
        const res= await addMessageGroup(formData);
        return NextResponse.json(res);
        
        
    }
    else{
        console.log(8)
        return NextResponse.redirect("http://localhost:3000/user/signin")
    }
    
}