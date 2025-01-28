"use server"

import { UserFolder } from "@/models/models"


// forwardMedia Implementation left 

export async function createFolder(name:String,parentfolder:String,user:String){
    await UserFolder.create({
        name:name,
        parentfolder:parentfolder,
        user:user
    })
}