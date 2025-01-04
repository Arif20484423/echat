import { Channel } from "@/models/models";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const body=await req.json();
    const data= await Channel.find()   
}