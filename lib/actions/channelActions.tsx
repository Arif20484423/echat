"use server"
import { Channel } from "@/models/models"


export async function createChannel(user:String,toUser:String){
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
    
}