import { NextRequest, NextResponse } from "next/server"
import {User} from '../../../models/user';
import bcrypt from "bcrypt-edge"
export async function POST(request:NextRequest){
    const req= await request.json()
    console.log(req.email)
    let userToAuth=await User.findOne({email:req.email})
                if(!userToAuth){
                    return NextResponse.json({success:false})
                }
                else{
                    if(bcrypt.compareSync(req.password,userToAuth.password)){
                        return NextResponse.json({success:true,user:userToAuth})
                    }
                    else{
                        return NextResponse.json({success:false})
                    }
                }
    
}