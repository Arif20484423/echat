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
  renameFile,
  sendMedia,
} from "@/lib/actions/storageActions";
import SelectedMenu from "./SelectedMenu";
const FolderFiles = ({ check, setChecked, fileClick }) => {
  const { user, socket } = useContext(Context);
  const [files, setFiles] = useState([]);
  const [sendFlag, setSendFlag] = useState(false);
  const [selectFlag, setSelectFlag] = useState(false);
  const [selected, setSelected] = useState([]);
  const [contacts, setContacts] = useState([]);

  async function send() {
    let { newMessages } = await sendMedia(selected, contacts, user);
    newMessages = JSON.parse(newMessages);
    for (let userid in newMessages) {
      if (userid != user._id) {
        for (let i = 0; i < newMessages[userid].length; i++) {
          socket.emit("message", {
            from: newMessages[userid][i].channel,
            to: userid,
            message: [newMessages[userid][i]],
          });
        }
      }
    }
    setSendFlag(false);
    setContacts([]);
    setSelectFlag(false);
    setSelected([]);
  }
  async function deleteMultiple() {
    deleteFiles(selected);
    setFiles((f) =>
      f.map((fe) => {
        for (let i = 0; i < selected.length; i++) {
          if (fe._id == selected[i]._id) {
            fe.delete = true;
            break;
          }
        }
        return fe;
      })
    );
    setSendFlag(false);
    setContacts([]);
    setSelectFlag(false);
    setSelected([]);
  }
  useEffect(() => {
    if (check) {
      setSelectFlag(true);
    }
    fetch("http://localhost:3000/api/user/photos", {
      method: "POST",
    })
      .then((d) => d.json())
      .then((d) => {
        setFiles(() => d.data);
      });
  }, []);

  return (
    <>
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
      {files.map((e) => {
        if (e.file && !e.delete)
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
                selectFile={() => {
                  if (setChecked) setChecked((c) => [...c, e]);
                  setSelected((c) => [...c, e]);
                }}
                deselectFile={() => {
                  if (setChecked)
                    setChecked((c) => c.filter((ce) => ce._id != e._id));
                  setSelected((c) => c.filter((ce) => ce._id != e._id));
                }}
                selectItem={() => {
                  setSelectFlag((t) => !t);
                }}
                deleteItem={async () => {
                  deleteFile(e._id);
                  setFiles((f) =>
                    f.map((fe) => {
                      if (fe._id == e._id) {
                        fe.delete = true;
                      }
                      return fe;
                    })
                  );
                }}
                renameItem={async (name) => {
                  renameFile(e._id, name);
                  setFiles((f) =>
                    f.map((fe) => {
                      if (fe._id == e._id) {
                        fe.name = name;
                      }
                      return fe;
                    })
                  );
                }}
                sendItem={() => {
                  setSelected((s) => [e]);
                  setSendFlag(true);
                }}
              />
            </div>
          );
      })}
    </>
  );
};

export default FolderFiles;
