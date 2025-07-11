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
    toUser2,
    user,
    messageNotification,
    messages,
    setMessages,
    socket,
    setConnected,
  } = useContext(Context);

  const [forwarding, setForwarding] = useState(false);
  const [selectflag, setSelectflag] = useState(false);
  const [selected, setSelected] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [menuDrop, setMenuDrop] = useState(false);
  const menuRef = useRef(null);
  const [forward, setForward] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    if (toUser2 && user) {
      fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ channelid: toUser2.channelid, user: user._id }),
      })
        .then((d) => d.json())
        .then((d) => {
          setMessages(d.data);
        });
    }
  }, [messageNotification, toUser2, user]);
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
                let { newMessages } = await forwardMessage(
                  selected,
                  contacts,
                  user
                );
                setForwarding(false);
                newMessages = JSON.parse(newMessages);
                for (let i = 0; i < newMessages[user._id].length; i++) {
                  if (newMessages[user._id][i].channel == toUser2.channelid) {
                    setMessages((m) => [...m, newMessages[user._id][i]]);
                    setConnected((t) =>
                      t.map((e) => {
                        if (e.channelid == newMessages[user._id][i].channel) {
                          e = {
                            ...e,
                            ...newMessages[user._id][i].channelupdate,
                          };
                        }
                        return e;
                      })
                    );
                  } else {
                    setConnected((t) =>
                      t.map((e) => {
                        if (e.channelid == newMessages[user._id][i].channel) {
                          e = {
                            ...e,
                            ...newMessages[user._id][i].channelupdate,
                          };
                        }
                        return e;
                      })
                    );
                  }
                }

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
                setContacts([]);
                setSelected([]);
                setForward(false);
                setSelectflag(false);
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
                            setSelected([]); // added while cleaning
                          },
                        },
                        {
                          name: "Delete",
                          action: async () => {
                            let temp = [];
                            for (let j = 0; j < messages.length; j++) {
                              for (let i = 0; i < selected.length; i++) {
                                if (messages[j]._id == selected[i]._id) {
                                  messages[j].delete = true;
                                  break;
                                }
                              }
                              temp.push(messages[j]);
                            }
                            setMessages(temp);
                            deleteMultipleMesssage(selected);
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
                      selectMessage={() => {
                        setSelected((s) => [...s, e]);
                      }}
                      deselectMessage={() => {
                        setSelected((s) => s.filter((f) => f._id != e._id));
                      }}
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
                      selectMessage={() => {
                        setSelected((s) => [...s, e]);
                      }}
                      deselectMessage={() => {
                        setSelected((s) => s.filter((f) => f._id != e._id));
                      }}
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
                      selectMessage={() => {
                        setSelected((s) => [...s, e]);
                      }}
                      deselectMessage={() => {
                        setSelected((s) => s.filter((f) => f._id != e._id));
                      }}
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
                      selectMessage={() => {
                        setSelected((s) => [...s, e]);
                      }}
                      deselectMessage={() => {
                        setSelected((s) => s.filter((f) => f._id != e._id));
                      }}
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
          }
        }
      })}
    </div>
  );
};

export default Messages;
