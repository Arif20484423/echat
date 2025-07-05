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
  currentToUser,
  image = "",
  isgroup,
  select,
  setSelect,
  lastSeen,
  lastMessage,
  onClick
}) => {
  const { toUser, setToUser,toUser2, setMessageNotification, setConnectedRefetch, setConnected } =
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
  }, []);
  if (isgroup) {
    return (
      <div
        className={styles.contactbox}
        style={
          toUser2 && toUser2._id == userchatid
            ? { backgroundColor: "var(--blueBorder)" }
            : {}
        }
        onClick={async () => {
          // console.log("toUserrrrrrrrrrrrrrrrrrr", toUser);
          if (toUser2) {
            // console.log("setting");
            fetch("/api/channel/lastseen", {
              method: "POST",
              body: JSON.stringify({ id: toUser2._id }),
            }).then(() => {
              console.log("changed last seen");
            });
            setConnected((t) =>
              t.map((e) => {
                if (e.channelid == toUser2.channelid) {
                  e = {
                    ...e,
                    lastSeen: new Date(),
                  };
                }
                return e;
              })
            );
          }
          onClick();
          // console.log("settedddddddddd");
          // setToUser({
          //   isgroup: true,
          //   channelid: channelid,
          //   description: description,
          //   name: name,
          //   image: image,
          //   chatid: userchatid,
          // });
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

              // console.log("conn", connections);

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
                // console.log("contacts", contacts);
                let filtered = contacts.filter((e) => {
                  // console.log(e);
                  return e.channelid != channelid;
                });
                // console.log("filtered", filtered);
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
            {(!toUser2 || toUser2._id != userchatid) &&
              new Date(lastSeen) < new Date(lastMessage) && (
                <div className={styles.notificationpoint}></div>
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
  } else {
    return (
      <div
        className={styles.contactbox}
        style={
          toUser2 && toUser2._id == userchatid
            ? { backgroundColor: "var(--blueBorder)" }
            : {}
        }
        onClick={async () => {
          // console.log("toUserrrrrrrrrrrrrrrrrrr", toUser);
          if (toUser2) {
            // console.log("setting");
            fetch("/api/channel/lastseen", {
              method: "POST",
              body: JSON.stringify({ id: toUser2._id }),
            }).then(() => {
              console.log("Changed last seen");
            });
            setConnected((t) =>
              t.map((e) => {
                if (e.channelid == toUser2.channelid) {
                  e = {
                    ...e,
                    lastSeen: new Date(),
                  };
                }
                return e;
              })
            );
          }
          onClick();
          // console.log("settedddddddddd");
          // setToUser({
          //   id: id,
          //   email: email,
          //   channelid: channelid,
          //   description: description,
          //   name: name,
          //   image: image,
          //   chatid: userchatid,
          // });
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

              // console.log("conn", connections);

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
                // console.log("contacts", contacts);
                let filtered = contacts.filter((e) => {
                  // console.log(e);
                  return e.channelid != channelid;
                });
                // console.log("filtered", filtered);
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
            {(!toUser2 || toUser2._id != userchatid) &&
              new Date(lastSeen) < new Date(lastMessage) && (
                <div className={styles.notificationpoint}></div>
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
