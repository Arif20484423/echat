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
  pathFolders,
  setPathFolders,
  pos,
  setPos,
  lastPos,
  setLastPos,
  refetch,
  setRefetch,
  check,
  setChecked,
}) => {
  const { user } = useContext(Context);
  // console.log("userin ",user)
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
    setContacts([]);
    setSelectFlag(false);
    setSelected([]);
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
    if (check) {
      setChecked(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (check) {
      setSelectFlag(true);
    }
    if (pos >= 0) {
      //   console.log(pathFolders)
      //   console.log(pos)
      fetch("/api/user/folders", {
        method: "POST",
        body: JSON.stringify({ folder: pathFolders[pos]._id }),
      })
        .then((d) => d.json())
        .then((d) => {
          // console.log(d.data);
          setFolders(d.data);
        });
      fetch("/api/user/files", {
        method: "POST",
        body: JSON.stringify({ folder: pathFolders[pos]._id }),
      })
        .then((d) => d.json())
        .then((d) => {
          setFiles(d.data);
          // console.log("datafiles", d.data);
        });
    }
  }, [pos, refetch]);

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
              Send
            </button>
            <button className={styles.cancel} onClick={()=>{
              setSendFlag(false)
              setContacts([])
              setSelected([])
              setSelectFlag(false)
            }}>
              Cancel
            </button>
          </div>
        </Popup>
      )}
      {selectFlag && (
        <SelectedMenu
          setSelectFlag={setSelectFlag}
          send={() => {
            setSelectFlag(false)
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

      {folders &&
        folders.map((e, i) => {
          return (
            <div key={e._id}>
              <div
                onDoubleClick={() => {
                  if (pos == lastPos) {
                    if (pathFolders[pos].parentfolder !== e.parentfolder) {
                      const newpathFolders = [...pathFolders, e];
                      sessionStorage.setItem(
                        "pathFolders",
                        JSON.stringify(newpathFolders)
                      );
                      sessionStorage.setItem("pos", JSON.stringify(pos + 1));
                      sessionStorage.setItem(
                        "lastPos",
                        JSON.stringify(lastPos + 1)
                      );
                      setPathFolders(newpathFolders);
                      setPos((p) => p + 1);
                      setLastPos((p) => p + 1);
                    }
                  } else {
                    let slicePathFolders = pathFolders.slice(0, pos + 1);
                    slicePathFolders = [...slicePathFolders, e];
                    sessionStorage.setItem(
                      "pathFolders",
                      JSON.stringify(slicePathFolders)
                    );
                    sessionStorage.setItem("pos", JSON.stringify(pos + 1));
                    sessionStorage.setItem("lastPos", JSON.stringify(pos + 1));

                    setPathFolders(slicePathFolders);
                    setPos(() => pos + 1);
                    setLastPos(() => pos + 1);
                  }
                }}
              >
                <StorageItem
                  type="folder"
                  name={e.name}
                  editable={!(e.name == "upload" || e.name == "received")}
                  deleteItem={async () => {
                    await deleteFolder(e._id);
                    setRefetch((t) => !t);
                  }}
                  renameItem={async (name) => {
                    await renameFolder(e._id, name);
                    setRefetch((t) => !t);
                  }}
                />
              </div>
              {/* <button >delete</button> */}
            </div>
          );
        })}
      {files &&
        files.map((e) => {
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
                  setSelected((s) => [...s, { file: e.file, userfile: e._id }]);
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
