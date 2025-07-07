import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { addMessage } from "../_chatfunctions/chatfunctions";

export async function POST(req:NextRequest) {
    const session= await auth();
    if(session ){
        const formData= await req.formData();
        console.log(formData.getAll("files"))
        const res=await addMessage(formData);
        return NextResponse.json(res);
    }
    else{
        return NextResponse.redirect("http://localhost:3000/user/signin")
    }
    
}