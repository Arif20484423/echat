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
import { AiOutlineUserSwitch } from "react-icons/ai";
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

export async function createUserMessage(
  user: String,
  channel: String,
  message: String,
  file: any,
  folder: String
) {
  if (file != null) {
    //fetching user folder
    const userFolder = await getUserFolder(user, folder);

    // saving file to user in upload or received folder as to be saved
    file = await getUserFileId(file.file, file.filename, user, userFolder);
  }

  // creating channelmessage for user with channel assigining message and file
  const channelMessage = await ChannelMessage.create({
    user: user,
    channel: channel,
    message: message,
    file: file,
    time: new Date(),
  });
  // Contact if deleted at users side it should be resumed once new message comes in
  await Channel.updateOne(
    { user: user, channelid: channel },
    { deleted: false, lastMessage: new Date() }
  );
}

export async function addMessage(
  channel: String,
  user: String,
  touser: String,
  formData: FormData
) {
  // creating message
  let message = null;
  const ciphertext = cryptojs.AES.encrypt(
    formData.get("message"),
    process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
  ).toString();
  const msg = new Message({
    message: ciphertext,
    user: user,
    time: new Date(),
  });
  await msg.save();
  message = msg.id;

  // creating file
  let file = null;
  if (formData.getAll("files").length > 0) {
    const fileUpload = await getFileId(formData.getAll("files")[0] as File);
    if (fileUpload.success) {
      file = fileUpload;
    } else {
      return fileUpload;
    }
  }

  //adding to user
  await createUserMessage(user, channel, message, file, "upload");

  //adding to other users
  await createUserMessage(touser, channel, message, file, "received");

  //if multiple files
  for (let i = 1; i < formData.getAll("files").length; i++) {
    // creating free message with user to know user of the file for current channelmessage
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

    // creating file
    let file = null;

    const fileUpload = await getFileId(formData.getAll("files")[i] as File);
    if (fileUpload.success) {
      file = fileUpload;
    } else {
      return fileUpload;
    }

    //adding to user
    await createUserMessage(user, channel, message, file, "upload");

    //adding to other users
    await createUserMessage(touser, channel, message, file, "received");
  }
}
export async function addMessageGroup(
  user: String,
  tousers: String[],
  channel: String,
  formData: FormData
) {
  // creating message

  let message = null;
  const ciphertext = cryptojs.AES.encrypt(
    formData.get("message"),
    process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
  ).toString();
  const msg = new Message({
    message: ciphertext,
    user: user,
    time: new Date(),
  });
  await msg.save();
  message = msg.id;

  // creating file
  let file = null;
  if (formData.getAll("files").length > 0) {
    const fileUpload = await getFileId(formData.getAll("files")[0] as File);
    if (fileUpload.success) {
      file = fileUpload;
    } else {
      return fileUpload;
    }
  }

  //adding to user
  await createUserMessage(user, channel, message, file, "upload");

  //adding to other users
  for (let i = 0; i < tousers.length; i++) {
    await createUserMessage(tousers[i], channel, message, file, "received");
  }

  //if multiple files
  for (let i = 1; i < formData.getAll("files").length; i++) {
    // creating free message with user to know user of the file for current channelmessage
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

    // creating file
    let file = null;

    const fileUpload = await getFileId(formData.getAll("files")[i] as File);
    if (fileUpload.success) {
      file = fileUpload;
    } else {
      return fileUpload;
    }

    //adding to user
    await createUserMessage(user, channel, message, file, "upload");

    //adding to other users
    for (let i = 0; i < tousers.length; i++) {
      await createUserMessage(tousers[i], channel, message, file, "received");
    }
  }
}

