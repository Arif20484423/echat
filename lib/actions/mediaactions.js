"use server"

import { auth } from "@/auth";
import {v2 as cloudinary} from "cloudinary"
import fs from "fs";

export async function uploadfile(formData){
    console.log(":before show")
    // const data= fs.readFileSync(formData.get("image"));
    console.log(formData.get("image"))
    console.log("showing")
    // console.log(data)
    console.log("showed")
    // cloudinary.config({ 
    //     cloud_name: 'dckswnizg', 
    //     api_key: '855292171882225', 
    //     api_secret: 'gpUZzeCJKdFCW6vF2T6qAYvyszc' // Click 'View API Keys' above to copy your API secret
    // });

    // const f= new File(["foo"],"/image.png")
    // console.log(f)
    // const uploadres= await cloudinary.uploader.upload("\public\\pdf.pdf",{public_id:"pdf3"}).catch((error)=>{
    //     console.log(error)
    // })
    // console.log(uploadres)
    // const optimizeurl= cloudinary.url("pdf3",{fetch_format:"auto",quality:"auto"})
    // console.log(optimizeurl)


}