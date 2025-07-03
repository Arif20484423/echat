"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import Sent from "./Sent";
import Received from "./Received";
import styles from "./Chat.module.css";
import Dropdown from "@/app/_UIComponents/Dropdown";
import Popup from "@/app/_UIComponents/Popup";
import OutClick from "@/app/_UIComponents/OutClick";
import Contacts from "../Contacts/Contacts";
import { Context } from "@/app/_context/NoteContext";
import ScrollDown from "./ScrollDown";
import {
  deleteMultipleMesssage,
  forwardMessage,
} from "@/lib/actions/chatActions";
var cryptojs = require("crypto-js");
const Messages = () => {
  const {
    toUser,
    user,
    messageNotification,
    setMessageNotification,
    setConnectedRefetch,
    socket
  } = useContext(Context);

  const [forwarding, setForwarding] = useState(false);
  const [selectflag, setSelectflag] = useState(false);
  const [selected, setSelected] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [menuDrop, setMenuDrop] = useState(false);
  const menuRef = useRef(null);
  const [forward, setForward] = useState(false);
  const [messages, setMessages] = useState([]);

  const ref = useRef(null);
  useEffect(() => {
    if (user && toUser) {
      // fetching messages for current user and channel according to second user as it will contain channel info
      fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ channelid: toUser.channelid, user: user.id }),
      })
        .then((d) => d.json())
        .then((d) => {
          console.log("Messages ",d.data);
          setMessages(d.data);
        });
    }
  }, [messageNotification, user, toUser]);
  // useEffect(() => {
  //   if (messageNotification && messageNotification.from) {
  //     if (!toUser) {
  //       // refetch contacts
  //       setConnectedRefetch((t) => !t);
  //     } else {
  //       if (messageNotification.from !== toUser.id) {
  //         // refetch contacts
  //         setConnectedRefetch((t) => !t);
  //       }
  //     }
  //   }
  // }, [messageNotification]);

  // useEffect(()=>{
  //   alert("op")
  //   ref.current.scrollTop=ref.current.scrollHeight;
  // },[])
  useEffect(() => {
    // console.log(selected);
  }, [selected]);

  return (
    <div className={styles.messages} ref={ref}>
      {forward && (
        <Popup>
          <div className={styles.contactbox}>
            <div className={styles.forwardcontacts}>
              <Contacts
                check={true}
                setContacts={setContacts}
                contacts={contacts}
              />
            </div>
            <button
              className={styles.send}
              onClick={async () => {
                setForwarding(true);
                await forwardMessage(selected, contacts, user.id);
                setForwarding(false);
                const emitUsers = [];
                // console.log(contacts)
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
                setSelected([]);
                setForward(false);
                setSelectflag(false);
                
                socket.emit("messagemultiple", {
                  to: emitUsers,
                  message: "new Message",
                }); //mesagenotification to other to reload chats
              }}
              disabled={forwarding}
            >
              {forwarding ? "Forwarding" : "Forward"}
            </button>
            <button
              className={styles.cancel}
              onClick={() => {
                setSelected([]);
                setForward(false);
                setContacts([]);
              }}
            >
              Cancel
            </button>
          </div>
        </Popup>
      )}

      <div className={styles.selectmenu}>
        <svg
          onClick={() => {
            setMenuDrop((t) => !t);
          }}
          ref={menuRef}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffffff"
        >
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </svg>
        {menuDrop && (
          <div className={styles.selectdrop}>
            <OutClick show={menuDrop} setShow={setMenuDrop} caller={menuRef}>
              <Dropdown
                options={
                  selectflag
                    ? [
                        {
                          name: "Cancel",
                          action: () => {
                            setSelectflag(false);
                          },
                        },
                        {
                          name: "Delete",
                          action: async () => {
                            await deleteMultipleMesssage(selected);
                            setMessageNotification((t) => !t);
                            setSelectflag(false);
                            setMenuDrop(false);
                            setSelected([]);
                          },
                        },
                        {
                          name: "Forward",
                          action: () => {
                            setMenuDrop(false);
                            setSelectflag(false);
                            setForward(true);
                          },
                        },
                      ]
                    : [
                        {
                          name: "Select",
                          action: () => {
                            setSelectflag(true);
                          },
                        },
                      ]
                }
              />
            </OutClick>
          </div>
        )}
      </div>
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
                      userfileid={e.file ? e.file._id : undefined}
                      fileid={e.file ? e.file.file._id : undefined}
                      username={user.name}
                      message={decryptedMessage}
                      selectflag={selectflag}
                      setSelectflag={setSelectflag}
                      selected={selected}
                      setSelected={setSelected}
                      forward={forward}
                      setForward={setForward}
                      file={e.file ? e.file.file.file : null}
                      name={e.file ? e.file.name : null}
                      time={e.time}
                      type={e.file ? e.file.file.type : null}
                      extension={e.file ? e.file.file.extension : null}
                    />
                    <ScrollDown />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={e._id}>
                    <Received
                      id={e._id}
                      messageid={e.message._id}
                      userfileid={e.file ? e.file._id : undefined}
                      fileid={e.file ? e.file.file._id : undefined}
                      username={e.message.user.name}
                      message={decryptedMessage}
                      selectflag={selectflag}
                      setSelectflag={setSelectflag}
                      selected={selected}
                      setSelected={setSelected}
                      forward={forward}
                      setForward={setForward}
                      file={e.file ? e.file.file.file : null}
                      name={e.file ? e.file.name : null}
                      time={e.time}
                      type={e.file ? e.file.file.type : null}
                      extension={e.file ? e.file.file.extension : null}
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
                      userfileid={e.file ? e.file._id : undefined}
                      fileid={e.file ? e.file.file._id : undefined}
                      username={user.name}
                      message={decryptedMessage}
                      selectflag={selectflag}
                      setSelectflag={setSelectflag}
                      selected={selected}
                      setSelected={setSelected}
                      forward={forward}
                      setForward={setForward}
                      file={e.file ? e.file.file.file : null}
                      name={e.file ? e.file.name : null}
                      time={e.time}
                      type={e.file ? e.file.file.type : null}
                      extension={e.file ? e.file.file.extension : null}
                    />
                    <ScrollDown />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={e._id}>
                    <Received
                      id={e._id}
                      messageid={e.message._id}
                      userfileid={e.file ? e.file._id : undefined}
                      fileid={e.file ? e.file.file._id : undefined}
                      username={e.message.user.name}
                      message={decryptedMessage}
                      selectflag={selectflag}
                      setSelectflag={setSelectflag}
                      selected={selected}
                      setSelected={setSelected}
                      forward={forward}
                      setForward={setForward}
                      file={e.file ? e.file.file.file : null}
                      name={e.file ? e.file.name : null}
                      time={e.time}
                      type={e.file ? e.file.file.type : null}
                      extension={e.file ? e.file.file.extension : null}
                    />
                    <ScrollDown />
                  </React.Fragment>
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
                                // console.log("other");
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
