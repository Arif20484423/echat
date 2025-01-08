"use server"
import { Channel, ChannelMessage, Group, Message } from "@/models/models"
var cryptojs= require("crypto-js")

export async function createChannel(user:String,toUser:String){

    // creating channel
    // checking for if channel exists between the two users 
    const channelexists= await Channel.find({user:user}).populate("user").populate({path:"connections",match:{user:toUser}})
    
    console.log(channelexists)
    for(let i=0;i<channelexists.length;i++){
        if(!channelexists[i].isgroup && channelexists[i].connections.length>0){
            await Channel.findByIdAndUpdate(channelexists[i].id,{deleted:false})
            // if exists return the channel
            console.log("found")
            return channelexists[i].channelid+""
        }
    }
    //  if channel dows not exists create the channel and assign channel to both users
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

export async function test(x:string){
    console.log(x)
}
export async function addMessage(channel:String,user:String,touser:String,message:String){
    // creating message and adding to all the users current user and toUser
    console.log("encryption")
    console.log("key",process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY)
    const ciphertext=cryptojs.AES.encrypt(message,process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY).toString();
    console.log("ciphertetxted")
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
    // setting up deleted false so that once a message comes in and if chat is deleted prior setted up to non deleted
    await Channel.updateOne({user:touser,channelid:channel},{deleted:false}) ;
    await Channel.updateOne({user:user,channelid:channel},{deleted:false})  ;        
    
}
export async function addMessageGroup(user:String,toUsers:String[],channel:String,message:String){
    // creating message and adding to all the users current user and toUsers
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
        // setting up deleted false so that once a message comes in and if chat is deleted prior setted up to non deleted
        await Channel.updateOne({user:toUsers[i],channelid:channel},{deleted:false}) ;
    }
}

export async function deleteMesssage(id:String){
    // setting delete true for this user with this channel and message
    await ChannelMessage.findByIdAndUpdate(id,{delete:true})
}
export async function deleteForEveryoneMesssage(id:String,channel:String,user:String,messageid:String){
    // setting delete true for  each user with this channel and message
    await ChannelMessage.findByIdAndUpdate(id,{delete:true})
    await ChannelMessage.updateOne({channel:channel,user:user,message:messageid},{delete:true});
    
}

export async function deleteChat(id:String){
    // setting deleted true to show chat deleted adn starttime to make sure this chat further if opened taht will show messages after this current time slot
    await Channel.findByIdAndUpdate(id,{deleted:true,starttime:new Date()})
}

export async function createGroupChannel(user:String,toUsers:String[],name:String){
    //creating channel at once side
    const user1= new Channel({
        user:user,
    starttime:new Date(),
    isgroup:true,
    })
    user1.channelid=user1._id;
    await user1.save();
    // crating other user with same channel id
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
    // adding group details associated to this specific group channel
     await Group.create({
        channel:user1._id,
        groupname:name
     })
     return user1._id+""
}

export async function deleteForEveryoneMesssageGroup(id:String,toUsers:String[],channel:String,messageid:String){
    // setting delete true for  each user with this channel and message
    await ChannelMessage.findByIdAndUpdate(id,{delete:true}); // for current user we get the id of the doc having user channel and message so used id to faster find and deletion
    console.log("users",toUsers)
    for(let i=0;i<toUsers.length;i++){
        await ChannelMessage.updateOne({channel:channel,user:toUsers[i],message:messageid},{delete:true});
    }
    
    
}