"use server"
import { Channel, ChannelMessage, Message } from "@/models/models"
var cryptojs= require("crypto-js")

export async function createChannel(user:String,toUser:String){

    
    const channelexists= await Channel.find({user:user}).populate("user").populate({path:"connections",match:{user:toUser}})
    
    for(let i=0;i<channelexists.length;i++){
        if(channelexists[i].connections.length>0){
            await Channel.findByIdAndUpdate(channelexists[i]._id,{deleted:false})
            return channelexists[i].channelid+""
        }
    }
    
    const ch = new Channel({
        user:user,
        starttime:new Date()
    });
    
    ch.channelid=ch.id;
    await ch.save();
    const ch2= new Channel({
        user:toUser,
        starttime:new Date(),
        channelid:ch.id

    })
    await ch2.save();
    return ch.id;
}

export async function addMessage(channel:String,user:String,touser:String,message:String){
    
    const ciphertext=cryptojs.AES.encrypt(message,process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY).toString();
    const msg= new Message({
        message:ciphertext,
    user:user,
    time: new Date(),
    })  
    await msg.save();
    const user1=await ChannelMessage.create({
        user:user,
    channel:channel,
    message:msg._id
    })

    const user2=await ChannelMessage.create({
        user:touser,
    channel:channel,
    message:msg._id
    })
    await Channel.updateOne({user:touser,channelid:channel},{deleted:false}) ;
    await Channel.updateOne({user:user,channelid:channel},{deleted:false})  ;        
    
}

export async function deleteMesssage(id:String){
    console.log("deleting")
    await ChannelMessage.findByIdAndUpdate(id,{delete:true})
    console.log("deleted")
}
export async function deleteForEveryoneMesssage(id:String,channel:String,user:String,messageid:String){
    await ChannelMessage.findByIdAndUpdate(id,{delete:true})
    // await ChannelMessage.findOneAndUpdate({channel:channel,user:user,message:messageid});
    await ChannelMessage.updateOne({channel:channel,user:user,message:messageid},{delete:true});
    
}

export async function deleteChat(id:String){
    
    await Channel.findByIdAndUpdate(id,{deleted:true,starttime:new Date()})


}