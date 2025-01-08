"use client";
import { Context } from "@/app/_context/NoteContext";
import {
  addMessage,
  addMessageGroup,
  deleteForEveryoneMesssage,
  deleteForEveryoneMesssageGroup,
  deleteMesssage,
} from "@/lib/actions/chatActions";
import React, { useContext, useEffect, useState } from "react";
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
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (toUser) {
      fetch("/api/getmessages", {
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
        } else {
          alert("same");
        }
      }
    }
  }, [messageNotification]);
  return (
    <div>
      <p>Chat</p>
      <p>{toUser && toUser.email}</p>
      <input
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          if(toUser.isgroup){
            
            fetch("/api/getchannelusers",{
                method:"POST",
                body:JSON.stringify({channel:toUser.channelid,user:user.id})
            }).then(d=>d.json()).then(async (d)=>{
                await addMessageGroup(user.id,d.data,toUser.channelid,message);
                setMessageNotification(message);
                socket.emit("groupmessage",{to:d.data,message:message})
            })
          }
          else{
            await addMessage(toUser.channelid, user.id, toUser.id, message);
            setMessageNotification(message);
            socket.emit("message", { to: toUser.id, message: message });
          }
          
        }}
      >
        send
      </button>

      {messages.map((e) => {
        if (e.message) {
          const bytes = cryptojs.AES.decrypt(
            e.message.message,
            process.env.NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
          );
          const decryptedMessage = bytes.toString(cryptojs.enc.Utf8);
          const self = user.id == e.message.user._id;
          if (!e.delete) {
            return (
              <div>
                <p>{e.message.user.email}</p>
                <p>{decryptedMessage}</p>
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
                      if(toUser.isgroup){
            fetch("/api/getchannelusers",{
                method:"POST",
                body:JSON.stringify({channel:toUser.channelid})
            }).then(d=>d.json()).then(async (d)=>{
               await deleteForEveryoneMesssageGroup(e._id,d.data,e.channel,e.message._id)
               setMessageNotification(e._id);
            })
                      }
                      else{
                        console.log("other")
                        await deleteForEveryoneMesssage(
                        e._id,
                        e.channel,
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
  );
};

export default Chat;
