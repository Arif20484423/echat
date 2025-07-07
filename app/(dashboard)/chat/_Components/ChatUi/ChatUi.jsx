"use client";
import React, { useContext, useRef, useState, useEffect } from "react";
import styles from "./Chat.module.css";
import compStyles from "../Component.module.css";
import Messages from "./Messages";
import FileUi from "../Files/FileUi";
import Dropdown from "@/app/_UIComponents/Dropdown";
import OutClick from "@/app/_UIComponents/OutClick";
import StorageLayout from "@/app/(dashboard)/storage/_Components/StorageLayout";
import data from "@emoji-mart/data";
import Skeleton from "./Skeleton";
import Picker from "@emoji-mart/react";
import Popup from "@/app/_UIComponents/Popup";
import { Context } from "@/app/_context/NoteContext";
import { useRouter } from "next/navigation";
import { sendStorageMedia } from "@/lib/actions/chatActions";
import { supabase } from "@/app/_Components/SupabaseClient";
export default function Chat({ setChatPage }) {
  const router = useRouter();
  const messageRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [client, setClient] = useState(false);
  let [selectedFiles, setSelectedFiles] = useState([]);
  const [emojiSelect, setEmojiSelect] = useState(false);
  const fileref = useRef(null);
  const [selectedStorageFiles, setSelectedStorageFiles] = useState([]);
  const [storageDrop, setStorageDrop] = useState(false);
  const [showStorage, setShowStorage] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const storageRef = useRef(null);
  const {
    toUser2,
    user,
    socket,
    setMessages,
    setConnected,
  } = useContext(Context);

  async function getFileLink(file) {
    let imagelink = null;
    const imageid = Math.random() * 1000000;
    // uploading file to supabase
    const { data, error } = await supabase.storage
      .from("echat public")
      .upload("public/" + imageid, file);
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

  async function sendMessage() {
    const message = messageRef.current.value;
    if (message != "") {
      if (toUser2.isgroup) {
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("files", JSON.stringify(selectedFiles[i]));
        }
        const data = [];
        for (let i = 0; i < toUser2.connections.length; i++) {
          formData.append(
            "toUsers",
            JSON.stringify(toUser2.connections[i].user)
          );
          data.push(toUser2.connections[i].user._id);
        }
        formData.append("message", message);
        formData.append("user", JSON.stringify(user));
        formData.append("channelid", toUser2.channelid);
        const res = await fetch("/api/group/message", {
          method: "POST",
          body: formData,
        });
        if (res.redirected) {
          router.replace(res.url);
        }
        const d = await res.json();
        setMessages((m) => [...m, ...d.newMessages[user._id]]);
        setConnected((t) =>
          t.map((e) => {
            if (e.channelid == toUser2.channelid) {
              e = {
                ...e,
                ...d.newMessages[user._id][d.newMessages[user._id].length - 1]
                  .channelupdate,
              };
            }
            return e;
          })
        );
        setSelectedFiles([]);
        for (let i = 0; i < data.length; i++) {
          socket.emit("message", {
            from: toUser2.channelid,
            to: data[i],
            message: d.newMessages[data[i]],
          });
        }
      } else {
        const formData = new FormData();
        formData.append("message", message);
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("files", JSON.stringify(selectedFiles[i]));
        }
        formData.append("channel", toUser2.channelid);
        formData.append("user", JSON.stringify(user));
        formData.append("touser", JSON.stringify(toUser2.connections[0].user));
        const res = await fetch("/api/message", {
          method: "POST",
          body: formData,
        });
        if (res.redirected) {
          router.replace(res.url);
        }
        const d = await res.json();
        setMessages((m) => [...m, ...d.newMessages[user._id]]);
        setConnected((t) =>
          t.map((e) => {
            if (e.channelid == toUser2.channelid) {
              e = {
                ...e,
                ...d.newMessages[user._id][d.newMessages[user._id].length - 1]
                  .channelupdate,
              };
            }
            return e;
          })
        );
        setSelectedFiles([]);
        const emitUsers = [];

        emitUsers.push(toUser2.connections[0].user._id);
        socket.emit("message", {
          from: toUser2.channelid,
          to: emitUsers,
          message: d.newMessages[toUser2.connections[0].user._id],
        });        
      }
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem("toUser")) {
      setClient(true);
    }
  }, []);

  if (toUser2 == null) {
    if (client) {
      return <></>;
    } else {
      return <Skeleton />;
    }
  } else {
    return (
      <div className={styles.chatbox}>
        {showStorage && (
          <Popup>
            <div className={styles.storagebox}>
              <div className={styles.storage}>
                <StorageLayout
                  check={true}
                  setChecked={setSelectedStorageFiles}
                ></StorageLayout>
              </div>
              <button
                className={styles.send}
                onClick={async () => {
                  setShowStorage(false);
                  setSending(true);
                  let { newMessages } = await sendStorageMedia(
                    selectedStorageFiles,
                    toUser2,
                    user
                  );
                  newMessages = JSON.parse(newMessages);
                  setMessages((m) => [...m, ...newMessages[user._id]]);
                  setConnected((t) =>
                    t.map((e) => {
                      if (e.channelid == toUser2.channelid) {
                        e = {
                          ...e,
                          ...newMessages[user._id][
                            newMessages[user._id].length - 1
                          ].channelupdate,
                        };
                      }
                      return e;
                    })
                  );
                  for (let i = 0; i < toUser2.connections.length; i++) {
                    socket.emit("message", {
                      from: toUser2.channelid,
                      to: toUser2.connections[i].user._id,
                      message: newMessages[toUser2.connections[i].user._id],
                    });
                  }
                  setSelectedStorageFiles([]);
                  setSending(false);
                }}
              >
                {" "}
                Send
              </button>
              <button
                className={styles.cancel}
                onClick={() => {
                  setShowStorage(false);
                  setSelectedStorageFiles([]);
                }}
              >
                Cancel
              </button>
            </div>
          </Popup>
        )}

        <div
          className={styles.chatheader}
          onClick={() => {
            setChatPage(2);
          }}
        >
          <div className={styles.userinfo}>
            <img
              src={
                toUser2
                  ? toUser2.isgroup
                    ? toUser2.group[0].image
                      ? toUser2.group[0].image.file
                      : "/profile.jpg"
                    : toUser2.connections[0].user.image
                    ? toUser2.connections[0].user.image
                    : "/profile.jpg"
                  : "/profile.jpg"
              }
              alt="img"
              className={styles.userimage}
            />
            <div>
              {toUser2 && (
                <>
                  <p className={styles.name}>
                    {toUser2.isgroup
                      ? toUser2.group[0].name
                      : toUser2.connections[0].user.name}
                  </p>
                  <p className={styles.desc}>
                    {toUser2.isgroup
                      ? toUser2.group[0].email
                      : toUser2.connections[0].user.email}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <Messages />
        <div className={styles.messagebox}>
          <div className={styles.selectedfiles}>
            {loadingFiles && (
              <div style={{ margin: "20px" }}>
                <img src="imageloader.gif" alt="hag" width="40px" />
              </div>
            )}

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
              setLoadingFiles(true);
              selectedFiles = [];
              // console.log(fileref.current.files);

              for (let i = 0; i < fileref.current.files.length; i++) {
                const f = fileref.current.files[i];
                const details = f.type.split("/");
                const type = details[0];
                const extension = details[1];
                const name = f.name;
                const { link } = await getFileLink(f);

                selectedFiles.push({
                  name,
                  type,
                  extension,
                  link,
                });
              }
              fileref.current.value = "";
              setLoadingFiles(false);
              setSelectedFiles(() => selectedFiles);
            }}
            multiple
          />

          {emojiSelect && (
            <div className={styles.emojibox}>
              <Picker
                data={data}
                onEmojiSelect={(e) => {
                  messageRef.current.value =
                    messageRef.current.value + e.native;
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
            ref={messageRef}
            onKeyUp={async (e) => {
              if (e.key == "Enter") {
                setSending(true);
                await sendMessage();
                setSending(false);
                messageRef.current.value = "";
              }
            }}
            className={compStyles.input}
            style={{ width: "80%" }}
            placeholder="your message here"
          />

          {sending ? (
            <img src="/loader.svg" alt="sending" width={40} />
          ) : (
            <svg
              onClick={async () => {
                setSending(true);
                await sendMessage();

                setSending(false);
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
          )}
        </div>
      </div>
    );
  }
}
