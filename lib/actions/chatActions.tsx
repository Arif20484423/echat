"use server"
import { Channel, Message } from "@/models/models"


export async function createChannel(user:String,toUser:String){

    // update needed to make boundaries
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
    
    const msg= new Message({
        message:message,
    user:user,
    channel:channel,
    time: new Date(),
    })  
    await msg.save();
}