import { auth } from "@/auth";
import { User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import { getFileId, getFileLink } from "../../_chatfunctions/chatfunctions";

// in use
export async function POST(req:NextRequest){
    const session = await auth();
    if(session){
        const formData = await req.formData();
        const file = await getFileLink(formData);
       if(file.success){
            await User.findByIdAndUpdate(session.user?.id,{image:file.link})
            return NextResponse.json(file);
       }
       else{
        return NextResponse.json(file);
       }

    }
    else{
        return NextResponse.redirect("/user/signin");
    }
}

