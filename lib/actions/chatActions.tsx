"use server";
import { supabase } from "@/app/_Components/SupabaseClient";
import {
  Channel,
  ChannelMessage,
  Files,
  Group,
  Message,
  UserFile,
  UserFolder,
} from "@/models/models";
var cryptojs = require("crypto-js");

export async function createChannel(user: String, toUser: String) {
  // creating channel
  // checking for if channel exists between the two users
  const channelexists = await Channel.find({ user: user })
    .populate("user")
    .populate({ path: "connections", match: { user: toUser } });

  for (let i = 0; i < channelexists.length; i++) {
    if (!channelexists[i].isgroup && channelexists[i].connections.length > 0) {
      await Channel.findByIdAndUpdate(channelexists[i].id, {
        deleted: false,
        lastMessage: new Date(),
        lastSeen: new Date(),
      });
      // if exists return the channel
      return channelexists[i].channelid + "";
    }
  }
  //  if channel does not exists create the channel and assign channel to both users
  const ch = new Channel({
    user: user,
    starttime: new Date(),
    lastMessage: new Date(),
    lastSeen: new Date(),
  });

  ch.channelid = ch.id;
  await ch.save();
  const ch2 = new Channel({
    user: toUser,
    starttime: new Date(),
    channelid: ch.id,
    lastMessage: new Date(),
    lastSeen: new Date(),
  });
  await ch2.save();
  return ch.id;
}


export async function deleteMesssage(id: String) {
  // setting delete true for this user with this channel and message
  await ChannelMessage.findByIdAndUpdate(id, { delete: true });

  //delete media implementation left
}
export async function deleteMultipleMesssage(message: any[]) {
  // setting delete true for this user with this channel and message
  for (let k = 0; k < message.length; k++) {
    await ChannelMessage.findByIdAndUpdate(message[k]._id, { delete: true });
  }

  //delete media implementation left
}
export async function deleteForEveryoneMesssage(
  id: String,
  channel: String,
  user: String,
  messageid: String
) {
  // setting delete true for  each user with this channel and message
  await ChannelMessage.findByIdAndUpdate(id, { delete: true });
  await ChannelMessage.updateOne(
    { channel: channel, user: user, message: messageid },
    { delete: true }
  );
  //delete media implementation left
}

export async function deleteChat(id: String) {
  // setting deleted true to show chat deleted adn starttime to make sure this chat further if opened taht will show messages after this current time slot
  await Channel.findByIdAndUpdate(id, { deleted: true, starttime: new Date() });
  //delete media implementation left
}


export async function deleteForEveryoneMesssageGroup(
  id: String,
  toUsers: any,
  channel: String,
  messageid: String
) {
  // setting delete true for  each user with this channel and message
  await ChannelMessage.findByIdAndUpdate(id, { delete: true }); // for current user we get the id of the doc having user channel and message so used id to faster find and deletion
  for (let i = 0; i < toUsers.length; i++) {
    await ChannelMessage.updateOne(
      { channel: channel, user: toUsers[i].user._id, message: messageid },
      { delete: true }
    );
  }
  //delete media implementation left
}

export async function getFileId(file: File) {
  // extracting file type details
  const ftype = file.type.split("/");
  //creating file except the file link
  const f = new Files({
    name: file.name,
    time: new Date(),
    type: ftype[0],
    extension: ftype[1],
  });
  // uploading file to supabase
  const { data, error } = await supabase.storage
    .from("echat public")
    .upload("public/" + f.id + "." + ftype[1], file);
  if (data) {
    // if file uploaded successfully  creating file link
    const filelink =
      "https://lpbdnkbvpijcinjhkwjl.supabase.co/storage/v1/object/public/echat%20public/public/" +
      f.id +
      "." +
      ftype[1];

    // adding file link to file created
    f.file = filelink;
    await f.save();
    return {
      success: true,
      file: f._id,
      filename: f.name,
    };
  } else {
    return {
      success: false,
      error: "error uploading file",
    };
  }
}

//in use
export async function getUserFile(
  fileid: String,
  filename: String,
  user: String,
  folder: String
) {
  const userFile = await UserFile.create({
    user: user,
    file: fileid,
    name: filename,
    time: new Date(),
    folder: folder,
  });
  return userFile;
}

