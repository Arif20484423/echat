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
      await Channel.findByIdAndUpdate(channelexists[i].id, { deleted: false });
      // if exists return the channel
      return channelexists[i].channelid + "";
    }
  }
  //  if channel does not exists create the channel and assign channel to both users
  const ch = new Channel({
    user: user,
    starttime: new Date(),
  });

  ch.channelid = ch.id;
  await ch.save();
  const ch2 = new Channel({
    user: toUser,
    starttime: new Date(),
    channelid: ch.id,
  });
  await ch2.save();
  return ch.id;
}

export async function createUserMessage(
  user: String,
  channel: String,
  message: String,
  file: String,
  folder: String
) {
  if (file != null) {
    //fetching user folder
    const userFolder = await getUserFolder(user, folder);

    // saving file to user in upload or received folder as to be saved
    const userFile = await UserFile.create({
      user: user,
      file: file,
      time: new Date(),
      folder: userFolder,
    });
    file = userFile.id;
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
    { deleted: false }
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
      file = fileUpload.file;
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
      file = fileUpload.file;
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
      file = fileUpload.file;
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
      file = fileUpload.file;
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
  name: String
) {
  //creating channel at once side
  const user1 = new Channel({
    user: user,
    starttime: new Date(),
    isgroup: true,
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
    });
    await toUser.save();
  }
  // adding group details associated to this specific group channel
  await Group.create({
    channel: user1._id,
    groupname: name,
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
    };
  } else {
    return {
      success: false,
      error: "error uploading file",
    };
  }
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

export async function forwardMessage(
  channelmessages: String[],
  tousers: { user: String; channel: String }[],
  user: String
) {
  // for each message
  for (let i = 0; i < channelmessages.length; i++) {
    // fetching current message (channelmessage for current chat selected)
    const channelMessage = await ChannelMessage.findById(
      channelmessages[i]
    ).populate("file");
    //fetching the message
    const message = await Message.findById(channelMessage.message);
    // copying the message by changing all the selected message user by current user who is forwarding all the messages
    const messagecopy = await Message.create({
      message: message.message,
      user: user,
      time: new Date(),
    });
    // for eah user to be forwarded
    for (let j = 0; j < tousers.length; j++) {
      //checking if there is a file to be forwarded
      let file = null;
      if (channelMessage.file) {
        // checking file exists on user side to whom file is to be forwarded else created and assigned id of that userfile to file
        const fileExists = await UserFile.findOne({
          user: tousers[j].user,
          file: channelMessage.file.file,
        });
        if(fileExists) {
          await UserFile.findByIdAndUpdate(fileExists._id,{delete:false})
          file=fileExists._id;
        }
        else{
          const userFolder=await getUserFolder(tousers[j].user,"received");
          const fileCreated=await UserFile.create({
            user:tousers[j].user,
            file:channelMessage.file.file,
            time:new Date(),
            folder:userFolder

          })
          file=fileCreated._id;
        }
      }
      //creating ChannelMessage with new message whose user is sender and new file(UserFile) which is at that user side who is to be forwrded the file
      //user side
      const channelMessageNewUser = await ChannelMessage.create({
        user: user,
        channel: tousers[j].channel,
        message: messagecopy._id,
        file:channelMessage.file,
        time: new Date(),
      });

      //other user side
      const channelMessageNew = await ChannelMessage.create({
        user: tousers[j].user,
        channel: tousers[j].channel,
        message: messagecopy._id,
        file:file,
        time: new Date(),
      });
    }
  }
}


