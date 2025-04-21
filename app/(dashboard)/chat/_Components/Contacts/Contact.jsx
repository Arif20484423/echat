"use client";
import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./Contacts.module.css";
import { VscKebabVertical } from "react-icons/vsc";
import { Context } from "@/app/_context/NoteContext";
import Dropdown from "@/app/_UIComponents/Dropdown";
import { deleteChat } from "@/lib/actions/chatActions";
const Contact = ({
  check,
  setContacts,
  contacts,
  connections,
  name,
  email = "",
  id = "",
  userchatid,
  channelid,
  description,
  image = "",
  isgroup,
  select,
  setSelect,
  lastSeen,
  lastMessage,
}) => {
  const { toUser, setToUser, setMessageNotification, setConnectedRefetch } =
    useContext(Context);
  const [options, setOptions] = useState(false);
  const [newMwssage, setNewMessage] = useState(true);
  const dropRef = useRef(null);
  const dropPointerRef = useRef(null);

  async function deletechat() {
    await deleteChat(userchatid);
    setConnectedRefetch((t) => !t);
  }
  async function selectchat() {
    setSelect((t) => !t);
    setOptions(false);
  }
  function handleClick(e) {
    if (
      dropPointerRef.current &&
      !dropPointerRef.current.contains(e.target) &&
      dropRef.current &&
      !dropRef.current.contains(e.target)
    ) {
      setOptions(false);
    }
  }
  useEffect(() => {
    
    document.addEventListener("click", handleClick);
    return async () => {
      console.log("wrapping up");
      
      console.log("wrapped up");
    };
  }, []);
  if (isgroup) {
    return (
      <div
        className={styles.contactbox}
        onClick={() => {
          setToUser({
            isgroup: true,
            channelid: channelid,
            description: description,
            name: name,
            image: image,
          });
        }}
      >
        {check && (
          <input
            type="checkbox"
            className={styles.check}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              e.stopPropagation();

              console.log("conn", connections);

              if (e.target.checked) {
                setContacts((c) => [
                  ...c,
                  {
                    connections: connections,
                    isgroup: true,
                    channelid: channelid,
                  },
                ]);
              } else {
                console.log("contacts", contacts);
                let filtered = contacts.filter((e) => {
                  console.log(e);
                  return e.channelid != channelid;
                });
                console.log("filtered", filtered);
                setContacts(filtered);
              }
            }}
          />
        )}
        <img src={image} alt="profile" className={styles.profilepic} />
        <div className={styles.detailbox}>
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.email}>{email}</p>
          </div>

          <VscKebabVertical
            ref={dropPointerRef}
            onClick={(e) => {
              e.stopPropagation();
              setOptions(!options);
            }}
          />

          {options && (
            <div ref={dropRef} className={styles.dropdowncontainer}>
              <Dropdown options={[{ name: "delete", action: deletechat }]} />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={styles.contactbox}
        onClick={() => {
          setToUser({
            id: id,
            email: email,
            channelid: channelid,
            description: description,
            name: name,
            image: image,
          });
        }}
      >
        {check && (
          <input
            type="checkbox"
            className={styles.check}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              e.stopPropagation();

              console.log("conn", connections);

              if (e.target.checked) {
                setContacts((c) => [
                  ...c,
                  {
                    connections: connections,
                    isgroup: false,
                    channelid: channelid,
                  },
                ]);
              } else {
                console.log("contacts", contacts);
                let filtered = contacts.filter((e) => {
                  console.log(e);
                  return e.channelid != channelid;
                });
                console.log("filtered", filtered);
                setContacts(filtered);
              }
            }}
          />
        )}
        <img src={image} alt="profile" className={styles.profilepic} />
        <div className={styles.detailbox}>
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.email}>{email}</p>
          </div>

          <div className={styles.options}>
            {lastSeen < lastMessage && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="15px"
                fill="#05c502"
              >
                <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            )}
            <VscKebabVertical
              ref={dropPointerRef}
              onClick={(e) => {
                e.stopPropagation();
                setOptions(!options);
              }}
            />
          </div>

          {options && (
            <div ref={dropRef} className={styles.dropdowncontainer}>
              <Dropdown options={[{ name: "delete", action: deletechat }]} />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Contact;
