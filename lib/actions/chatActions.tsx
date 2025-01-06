"use server"
import { Channel, Message } from "@/models/models"
var cryptojs= require("crypto-js")

export async function createChannel(user:String,toUser:String){

    
    const channelexists= await Channel.find({user:user}).populate("user").populate({path:"connections",match:{user:toUser}})
    
    for(let i=0;i<channelexists.length;i++){
        if(channelexists[i].connections.length>0){
            return channelexists[i].channelid+""
        }
    }
    
    const ch = new Channel({
        user:user
    });
    
    ch.channelid=ch.id;
    await ch.save();
    const ch2= new Channel({
        user:toUser,
        channelid:ch.id
    })
    await ch2.save();
    return ch.id;
}

export async function addMessage(channel:String,user:String,message:String){
    
    const ciphertext=cryptojs.AES.encrypt(message,process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY).toString();
    const msg= new Message({
        message:ciphertext,
    user:user,
    channel:channel,
    time: new Date(),
    })  
    await msg.save();
}