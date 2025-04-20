"use client";
import React, { useContext, useRef, useState, useEffect } from "react";
import styles from "./Chat.module.css";
import compStyles from "../Component.module.css";
import Messages from "./Messages";
import FileUi from "../Files/FileUi";
import Dropdown from "@/app/_UIComponents/Dropdown";
import OutClick from "@/app/_UIComponents/OutClick";
import StorageLayout from "@/app/(dashboard)/storage/_Components/layout/StorageLayout";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Popup from "@/app/_UIComponents/Popup";
import { Context } from "@/app/_context/NoteContext";
import { useRouter } from "next/navigation";
import { sendStorageMedia } from "@/lib/actions/chatActions";
export default function Chat({ setChatPage }) {
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  const [message, setMessage] = useState("");
  let [selectedFiles, setSelectedFiles] = useState([]);
  const [emojiSelect, setEmojiSelect] = useState(false);
  const fileref = useRef(null);
  const [selectedStorageFiles, setSelectedStorageFiles] = useState([]);
  const [storageDrop, setStorageDrop] = useState(false);
  const [showStorage, setShowStorage] = useState(false);
  const storageRef = useRef(null);
  const { toUser, user, setMessageNotification, socket } = useContext(Context);

  async function sendMessage() {
    if (message != "") {
      if (toUser.isgroup) {
        console.log("group");
        //for group adding different method to add messages
        const res = await fetch("/api/channel/users", {
          method: "POST",
          body: JSON.stringify({ user: user.id, channelid: toUser.channelid }),
        });
        const data = await res.json();
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("files", selectedFiles[i].file);
        }
        for (let i = 0; i < data.data.length; i++) {
          formData.append("toUsers", data.data[i]);
        }
        if (message.length > 0) formData.append("message", message);
        formData.append("user", user.id);
        formData.append("channelid", toUser.channelid);
        const resmessage = await fetch("/api/group/message", {
          method: "POST",
          body: formData,
        });
        if (resmessage.redirected) {
          router.replace(resmessage.url);
        }

        setMessageNotification((f) => !f); //mesagenotification to self to reload chats
        setSelectedFiles([]);
        socket.emit("groupmessage", {
          to: data.data,
          message: message,
        }); //mesagenotification to other to reload chats
      } else {
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("files", selectedFiles[i].file);
        }
        if (message.length > 0) formData.append("message", message);

        formData.append("channel", toUser.channelid);
        formData.append("user", user.id);
        formData.append("touser", toUser.id);
        const res = await fetch("/api/message", {
          method: "POST",
          body: formData,
        });
        if (res.redirected) {
          router.replace(res.url);
        }
        const d = await res.json();
        setMessageNotification((m) => !m); //mesagenotification to self to reload chats
        setSelectedFiles([]);
        socket.emit("message", { to: toUser.id, message: message }); //mesagenotification to other to reload chats
      }
    }
  }

  useEffect(() => {
    console.log(selectedStorageFiles);
  }, [selectedStorageFiles]);
  return (
    <div className={styles.chatbox}>
      {
        showStorage && <Popup>
        <div className={styles.storagebox}>
          <div className={styles.storage}>
            <StorageLayout
              check={true}
              setChecked={setSelectedStorageFiles}
            ></StorageLayout>
          </div>
          <button
            className={styles.sendstoragebutton}
            onClick={async () => {
              const res = await fetch("/api/channel/users", {
                method: "POST",
                body: JSON.stringify({
                  user: user.id,
                  channelid: toUser.channelid,
                }),
              });
              const data = await res.json();
              console.log(data.data)
              await sendStorageMedia(selectedStorageFiles,toUser.channelid,data.data,user.id)
              setShowStorage(false);
              setMessageNotification((t)=>!t)
            }}
          >
            {" "}
            Send
          </button>
        </div>
      </Popup>
      }

      <div
        className={styles.chatheader}
        onClick={() => {
          setChatPage(2);
        }}
      >
        <div className={styles.userinfo}>
          <img
            src={toUser ? toUser.image : "/profile.jpg"}
            alt="img"
            className={styles.userimage}
          />
          <div>
            {toUser && (
              <>
                <p className={styles.name}>{toUser.name}</p>
                <p className={styles.desc}>{toUser.email}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <Messages />
      <div className={styles.messagebox}>
        <div className={styles.selectedfiles}>
          {selectedFiles.length > 0 && (
            <svg
              onClick={() => {
                selectedFiles = [];
                setSelectedFiles(() => selectedFiles);
              }}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#00000"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          )}
          {selectedFiles.map((e) => {
            return (
              <FileUi
                key={e.link}
                link={e.link}
                type={e.type}
                extension={e.extension}
              />
            );
          })}
        </div>
        <input
          type="file"
          className={styles.file}
          ref={fileref}
          onChange={async (e) => {
            selectedFiles = [];
            console.log(fileref.current.files);

            for (let i = 0; i < fileref.current.files.length; i++) {
              const f = fileref.current.files[i];
              const details = f.type.split("/");
              const type = details[0];
              const ext = details[1];
              selectedFiles.push({
                link: window.URL.createObjectURL(f),
                type: type,
                extension: ext,
                file: fileref.current.files[i],
              });
            }
            fileref.current.value = "";
            setSelectedFiles(() => selectedFiles);
          }}
          multiple
        />

        {emojiSelect && (
          <div className={styles.emojibox}>
            <Picker
              data={data}
              onEmojiSelect={(e) => {
                setMessage((m) => m + e.native);
              }}
              emojiSize={30}
              theme="light"
              previewPosition="none"
              onClickOutside={() => {
                setEmojiSelect((e) => !e);
              }}
            />
          </div>
        )}
        <svg
          onClick={() => {
            setEmojiSelect((e) => !e);
          }}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <g>
            <rect fill="none" height="24" width="24" />
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <g />
            <path d="M11.99,2C6.47,2,2,6.48,2,12c0,5.52,4.47,10,9.99,10C17.52,22,22,17.52,22,12C22,6.48,17.52,2,11.99,2z M8.5,8 C9.33,8,10,8.67,10,9.5S9.33,11,8.5,11S7,10.33,7,9.5S7.67,8,8.5,8z M16.71,14.72C15.8,16.67,14.04,18,12,18s-3.8-1.33-4.71-3.28 C7.13,14.39,7.37,14,7.74,14h8.52C16.63,14,16.87,14.39,16.71,14.72z M15.5,11c-0.83,0-1.5-0.67-1.5-1.5S14.67,8,15.5,8 S17,8.67,17,9.5S16.33,11,15.5,11z" />
          </g>
        </svg>
        <div>
          {storageDrop && (
            <div className={styles.storagedrop}>
              <OutClick
                show={storageDrop}
                setShow={setStorageDrop}
                caller={storageRef}
              >
                <Dropdown
                  options={[
                    {
                      name: "storage",
                      action: () => {
                        setShowStorage(true);
                      },
                    },
                    {
                      name: "device",
                      action: () => {
                        fileref.current.click();
                      },
                    },
                  ]}
                />
              </OutClick>
            </div>
          )}
          <svg
            ref={storageRef}
            onClick={() => {
              // fileref.current.click();
              setStorageDrop((t) => !t);
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M16.5 6.75v10.58c0 2.09-1.53 3.95-3.61 4.15-2.39.23-4.39-1.64-4.39-3.98V5.14c0-1.31.94-2.5 2.24-2.63 1.5-.15 2.76 1.02 2.76 2.49v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6.75c0-.41-.34-.75-.75-.75s-.75.34-.75.75v8.61c0 1.31.94 2.5 2.24 2.63 1.5.15 2.76-1.02 2.76-2.49V5.17c0-2.09-1.53-3.95-3.61-4.15C9.01.79 7 2.66 7 5v12.27c0 2.87 2.1 5.44 4.96 5.71 3.29.3 6.04-2.26 6.04-5.48V6.75c0-.41-.34-.75-.75-.75s-.75.34-.75.75z" />
          </svg>
        </div>
        <input
          type="text"
          onKeyUp={async (e) => {
            if (e.key == "Enter") {
              await sendMessage();
              setMessage(() => "");
            }
          }}
          className={compStyles.input}
          style={{ width: "80%" }}
          placeholder="your message here"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <svg
          onClick={async () => {
            await sendMessage();
            setMessage(() => "");
          }}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
        </svg>
      </div>
    </div>
  );
}
