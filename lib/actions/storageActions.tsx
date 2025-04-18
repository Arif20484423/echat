"use server";

import { Channel, ChannelMessage, Files, Message, User, UserFile, UserFolder } from "@/models/models";
import {  getFileId, getUserFolder } from "./chatActions";
var cryptojs = require("crypto-js");

export async function createFolder(
  name: String,
  parentfolder: String,
  user: String
) {
  await UserFolder.create({
    name: name,
    parentfolder: parentfolder,
    user: user,
  });
}
export async function uploadMedia(
  formData: FormData,
  user: String,
  folder: String
) {
  for (let i = 0; i < formData.getAll("files").length; i++) {
    const uploadedFile = await getFileId(formData.getAll("files")[i] as File);
    if (uploadedFile.success) {
      try {
        const userFile = await UserFile.create({
          user: user,
          file: uploadedFile.file,
          time: new Date(),
          folder: folder,
        });
      } catch (error) {
        return {
          success: false,
          error: "Error saving some file for User",
        };
      }
    } else {
      return uploadedFile;
    }
  }
  return {
    success: true,
  };
}
export async function moveFiles(files:String[], newfolder: String) {
  try {
    for (let i = 0; i < files.length; i++) {
      const updatedFiles = await UserFile.findByIdAndUpdate(
        files[i],
        { folder: newfolder }
      );
    }
  } catch (error) {
    console.log(error)
  }
}

export async function renameFolder(
  folderid: String,
  name: String
) {
    const updatedFolder = await UserFolder.findByIdAndUpdate(folderid, {
      name: name,
    });
}
export async function renameFile(
  fileid: String,
  name: String
) {
    const updatedFile = await UserFile.findByIdAndUpdate(fileid, {
      name: name,
    });
}
export async function deleteFile(file: String) {
  try {
      await UserFile.findByIdAndUpdate(file, { delete: true });
  } catch (error) {
    console.log(error);
  }
  }
export async function deleteFiles(files: String[]) {
try {
  for(let i =0;i< files.length;i++){
    await UserFile.findByIdAndUpdate(files[i], { delete: true });
  }
} catch (error) {
  console.log(error);
}
}
export async function deleteFolder(folderid: String) {
  await UserFolder.findByIdAndDelete(folderid);
  const files = await UserFile.find({ folder: folderid });
  for (let i = 0; i < files.length; i++) {
    await UserFile.findByIdAndUpdate(files[i]._id, { delete: true });
  }
  const folders = await UserFolder.find({ parentfolder: folderid });
  for (let i = 0; i < folders.length; i++) {
    await deleteFolder(folders[i]._id);
  }
}

export async function sendMedia(
  files: String[],
  contacts:any[],
  user: String
) {
  for (let i = 0; i < contacts.length; i++) {
    for (let j = 0; j < files.length; j++) {
      let message = null;
    const ciphertext = cryptojs.AES.encrypt(
      "",
      process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
    ).toString();
    const msg = new Message({
      message: ciphertext,
      user: user,
      time: new Date(),
    });
    await msg.save();
    message = msg.id;
      const userFile = await UserFile.findOne({user:user,file:files[j]});    
      console.log("Filey",userFile)  
      await ChannelMessage.create({
        user: user,
        channel: contacts[i].channelid,
        message: message,
        file: userFile._id,
        time: new Date(),
      });

      if(!contacts[i].isgroup){
        let toUserFile = await UserFile.findOne( {user:contacts[i].connections[0].user._id, file:files[j]});
        if(toUserFile){
          await ChannelMessage.create({
            user: contacts[i].connections[0].user._id,
            channel: contacts[i].channelid,
            message:message,
            file: toUserFile,
            time: new Date(),
          });
        }
        else{
          toUserFile = await  getUserFileId(files[j],contacts[i].connections[0].user._id);
          await ChannelMessage.create({
            user: contacts[i].connections[0].user._id,
            channel: contacts[i].channelid,
            message:message,
            file: toUserFile,
            time: new Date(),
          });
  
        }
         await Channel.updateOne(
            { user: contacts[i].connections[0].user._id, channelid: contacts[i].channelid },
            { deleted: false }
          );
      }
      else{
        for(let k=0;k<contacts[i].connections.length;k++){
          let toUserFile = await UserFile.findOne( {user:contacts[i].connections[k].user._id, file:files[j]});
        if(toUserFile){
          await ChannelMessage.create({
            user: contacts[i].connections[k].user._id,
            channel: contacts[i].channelid,
            message:message,
            file: toUserFile,
            time: new Date(),
          });
        }
        else{
          toUserFile = await  getUserFileId(files[j],contacts[i].connections[k].user._id);
          await ChannelMessage.create({
            user: contacts[i].connections[k].user._id,
            channel: contacts[i].channelid,
            message:message,
            file: toUserFile,
            time: new Date(),
          });
  
        }
        await Channel.updateOne(
          { user: contacts[i].connections[k].user._id, channelid: contacts[i].channelid },
          { deleted: false }
        );
        }
      }
      
    }
  }
}
export async function getUserFileId(fileid:String,userid:String){
   const  file = await Files.findOne({_id:fileid})
   const userFolder = await getUserFolder(userid,"received");
   const userFile = await UserFile.create({
    user:userid,
    file:fileid,
    name:file.name,
    time:new Date(),
    folder:userFolder
   })
   return userFile._id;
}
export async function saveMedia(folder:String,userfile:String){
    try {
        await UserFile.findByIdAndUpdate(userfile,{folder:folder})
        return {
            success:true
        }
    } catch (error) {
        return {
            success:false,
            error:"Error saving (Chnaging Folder)"
        }
    }
}
