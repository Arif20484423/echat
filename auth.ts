import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./models/user";
import z from 'zod'
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import bcrypt from "bcrypt-edge"

export const {handlers,signIn,signOut,auth}=NextAuth({
    providers:[Google,
        Github,
        Credentials({
        credentials:{
            email:{},
            password:{}
        },
        authorize : async (credentials)=>{
            const validCredentials=z.object({
                email:z.string().email(),
                password:z.string()
            }).safeParse({email:credentials.email,password:credentials.password})

            if(validCredentials.success){
                let userToAuth=await User.findOne({email:credentials.email})
                if(!userToAuth){
                    throw new Error('User not found')
                }
                else{
                    if(bcrypt.compareSync(validCredentials.data.password,userToAuth.password)){
                        return userToAuth;
                    }
                    else{
                        throw new Error('Password not matched')
                    }
                }
            }
            return null; 
        }
    })],
    pages:{
        signIn:'/signin'
    },
   callbacks:{
    signIn:async ({user,account})=>{
        if(account?.provider=='github'){
            const userexist=await User.findOne({email:user.email})
            if(userexist){
                return true
            }
            else{
                const userCreated=await User.create({email:user.email})
            }
        }
        if(account?.provider=='google'){
            const userexist=await User.findOne({email:user.email})
            if(userexist){
                return true
            }
            else{
                const userCreated=await User.create({email:user.email})
            }
        }
        return true;
    }
   }
})