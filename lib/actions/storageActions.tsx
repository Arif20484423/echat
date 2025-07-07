"use server";

import {
  Channel,
  ChannelMessage,
  Files,
  Message,
  User,
  UserFile,
  UserFolder,
} from "@/models/models";
import {
  getFileId,
  getUserFile,
  getUserFileId,
  getUserFolder,
} from "./chatActions";
var cryptojs = require("crypto-js");

export async function createFolder(
  name: String,
  parentfolder: String,
  user: String
) {
  const folder = await UserFolder.create({
    name: name,
    parentfolder: parentfolder,
    user: user,
  });
  return JSON.stringify(folder);
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
export async function moveFiles(files: String[], newfolder: String) {
  try {
    for (let i = 0; i < files.length; i++) {
      const updatedFiles = await UserFile.findByIdAndUpdate(files[i], {
        folder: newfolder,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function renameFolder(folderid: String, name: String) {
  const updatedFolder = await UserFolder.findByIdAndUpdate(folderid, {
    name: name,
  });
}
export async function renameFile(fileid: String, name: String) {
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

//in use
export async function deleteFiles(files: any) {
  try {
    for (let i = 0; i < files.length; i++) {
      await UserFile.findByIdAndUpdate(files[i]._id, { delete: true });
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

//in use
export async function sendMedia(files: any, contacts: any, user: any) {
  let newMessages:any = {};
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
      console.log(files)
      await ChannelMessage.create({
        user: user,
        channel: contacts[i].channelid,
        message: message,
        file: files[j]._id,
        time: new Date(),
      });

      const channelupdate = {
        lastMessage: new Date(),
        deleted: false,
        lastSeen: new Date(),
      };
      await Channel.updateOne(
        {
          user: user._id,
          channelid: contacts[i].channelid,
        },
        channelupdate
      );

      for (let k = 0; k < contacts[i].connections.length; k++) {
        let toUserFile = await UserFile.findOne({
          user: contacts[i].connections[k].user._id,
          file: files[j].file._id,
        });
        if (!toUserFile) {
          const touserfolder = await getUserFolder(
            contacts[i].connections[k].user._id,
            "received"
          );
          toUserFile = await getUserFile(
            files[j].file._id,
            files[j].name,
            contacts[i].connections[k].user._id,
            touserfolder
          );
        }
        const tousermessage = await ChannelMessage.create({
          user: contacts[i].connections[k].user._id,
          channel: contacts[i].channelid,
          message: message,
          file: toUserFile._id,
          time: new Date(),
        });

        const channelupdate = { deleted: false, lastMessage: new Date() };
        await Channel.updateOne(
          {
            user: contacts[i].connections[k].user._id,
            channelid: contacts[i].channelid,
          },
          channelupdate
        );

        let ret = {...tousermessage._doc};
        ret.message={...msg._doc};
        ret.message.user=user;
        ret.file={...toUserFile._doc}
        ret.file.file=files[j].file;
        ret.channelupdate=channelupdate;
        if(!newMessages[contacts[i].connections[k].user._id]){
          newMessages[contacts[i].connections[k].user._id]=[];
        }
        newMessages[contacts[i].connections[k].user._id].push(ret);
      }
    }
  }
  return {success:true,newMessages:JSON.stringify(newMessages)}
} 
// export async function getUserFileId(fileid:String,userid:String){
//    const  file = await Files.findOne({_id:fileid})
//    const userFolder = await getUserFolder(userid,"received");
//    const userFile = await UserFile.create({
//     user:userid,
//     file:fileid,
//     name:file.name,
//     time:new Date(),
//     folder:userFolder
//    })
//    return userFile._id;
// }
export async function saveMedia(folder: String, userfile: String) {
  try {
    await UserFile.findByIdAndUpdate(userfile, { folder: folder });
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Error saving (Chnaging Folder)",
    };
  }
}
