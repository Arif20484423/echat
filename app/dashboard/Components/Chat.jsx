"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/app/_context/NoteContext";
import Forward from "./Forward";
import {
  addMessage,
  addMessageGroup,
  deleteForEveryoneMesssage,
  deleteForEveryoneMesssageGroup,
  deleteMesssage,
} from "@/lib/actions/chatActions";
// import { uploadfile } from "@/lib/actions/mediaactions";
var cryptojs = require("crypto-js");

const Chat = () => {
  const {
    toUser,
    user,
    messageNotification,
    setMessageNotification,
    socket,
    setConnectedRefetch,
  } = useContext(Context);
  const [message, setMessage] = useState("");
  const [forward, setForward] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedmsg, setSelectedMsg] = useState([]);
  const fileref = useRef(null);
  useEffect(() => {
    if (toUser) {
      // fetching messages for current user and channel according to second user as it will contain channel info
      fetch("/api/getmessages", {
        method: "POST",
        body: JSON.stringify({ channelid: toUser.channelid, user: user.id }),
      })
        .then((d) => d.json())
        .then((d) => {
          setMessages(d.data);
          console.log(d.data);
        });
    }
  }, [messageNotification, toUser]);
  useEffect(() => {
    if (messageNotification && messageNotification.from) {
      if (!toUser) {
        // refetch contacts
        setConnectedRefetch((t) => !t);
      } else {
        if (messageNotification.from !== toUser.id) {
          // refetch contacts
          setConnectedRefetch((t) => !t);
        } else {
          alert("same");
        }
      }
    }
  }, [messageNotification]);
  return (
    <>
      {forward ? (
        <Forward selectedmsg={selectedmsg} setForward={setForward}/>
      ) : (
        <div>
          <p>Chat</p>
          <p>{toUser && toUser.email}</p>
          <input
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <input type="file" name="" id="" ref={fileref} multiple />
          <button
            onClick={async () => {
              if (toUser.isgroup) {
                //for group adding different method to add messages
                fetch("/api/getchannelusers", {
                  method: "POST",
                  body: JSON.stringify({
                    channel: toUser.channelid,
                    user: user.id,
                  }),
                })
                  .then((d) => d.json())
                  .then(async (d) => {
                    const formData = new FormData();
                    for (let i = 0; i < fileref.current.files.length; i++) {
                      formData.append("files", fileref.current.files[i]);
                    }
                    if (message.length > 0) formData.append("message", message);
                    await addMessageGroup(
                      user.id, // for message creation and addition of message at users side in channelmessage (channelmessage comntains user channel specific message instance)
                      d.data, // for adding message to other group members in channelmessage
                      toUser.channelid,
                      formData
                    );
                    setMessageNotification(message); //mesagenotification to self to reload chats
                    socket.emit("groupmessage", {
                      to: d.data,
                      message: message,
                    }); //mesagenotification to other to reload chats
                  });
              } else {
                const formData = new FormData();
                for (let i = 0; i < fileref.current.files.length; i++) {
                  formData.append("files", fileref.current.files[i]);
                }
                if (message.length > 0) formData.append("message", message);

                await addMessage(
                  toUser.channelid,
                  user.id,
                  toUser.id,
                  formData
                );
                setMessageNotification(message); //mesagenotification to self to reload chats
                socket.emit("message", { to: toUser.id, message: message }); //mesagenotification to other to reload chats
              }
            }}
          >
            send
          </button>
          <button
            onClick={() => {
              setForward((f) => !f);
            }}
          >
            forward
          </button>

          {messages.map((e) => {
            if (e.message) {
              // if message exists (after deleteion message is not populated else populated)
              // then decrypt and print message also related ing=fo like if group group name else email and users related to message
              const bytes = cryptojs.AES.decrypt(
                e.message.message,
                process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
              );
              const decryptedMessage = bytes.toString(cryptojs.enc.Utf8);
              // self to get own message or others message for each separate message
              const self = user.id == e.message.user._id;

              if (!e.delete) {
                //if not deleted then only continue adding message to chat
                return (
                  <div
                    key={e._id}
                    onClick={() => {
                      setSelectedMsg((s) => [...s, e._id]);
                    }}
                  >
                    <p>{e.message.user.email}</p>
                    <p>{decryptedMessage}</p>
                    {e.file && <img src={e.file.file.file} alt="hjd" />}
                    <button
                      onClick={async () => {
                        await deleteMesssage(e._id);
                        setMessageNotification(e._id);
                      }}
                    >
                      delete
                    </button>
                    {self && (
                      <button
                        onClick={async () => {
                          // deleteion based on whether its a group message or one to one
                          if (toUser.isgroup) {
                            fetch("/api/getchannelusers", {
                              method: "POST",
                              body: JSON.stringify({
                                channel: toUser.channelid,
                              }),
                            })
                              .then((d) => d.json())
                              .then(async (d) => {
                                await deleteForEveryoneMesssageGroup(
                                  e._id, // deleting this specific message instance (at the users side user channel message will be deleted)
                                  d.data, // other members for which the message will be deleted via channel and message id help
                                  e.channel,
                                  e.message._id
                                );
                                setMessageNotification(e._id);
                              });
                          } else {
                            console.log("other");
                            await deleteForEveryoneMesssage(
                              e._id, // deleting this specific message instance (at the users side user channel message will be deleted)
                              e.channel, // other members for which the message will be deleted via channel and message id help
                              toUser.id,
                              e.message._id
                            );
                          }
                          setMessageNotification(e._id);
                        }}
                      >
                        delete for everyone
                      </button>
                    )}
                  </div>
                );
              }
            }
          })}
        </div>
      )}
    </>
  );
};

export default Chat;
