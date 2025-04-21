"use client";
import React, { useState, useEffect, useContext } from "react";
import StorageItem from "../wrappers/StorageItem";
import Popup from "@/app/_UIComponents/Popup";
import Contacts from "@/app/(dashboard)/chat/_Components/Contacts/Contacts";
import styles from "../Component.module.css";
import { Context } from "@/app/_context/NoteContext";
import {
  deleteFile,
  deleteFiles,
  deleteFolder,
  moveMedia,
  renameFile,
  renameFolder,
  renameMedia,
  sendMedia,
} from "@/lib/actions/storageActions";
import SelectedMenu from "./SelectedMenu";
const FolderFiles = ({
  //   pathFolders,
  //   setPathFolders,
  //   pos,
  //   setPos,
  //   lastPos,
  //   setLastPos,
  //   refetch,
  //   setRefetch,
  check,
  setChecked,
  fileClick,
}) => {
  const { user ,socket} = useContext(Context);
  // console.log("userin ",user)
  const [refetch, setRefetch] = useState(false);
  const [folders, setFolders] = useState(null);
  const [files, setFiles] = useState(null);
  const [sendFlag, setSendFlag] = useState(false);
  const [selectFlag, setSelectFlag] = useState(false);
  const [selected, setSelected] = useState([]);
  const [contacts, setContacts] = useState([]);

  async function send() {
    let files = [];
    for (let i = 0; i < selected.length; i++) {
      files.push(selected[i].file);
    }
    await sendMedia(files, contacts, user.id);
    setSendFlag(false);
    const emitUsers = [];
    console.log(contacts);
    for (let i = 0; i < contacts.length; i++) {
      let tousers = [];
      for (let j = 0; j < contacts[i].connections.length; j++) {
        tousers.push(contacts[i].connections[j].user._id);
      }
      emitUsers.push({
        channelid: contacts[i].channelid,
        users: tousers,
      });
    }
    setContacts([]);
    setSelectFlag(false);
    setSelected([]);
    socket.emit("messagemultiple", {
      to: emitUsers,
      message: "new Message",
    }); //mesagenotification to other to reload chats
  }
  async function deleteMultiple() {
    let userFiles = [];
    for (let i = 0; i < selected.length; i++) {
      userFiles.push(selected[i].userfile);
    }
    await deleteFiles(userFiles);
    setSendFlag(false);
    setContacts([]);
    setSelectFlag(false);
    setSelected([]);
    setRefetch((t) => !t);
  }
  useEffect(() => {
    fetch("http://localhost:3000/api/user/videos", {
      method: "POST",
    })
      .then((d) => d.json())
      .then((d) => {
        // console.log("photos", d.data);
        setFiles(() => d.data);
        // console.log(photos)
      });
  }, [refetch]);

  useEffect(() => {
    if (check) {
      setChecked(selected);
    }
  }, [selected]);
  return (
    <>
      {/* <div className={styles.movePopup}>
      <StorageLayout/>
     </div> */}

      {sendFlag && (
        <Popup>
          <div className={styles.contactbox}>
            <div className={styles.contacts}>
              <Contacts
                check={true}
                setContacts={setContacts}
                contacts={contacts}
              />
            </div>
            <button className={styles.send} onClick={send}>
              send
            </button>
            <button
              className={styles.cancel}
              onClick={() => {
                setSendFlag(false);
                setContacts([]);
                setSelected([]);
                setSelectFlag(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Popup>
      )}
      {selectFlag && (
        <SelectedMenu
          setSelectFlag={setSelectFlag}
          send={() => {
            setSelectFlag(false);
            setSendFlag(true);
          }}
          deleteMultiple={deleteMultiple}
        />
      )}

      {/* <br />
    <button onClick={async ()=>{
        console.log(media)
        const formData= new FormData();
        media.map((e)=>{
            if(e.folder){
                formData.append("folders",e.id)
            }
            else{
                formData.append("files",e.id)
            }
        })
        await moveMedia(formData,pathFolders[pos]._id)
        setRefetch((t)=>!t)
        setMedia([]);
    }}>here</button>
    <br /> */}

      {/* <div> */}

      {files &&
        files.map((e) => {
          if (e.file)
            return (
              <div
                key={e._id}
                className=" bg-slate-500"
                onDoubleClick={() => {
                  window.open(e.file.file);
                }}
              >
                <StorageItem
                  userfileid={e._id}
                  fileid={e.file._id}
                  name={e.name}
                  src={e.file.file}
                  type={e.file.type}
                  ext={e.file.extension}
                  selectFlag={selectFlag}
                  selected={selected}
                  setSelected={setSelected}
                  selectItem={() => {
                    setSelectFlag((t) => !t);
                  }}
                  deleteItem={async () => {
                    await deleteFile(e._id);
                    setRefetch((t) => !t);
                  }}
                  renameItem={async (name) => {
                    await renameFile(e._id, name);
                    setRefetch((t) => !t);
                  }}
                  sendItem={() => {
                    // alert("sshjb")
                    setSelected((s) => [
                      ...s,
                      { file: e.file, userfile: e._id },
                    ]);
                    setSendFlag(true);
                  }}
                />
                {/* <button onClick={()=>{
            setMedia([...media,{id:e._id,folder:false}])
        }}>move</button> */}
                {/* <button onClick={()=>{
            deleteFile(e._id)
        }}>delete</button> */}
              </div>
            );
        })}
      {/* </div> */}
    </>
  );
};

export default FolderFiles;
