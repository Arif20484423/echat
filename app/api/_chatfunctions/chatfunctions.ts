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
import { AnyARecord } from "dns";
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
  user: any,
  channel: String,
  message: any,
  file: any,
  folder: String
) {
  let userfile = null;
  if (file ) {
    //fetching user folder
    const userFolder = await getUserFolder(user, folder);

    // saving file to user in upload or received folder as to be saved
    console.log("CHECK1")
    userfile = await getUserFile(file._id, file.name, user._id, userFolder);
    console.log("CHECK2");
  }

  // creating channelmessage for user with channel assigining message and file
  const channelMessage = await ChannelMessage.create({
    user: user,
    channel: channel,
    message: message._id,
    file: userfile?userfile._id:null,
    time: new Date(),
  });
 

  

  // channelMessage.message=message;
  // channelMessage.message.user2 = user;
  // channelMessage.file= userfile;
  // console.log("ChANELMASG", channelMessage)
  // Contact if deleted at users side it should be resumed once new message comes in
  const channelUpdate = { deleted: false, lastMessage: new Date() };
  await Channel.updateOne(
    { user: user, channelid: channel },
    channelUpdate
  );
  let ret:any = {};
  ret={...channelMessage._doc}
  ret.message={...message}
  if(userfile){
    ret.file={...userfile._doc}
    ret.file.file=file;
  }
  ret.channelupdate=channelUpdate;
  console.log(ret)
  return ret;

}