export async function getUserFileId(
  fileid: String,
  filename: String,
  user: String,
  folder: String
) {
  const userFile = await UserFile.create({
    user: user,
    file: fileid,
    name: filename,
    time: new Date(),
    folder: folder,
  });
  return userFile._id;
}
export async function getUserFolder(user: String, foldername: String) {
  // fetching folder
  const folder = await UserFolder.findOne({ user: user, name: foldername });
  if (folder) {
    //if found return folder id
    return folder.id;
  } else {
    // else create the default folders  root, upload, received
    const root = await UserFolder.create({
      user: user,
      name: "root",
      parentfolder: null,
      changeallowed: false,
    });
    const upload = await UserFolder.create({
      user: user,
      name: "upload",
      parentfolder: root.id,
      changeallowed: false,
    });
    const received = await UserFolder.create({
      user: user,
      name: "received",
      parentfolder: root.id,
      changeallowed: false,
    });
    // returning folder id as required
    if (foldername === "upload") {
      return upload.id;
    } else if (foldername == "received") {
      return received.id;
    } else {
      return null;
    }
  }
}

export async function checkUserFile(file: String, user: String) {
  let userfile = null;
  const fileExists = await UserFile.findOne({
    user: user,
    file: file,
  });
  if (fileExists) {
    await UserFile.findByIdAndUpdate(fileExists._id, { delete: false });
    userfile = fileExists._id;
  } else {
    const userFolder = await getUserFolder(user, "received");
    const fileCreated = await UserFile.create({
      user: user,
      file: file,
      time: new Date(),
      folder: userFolder,
    });
    userfile = fileCreated._id;
  }
  return userfile;
}
export async function forwardMessage(
  channelmessages: any[],
  tousers: any[],
  user: any
) {
  const newMessages: any = {};
  for (let i = 0; i < channelmessages.length; i++) {
    const messagenew = await Message.create({
      message: channelmessages[i].message.message,
      user: user._id,
      time: new Date().toString(),
    });
    const messageid = messagenew._id;

    // if(i==0){
    //   newMessages[user._id]=[];
    // }

    // console.log(channelmessages[i].id);
    for (let j = 0; j < tousers.length; j++) {
      let file = null;

      if (channelmessages[i].file) {
        const usermessage = await ChannelMessage.create({
          user: user._id,
          channel: tousers[j].channelid,
          message: messageid,
          file: channelmessages[i].file._id,
          time: new Date().toString(),
        });
        const channelupdate = {
          lastMessage: new Date().toString(),
          deleted: false,
          lastSeen: new Date().toString(),
        };
        await Channel.updateOne(
          {
            user: user._id,
            channelid: tousers[j].channelid,
          },
          channelupdate
        );
        const userNewMessage = { ...usermessage._doc };
        userNewMessage.message = { ...messagenew._doc };
        userNewMessage.message.user = { ...user };
        userNewMessage.file = { ...channelmessages[i].file };
        userNewMessage.channelupdate = channelupdate;
        if (!newMessages[user._id]) newMessages[user._id] = [];

        newMessages[user._id].push(userNewMessage);
        for (let k = 0; k < tousers[j].connections.length; k++) {
          var touserfile = await UserFile.findOne({
            user: tousers[j].connections[k].user._id,
            file: channelmessages[i].file.file._id,
          });
          if(touserfile){
            touserfile = await UserFile.findByIdAndUpdate(touserfile._id, { delete: false }, {new : true});

          }
          if (!touserfile) {
            const userfolder = await getUserFolder(
              tousers[j].connections[k].user._id,
              "received"
            );
            
            touserfile = await getUserFile(
              channelmessages[i].file.file._id,
              channelmessages[i].file.name,
              tousers[j].connections[k].user._id,
              userfolder
            );
          }
          const tousermessage = await ChannelMessage.create({
            user: tousers[j].connections[k].user._id,
            channel: tousers[j].channelid,
            message: messageid,
            file: touserfile,
            time: new Date().toString(),
          });
          const channelupdate = {
            deleted: false,
            lastMessage: new Date().toString(),
          };
          await Channel.updateOne(
            {
              user: tousers[j].connections[k].user._id,
              channelid: tousers[j].channelid,
            },
            channelupdate
          );
          const touserNewMessage = { ...tousermessage._doc };
          touserNewMessage.message = { ...messagenew._doc };
          touserNewMessage.message.user = { ...user };
          touserNewMessage.file = { ...touserfile._doc };
          touserNewMessage.file.file = channelmessages[i].file.file;
          touserNewMessage.channelupdate = channelupdate;
          if (i == 0) {
            if (!newMessages[tousers[j].connections[k].user._id])
              newMessages[tousers[j].connections[k].user._id] = [];
          }
          newMessages[tousers[j].connections[k].user._id].push(
            touserNewMessage
          );
        }
      } else {
        const usermessage = await ChannelMessage.create({
          user: user._id,
          channel: tousers[j].channelid,
          message: messageid,
          time: new Date().toString(),
        });
        const channelupdate = {
          lastMessage: new Date().toString(),
          deleted: false,
          lastSeen: new Date().toString(),
        };
        await Channel.updateOne(
          {
            user: user._id,
            channelid: tousers[j].channelid,
          },
          channelupdate
        );
        const userNewMessage = { ...usermessage._doc };
        userNewMessage.message = { ...messagenew._doc };
        userNewMessage.message.user = { ...user };
        userNewMessage.file = null;
        userNewMessage.channelupdate = channelupdate;
        if (!newMessages[user._id]) newMessages[user._id] = [];
        newMessages[user._id].push(userNewMessage);
        for (let k = 0; k < tousers[j].connections?.length; k++) {
          const tousermessage = await ChannelMessage.create({
            user: tousers[j].connections[k].user._id,
            channel: tousers[j].channelid,
            message: messageid,
            time: new Date().toString(),
          });
          const channelupdate = {
            deleted: false,
            lastMessage: new Date().toString(),
          };
          await Channel.updateOne(
            {
              user: tousers[j].connections[k].user._id,
              channelid: tousers[j].channelid,
            },
            channelupdate
          );
          const touserNewMessage = { ...tousermessage._doc };
          touserNewMessage.message = { ...messagenew._doc };
          touserNewMessage.message.user = { ...user };
          touserNewMessage.file = null;
          touserNewMessage.channelupdate = channelupdate;
          if (i == 0) {
            if (!newMessages[tousers[j].connections[k].user._id])
              newMessages[tousers[j].connections[k].user._id] = [];
          }
          newMessages[tousers[j].connections[k].user._id].push(
            touserNewMessage
          );
        }
      }
    }
  }
  console.log("LAST POS", newMessages);
  return { success: true, newMessages: JSON.stringify(newMessages) };
}

