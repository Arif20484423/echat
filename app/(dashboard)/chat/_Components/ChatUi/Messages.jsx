"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import Sent from "./Sent";
import Received from "./Received";
import styles from "./Chat.module.css";
import { Context } from "@/app/_context/NoteContext";
import ScrollDown from "./ScrollDown";
var cryptojs = require("crypto-js");
const Messages = () => {
  const {
    toUser,
    user,
    messageNotification,
    setMessageNotification,
    setConnectedRefetch,
  } = useContext(Context);
  const [down, setDown] = useState(false);
  const [forward, setForward] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedmsg, setSelectedMsg] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    if (toUser) {
      // fetching messages for current user and channel according to second user as it will contain channel info
      fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ channelid: toUser.channelid, user: user.id }),
      })
        .then((d) => d.json())
        .then((d) => {
          console.log(d.data);
          setMessages(d.data);
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
        }
      }
    }
  }, [messageNotification]);

  // useEffect(()=>{
  //   alert("op")
  //   ref.current.scrollTop=ref.current.scrollHeight;
  // },[])

  return (
    <div className={styles.messages} ref={ref}>
      {messages.map((e, i) => {
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
            if (i == messages.length - 1) {
              if (self) {
                return (
                  <React.Fragment key={e._id}>
                    <Sent
                      id={e._id}
                      messageid={e.message._id}
                      username={user.name}
                      message={decryptedMessage}
                      file={e.file ? e.file.file.file : null}
                      name={e.file ? e.file.name : null}
                      time={e.time}
                      type={e.file ? e.file.file.type:null}
                    extension={e.file ? e.file.file.extension: null}
                    />
                    <ScrollDown />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={e._id}>
                    <Received
                    id={e._id}
                      username={e.message.user.name}
                      message={decryptedMessage}
                      file={e.file ? e.file.file.file : null}
                      name={e.file ? e.file.name : null}
                      time={e.time}
                      type={e.file ? e.file.file.type:null}
                      extension={e.file ? e.file.file.extension: null}
                    />
                    <ScrollDown />
                  </React.Fragment>
                );
              }
            } else {
              if (self) {
                return (
                  <React.Fragment key={e._id}>
                  <Sent
                    
                    id={e._id}
                    messageid={e.message._id}
                    username={user.name}
                    message={decryptedMessage}
                    file={e.file ? e.file.file.file : null}
                    name={e.file ? e.file.name : null}
                    time={e.time}
                    type={e.file ? e.file.file.type:null}
                    extension={e.file ? e.file.file.extension: null}
                  />
                  <ScrollDown /></React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={e._id}>
                  <Received
                    
                    id={e._id}
                    username={e.message.user.name}
                    message={decryptedMessage}
                    file={e.file ? e.file.file.file : null}
                    name={e.file ? e.file.name : null}
                    time={e.time}
                    type={e.file ? e.file.file.type:null}
                    extension={e.file ? e.file.file.extension: null}
                  />
                  <ScrollDown /></React.Fragment>
                );
              }
            }

            {
              /* return (
                      <div
                        key={e._id}
                        onClick={() => {
                          setSelectedMsg((s) => [...s, e._id]);
                        }}
                      >
                        <p>{e.message.user.name}</p>
                        <p>{decryptedMessage}</p>
                        {e.file && !e.file.delete && <img src={e.file.file.file} alt="hjd" />}
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
             
                    ); */
            }
          }
        }
      })}
    </div>
  );
};

export default Messages;
