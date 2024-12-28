

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./models/user";
import z from 'zod'
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import bcrypt from "bcrypt-edge"

export const {handlers,signIn,signOut,auth}=NextAuth({
    providers:[Google({
        clientId:process.env.AUTH_GOOGLE_ID,
        clientSecret:process.env.AUTH_GOOGLE_SECRET,
        async profile(profile){
            const userExist= await User.findOne({email:profile.email});
            if(userExist){
                profile._id=userExist._id;
            }
            else{
                const userCreated=await User.create({email:profile.email});
                profile._id=userCreated._id;
            }
            return profile;
        }
    }),
        Github({
            clientId:process.env.AUTH_GITHUB_ID,
            clientSecret:process.env.AUTH_GITHUB_SECRET,
            async profile(profile){
                const userExist= await User.findOne({email:profile.email});
                if(userExist){
                    profile._id=userExist._id;
                }
                else{
                    const userCreated=await User.create({email:profile.email});
                    profile._id=userCreated._id;
                }
                return profile;
            },
        }),
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
    jwt({token,user}){
        if(user ){
            token.id=user._id
        }
        return token;
    },
    session({session,token}){
        session.user.id=token.id;
        return session;

    },
    
   }
})