import { auth } from "@/auth";
import { UserFile } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

//in use
export async function POST(req:NextRequest){
  const session = await auth();
  if(session){
      const data = await UserFile.find({user:session.user?.id,delete:{$ne:true}}).populate({path:"file",match:{type:"image"}})
      console.log(data)
    //   return NextResponse.json(JSON.stringify({ success: true, data: data }));
  }
  //     console.log(data)
  return NextResponse.json("HEY Am back");
  // if(session){
  //     const data = await UserFile.find({user:session.user?.id,delete:{$ne:true}}).populate({path:"file",match:{type:"image"}})
  //     console.log(data)
  //     return NextResponse.json(JSON.stringify({ success: true, data: data }));
  // }
  // else{
  //  return NextResponse.redirect("/user/signin");
  // }
}

