"use server";

import { ChannelMessage, Message, User, UserFile, UserFolder } from "@/models/models";
import { checkUserFile, getFileId } from "./chatActions";


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
export async function moveMedia(formdata: FormData, newfolder: String) {
  try {
    for (let i = 0; i < formdata.getAll("folders").length; i++) {
      const updatedFolder = await UserFolder.findByIdAndUpdate(
        formdata.getAll("folders")[i],
        { parentfolder: newfolder }
      );
    }
  } catch (error) {
    return {
      success: false,
      error: "Error changing parent folder of folders",
    };
  }
  try {
    for (let i = 0; i < formdata.getAll("files").length; i++) {
      const updatedFiles = await UserFile.findByIdAndUpdate(
        formdata.getAll("files")[i],
        { folder: newfolder }
      );
    }
  } catch (error) {
    return {
      success: false,
      error: "Error changing folder of files",
    };
  }
  return {
    success: true,
  };
}

export async function renameMedia(
  mediaid: String,
  isfolder: Boolean,
  name: String
) {
  if (isfolder) {
    const updatedFolder = await UserFolder.findByIdAndUpdate(mediaid, {
      name: name,
    });
  } else {
    const updatedFile = await UserFile.findByIdAndUpdate(mediaid, {
      name: name,
    });
    return {
      success: true,
    };
  }
}

export async function deleteFile(fileid: String) {
  await UserFile.findByIdAndUpdate(fileid, { delete: true });
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
  tousers: { user: String; channel: String }[],
  user: String
) {
  for (let i = 0; i < tousers.length; i++) {
    for (let j = 0; j < files.length; j++) {
      const message = await Message.create({
        user: user,
        time: new Date(),
      });
      await ChannelMessage.create({
        user: user,
        channel: tousers[i].channel,
        message: message._id,
        file: files[j],
        time: new Date(),
      });

      const file = await checkUserFile(files[j], tousers[i].user);
      await ChannelMessage.create({
        user: tousers[i].user,
        channel: tousers[i].channel,
        message:message._id,
        file: files[i],
        time: new Date(),
      });
    }
  }
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
