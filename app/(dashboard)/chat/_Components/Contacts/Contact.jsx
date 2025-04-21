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
}) => {
  const { setToUser, setMessageNotification, setConnectedRefetch } = useContext(Context);
  const [options, setOptions] = useState(false);
  const dropRef = useRef(null);
  const dropPointerRef = useRef(null);

  async function deletechat() {
    await deleteChat(userchatid);
    setConnectedRefetch((t)=>!t)
    
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
  });
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
  }
};

export default Contact;
