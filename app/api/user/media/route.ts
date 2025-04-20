import { auth } from "@/auth";
import { UserFile } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import { getFileId } from "../../_chatfunctions/chatfunctions";


export async function POST(req:NextRequest){
    const session = await auth();
    if(session){
        const formData = await req.formData();
        try {
        for (let i = 0; i < formData.getAll("files").length; i++) {
            const file = formData.getAll("files")[i] as File;
            const uploadedFile = await getFileId(file);
            if (uploadedFile.success) {

                const userFile = await UserFile.create({
                  user: formData.get("user"),
                  file: uploadedFile.file,
                  name:file.name,
                  time: new Date(),
                  folder: formData.get("folder"),
                });
              
            } else {
                return NextResponse.json({
                    success: false,
                    error: "Error uploading some file ",
                  });
            }
          }
        }
          catch (error) {
            return NextResponse.json({
              success: false,
              error: "Error saving some file for User",
            });
          }
          return NextResponse.json({
            success: true,
          });
    }
    else{
         return NextResponse.redirect("/user/signin");
    }
}