export async function sendStorageMedia(
  userfiles: any,
  tousers: any,
  user: any
) {
  // console.log(tousers);
  const newMessages: any = {};
  newMessages[user._id] = [];
  for (let i = 0; i < tousers.connections.length; i++) {
    newMessages[tousers.connections[i].user._id] = [];
  }
  for (let i = 0; i < userfiles.length; i++) {
    let message = null;
    const ciphertext = cryptojs.AES.encrypt(
      "",
      process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
    ).toString();
    const msg = new Message({
      message: ciphertext,
      user: user._id,
      time: new Date(),
    });
    await msg.save();
    message = msg._id;
    const usermessage = await ChannelMessage.create({
      user: user._id,
      channel: tousers.channelid,
      message: message,
      file: userfiles[i]._id,
      time: new Date(),
    });
    const channelupdate = {
      lastMessage: new Date(),
      deleted: false,
      lastSeen: new Date(),
    };
    await Channel.updateOne(
      { user: user._id, channelid: tousers.channelid },
      channelupdate
    );
    let ret: any = {};
    ret = { ...usermessage._doc };
    ret.message = { ...msg._doc };
    ret.message.user = { ...user };
    ret.file = userfiles[i];
    ret.channelupdate = channelupdate;
    newMessages[user._id].push(ret);

    for (let j = 0; j < tousers.connections.length; j++) {
      var touserfile = await UserFile.findOne({
        user: tousers.connections[j].user._id,
        file: userfiles[i].file._id,
      });
      if(touserfile){
        touserfile = await UserFile.findByIdAndUpdate(touserfile._id, { delete: false },{new:true});

      }
      if (!touserfile) {
        const userfolder = await getUserFolder(
          tousers.connections[j].user._id,
          "received"
        );
        touserfile = await getUserFile(
          userfiles[i].file._id,
          userfiles[i].name,
          tousers.connections[j].user._id,
          userfolder
        );
      }
      const tousermessage = await ChannelMessage.create({
        user: tousers.connections[j].user._id,
        channel: tousers.channelid,
        message: message,
        file: touserfile._id,
        time: new Date(),
      });
      const channelupdate = { deleted: false, lastMessage: new Date() };
      await Channel.updateOne(
        { user: tousers.connections[j].user._id, channelid: tousers.channelid },
        channelupdate
      );
      let ret: any = {};
      ret = { ...tousermessage._doc };
      ret.message = { ...msg._doc };
      ret.message.user = { ...user };
      ret.file = { ...touserfile._doc };
      ret.file.file = userfiles[i].file;
      ret.channelupdate = channelupdate;
      console.log(tousers.connections[j].user.name, ret);
      newMessages[tousers.connections[j].user._id].push(ret);
    }
  }
  return { success: true, newMessages: JSON.stringify(newMessages) };
}