export async function deleteMesssage(id: String) {
  // setting delete true for this user with this channel and message
  await ChannelMessage.findByIdAndUpdate(id, { delete: true });

  //delete media implementation left
}
export async function deleteMultipleMesssage(message: any[]) {
  // setting delete true for this user with this channel and message
  for (let k = 0; k < message.length; k++) {
    await ChannelMessage.findByIdAndUpdate(message[k].id, { delete: true });
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

export async function createGroupChannel(
  user: String,
  toUsers: String[],
  name: String,
  description: String,
  formData: FormData
) {
  //creating channel at once side
  const user1 = new Channel({
    user: user,
    starttime: new Date(),
    isgroup: true,
    lastMessage: new Date(),
    lastSeen: new Date(),
  });
  user1.channelid = user1._id;
  await user1.save();
  // crating other user with same channel id
  for (let i = 0; i < toUsers.length; i++) {
    const toUser = new Channel({
      user: toUsers[i],
      channelid: user1._id,
      starttime: new Date(),
      isgroup: true,
      lastMessage:new Date(),
      lastSeen:new Date()
    });
    await toUser.save();
  }

  // const fileUpload=await getFileId(formData.get("image") as File);
  // if(!fileUpload.success){
  //   return
  // }
  // adding group details associated to this specific group channel
  await Group.create({
    channel: user1._id,
    groupname: name,
    description: description,
  });
  return user1._id + "";
}

export async function deleteForEveryoneMesssageGroup(
  id: String,
  toUsers: String[],
  channel: String,
  messageid: String
) {
  // setting delete true for  each user with this channel and message
  await ChannelMessage.findByIdAndUpdate(id, { delete: true }); // for current user we get the id of the doc having user channel and message so used id to faster find and deletion
  for (let i = 0; i < toUsers.length; i++) {
    await ChannelMessage.updateOne(
      { channel: channel, user: toUsers[i], message: messageid },
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
  channelmessages: {
    id: String;
    messageid: String;
    userfileid: String | undefined;
    fileid: String | undefined;
  }[],
  tousers: {
    connections: any[];
    channelid: String;
    isgroup: Boolean | undefined;
  }[],
  userid: String
) {
  for (let i = 0; i < channelmessages.length; i++) {
    const message = await Message.findById(channelmessages[i].messageid);
    const messagenew = await Message.create({
      message: message.message,
      user: userid,
      time: new Date(),
    });
    const messageid = messagenew._id;
    console.log(channelmessages[i].id);
    for (let j = 0; j < tousers.length; j++) {
      let file = null;

      if (channelmessages[i].fileid) {
        if (tousers[j].isgroup) {
          const usermessage = await ChannelMessage.create({
            user: userid,
            channel: tousers[j].channelid,
            message: messageid,
            file: channelmessages[i].userfileid,
            time: new Date(),
          });

          for (let k = 0; k < tousers[j].connections.length; k++) {
            let touserfile = await UserFile.findOne({
              user: tousers[j].connections[k].user._id,
              file: channelmessages[i].fileid,
            });
            if (!touserfile) {
              const userfile = await UserFile.findById(
                channelmessages[i].userfileid
              );
              const userfolder = await getUserFolder(
                tousers[j].connections[k].user._id,
                "received"
              );
              touserfile = await getUserFileId(
                userfile.file,
                userfile.name,
                tousers[j].connections[k].user._id,
                userfolder
              );
            }
            const tousermessage = await ChannelMessage.create({
              user: tousers[j].connections[k].user._id,
              channel: tousers[j].channelid,
              message: messageid,
              file: touserfile,
              time: new Date(),
            });
            await Channel.updateOne(
              {
                user: tousers[j].connections[k].user._id,
                channelid: tousers[j].channelid,
              },
              { deleted: false, lastMessage: new Date() }
            );
          }
        } else {
          const usermessage = await ChannelMessage.create({
            user: userid,
            channel: tousers[j].channelid,
            message: messageid,
            file: channelmessages[i].userfileid,
            time: new Date(),
          });
          let touserfile = await UserFile.findOne({
            user: tousers[j].connections[0].user._id,
            file: channelmessages[i].fileid,
          });
          if (!touserfile) {
            const userfile = await UserFile.findById(
              channelmessages[i].userfileid
            );
            const userfolder = await getUserFolder(
              tousers[j].connections[0].user._id,
              "received"
            );
            touserfile = await getUserFileId(
              userfile.file,
              userfile.name,
              tousers[j].connections[0].user._id,
              userfolder
            );
          }
          const tousermessage = await ChannelMessage.create({
            user: tousers[j].connections[0].user._id,
            channel: tousers[j].channelid,
            message: messageid,
            file: touserfile,
            time: new Date(),
          });
          await Channel.updateOne(
            {
              user: tousers[j].connections[0].user._id,
              channelid: tousers[j].channelid,
            },
            { deleted: false, lastMessage: new Date() }
          );
        }
      } else {
        if (tousers[j].isgroup) {
          const usermessage = await ChannelMessage.create({
            user: userid,
            channel: tousers[j].channelid,
            message: messageid,
            time: new Date(),
          });
          for (let k = 0; k < tousers[j].connections?.length; k++) {
            const tousermessage = await ChannelMessage.create({
              user: tousers[j].connections[k].user._id,
              channel: tousers[j].channelid,
              message: messageid,
              time: new Date(),
            });
            await Channel.updateOne(
              {
                user: tousers[j].connections[k].user._id,
                channelid: tousers[j].channelid,
              },
              { deleted: false, lastMessage: new Date() }
            );
          }
        } else {
          const usermessage = await ChannelMessage.create({
            user: userid,
            channel: tousers[j].channelid,
            message: messageid,
            time: new Date(),
          });
          const tousermessage = await ChannelMessage.create({
            user: tousers[j].connections[0].user._id,
            channel: tousers[j].channelid,
            message: messageid,
            time: new Date(),
          });
          await Channel.updateOne(
            {
              user: tousers[j].connections[0].user._id,
              channelid: tousers[j].channelid,
            },
            { deleted: false, lastMessage: new Date() }
          );
        }
      }
    }
  }
}

export async function sendStorageMedia(
  files: { file: String; userfile: String }[],
  channelid: String,
  tousers: String[],
  userid: String
) {
  console.log(tousers);
  for (let i = 0; i < files.length; i++) {
    let message = null;
    const ciphertext = cryptojs.AES.encrypt(
      "",
      process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
    ).toString();
    const msg = new Message({
      message: ciphertext,
      user: userid,
      time: new Date(),
    });
    await msg.save();
    message = msg._id;
    const usermessage = await ChannelMessage.create({
      user: userid,
      channel: channelid,
      message: message,
      file: files[i].userfile,
      time: new Date(),
    });
    for (let j = 0; j < tousers.length; j++) {
      let touserfile = await UserFile.findOne({
        user: tousers[j],
        file: files[i].file,
      });
      if (!touserfile) {
        const userfile = await UserFile.findById(files[i].userfile);
        const userfolder = await getUserFolder(tousers[j], "received");
        touserfile = await getUserFileId(
          userfile.file,
          userfile.name,
          tousers[j],
          userfolder
        );
      }
      const tousermessage = await ChannelMessage.create({
        user: tousers[j],
        channel: channelid,
        message: message,
        file: touserfile,
        time: new Date(),
      });
      await Channel.updateOne(
        { user: tousers[j], channelid: channelid },
        { deleted: false, lastMessage: new Date() }
      );
    }
  }
}