export async function addMessage(formData: FormData) {
  // creating message

  
  const channel = formData.get("channel") as string;
  const user = JSON.parse(formData.get("user") as any);
  const touser = JSON.parse(formData.get("touser") as any);
  const ciphertext = cryptojs.AES.encrypt(
    formData.get("message"),
    process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
  ).toString();
  const message = new Message({
    message: ciphertext,
    user: user._id,
    time: new Date(),
  });
  await message.save();
  

  // creating file
  let file = null;
  if (formData.getAll("files").length > 0) {
    const fileUpload = await getFileIdByLink(formData.getAll("files")[0]);
    if (fileUpload.success) {
      file = fileUpload.file;
    } else {
      return fileUpload;
    }
  }

  //adding to user
  const msg = {...message._doc};
  msg.user=user;
  const newMessages:any={};
  newMessages[user._id]=[];
  
    newMessages[user._id].push(await createUserMessage(user, channel, msg, file, "upload"));

  //adding to other users
  newMessages[touser._id]=[]
  newMessages[touser._id].push(await createUserMessage(touser, channel, msg, file, "received"));

  //if multiple files
  for (let i = 1; i < formData.getAll("files").length; i++) {
    // creating free message with user to know user of the file for current channelmessage
    // console.log("a");
    
    const ciphertext = cryptojs.AES.encrypt(
      "",
      process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
    ).toString();
    const message = new Message({
      message: ciphertext,
      user: user,
      time: new Date(),
    });
    await message.save();
    

    // creating file
    let file = null;

    const fileUpload = await getFileIdByLink(formData.getAll("files")[i]);
    if (fileUpload.success) {
      file = fileUpload.file;
    } else {
      return fileUpload;
    }
    const msg = { ...message._doc };
    msg.user = user;
    //adding to user
    newMessages[user._id].push(
      await createUserMessage(user, channel, msg, file, "upload")
    );

    //adding to other users
    newMessages[touser._id].push(
      await createUserMessage(touser, channel, msg, file, "received")
    );
  }
  return {
    success: false,
    message: "message sent successfully",
    newMessages
  };
}
export async function addMessageGroup(formData: FormData) {
  // creating message
  const user = JSON.parse(formData.get("user") as any);
  const channel = formData.get("channelid") as string;
  const tousers:any = [];
  for( let i=0;i<formData.getAll("toUsers").length;i++){
    tousers.push(JSON.parse(formData.getAll("toUsers")[i] as any));
  }
  
  const ciphertext = cryptojs.AES.encrypt(
    formData.get("message"),
    process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
  ).toString();
  const message = new Message({
    message: ciphertext,
    user: user,
    time: new Date(),
  });
  await message.save();
  

  // creating file
  let file = null;
  if (formData.getAll("files").length > 0) {
    const fileUpload = await getFileIdByLink(formData.getAll("files")[0]);
    if (fileUpload.success) {
      file = fileUpload.file;
    } else {
      return fileUpload;
    }
  }

  const msg = { ...message._doc };
  msg.user = user;
  //adding to user
  const newMessages:any={};
  newMessages[user._id]=[]
  newMessages[user._id].push(await createUserMessage(user, channel, msg, file, "upload"));

  //adding to other users
  for (let i = 0; i < tousers.length; i++) {
    newMessages[tousers[i]._id] = [];
    newMessages[tousers[i]._id].push(await createUserMessage(tousers[i], channel, msg, file, "received"));
  }

  //if multiple files
  for (let i = 1; i < formData.getAll("files").length; i++) {
    // creating free message with user to know user of the file for current channelmessage
    
    const ciphertext = cryptojs.AES.encrypt(
      "",
      process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
    ).toString();
    const message = new Message({
      message: ciphertext,
      user: user,
      time: new Date(),
    });
    await message.save();


    // creating file
    let file = null;

    const fileUpload = await getFileIdByLink(formData.getAll("files")[i]);
    if (fileUpload.success) {
      file = fileUpload.file;
    } else {
      return fileUpload;
    }

    const msg = { ...message._doc };
    msg.user = user;
    //adding to user
    newMessages[user._id].push(await createUserMessage(user, channel, msg, file, "upload"));

    //adding to other users
    for (let i = 0; i < tousers.length; i++) {
      newMessages[tousers[i]._id].push(await createUserMessage(tousers[i], channel, msg, file, "received"));
    }
  }

  return { success: true, newMessages };
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

export async function createGroupChannel(formData: FormData) {
  //creating channel at once side
  const user = formData.get("user");
  const toUsers = formData.getAll("toUsers");
  const name = formData.get("name");
  const description = formData.get("description");
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
      lastMessage: new Date(),
      lastSeen: new Date(),
    });
    await toUser.save();
  }
  let fileUpload = null;

  if (formData.get("image") != "undefined") {
    fileUpload = await getFileId(formData.get("image") as File);
  }

  // if (!fileUpload.success) {
  //   return fileUpload;
  // }
  // adding group details associated to this specific group channel

  const group = await Group.create({
    channel: user1._id,
    name: name,
    description: description,
    image: fileUpload ? fileUpload.file : null,
  });
  return { success: true };
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

export async function getFileIdByLink(file: any) {
  // used
  // extracting file type details

  //creating file except the file link
  console.log(file);
  console.log("FIle", JSON.parse(file));
  file = JSON.parse(file);
  try {
    const f = new Files({
      name: file.name,
      time: new Date(),
      type: file.type,
      extension: file.extension,
      file: file.link,
    });
    await f.save();
    console.log("File saved", f);
    return {
      success: true,
      file: f
    };
  } catch (error) {
    return {
      success: false,
      message: "Some error occured uploading file",
      error: error,
    };
  }
}
export async function getFileId(file: File) {
  // used
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
      link: filelink,
    };
  } else {
    return {
      success: false,
      error: "error uploading file",
    };
  }
}
export async function getFileLink(formData: FormData) {
  let imagelink = null;
  const imageid = Math.random() * 1000000;
  // uploading file to supabase
  const { data, error } = await supabase.storage
    .from("echat public")
    .upload("public/" + imageid, formData.get("image") as File);
  imagelink =
    "https://lpbdnkbvpijcinjhkwjl.supabase.co/storage/v1/object/public/echat%20public/public/" +
    imageid;
  if (data) {
    return {
      success: true,
      link: imagelink,
    };
  } else {
    return {
      success: false,
    };
  }
}
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
