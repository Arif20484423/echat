"use server"
import { Channel, ChannelMessage, Group, Message } from "@/models/models"
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
export async function addMessageGroup(user:String,toUsers:String[],channel:String,message:String){
    const ciphertext=cryptojs.AES.encrypt(message,process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY).toString();
    const msg= new Message({
        message:ciphertext,
    user:user,
    time: new Date(),
    })  
    await msg.save();
    const user1= await ChannelMessage.create({
        user:user,
        channel:channel,
        message:msg._id
    })
    for(let i=0;i<toUsers.length;i++){
        const x=await ChannelMessage.create({
            user:toUsers[i],
            channel:channel,
            message:msg._id
        })
        await Channel.updateOne({user:toUsers[i],channelid:channel},{deleted:false}) ;
    }
}

export async function deleteMesssage(id:String){
    await ChannelMessage.findByIdAndUpdate(id,{delete:true})
}
export async function deleteForEveryoneMesssage(id:String,channel:String,user:String,messageid:String){
    await ChannelMessage.findByIdAndUpdate(id,{delete:true})
    await ChannelMessage.updateOne({channel:channel,user:user,message:messageid},{delete:true});
    
}

export async function deleteChat(id:String){
    await Channel.findByIdAndUpdate(id,{deleted:true,starttime:new Date()})
}

export async function createGroupChannel(user:String,toUsers:String[],name:String){
    const user1= new Channel({
        user:user,
    starttime:new Date(),
    isgroup:true,
    })
    user1.channelid=user1._id;
    await user1.save();
    for(let i=0;i<toUsers.length;i++){
        console.log('hdbc')
        const toUser= new Channel({
            user:toUsers[i],
            channelid:user1._id,
            starttime:new Date(),
            isgroup:true,
        })
        await toUser.save();
    }
     await Group.create({
        channel:user1._id,
        groupname:name
     })
     return user1._id+""
}

export async function deleteForEveryoneMesssageGroup(id:String,toUsers:String[],channel:String,messageid:String){
    await ChannelMessage.findByIdAndUpdate(id,{delete:true});
    console.log("users",toUsers)
    for(let i=0;i<toUsers.length;i++){
        await ChannelMessage.updateOne({channel:channel,user:toUsers[i],message:messageid},{delete:true});
    }
    
    
}