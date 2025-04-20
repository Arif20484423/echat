"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import Dropdown from "@/app/_UIComponents/Dropdown";
import OutClick from "@/app/_UIComponents/OutClick";
import FileWrapper from "./FileWrapper";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import {
  deleteForEveryoneMesssage,
  deleteForEveryoneMesssageGroup,
  deleteMesssage,
} from "@/lib/actions/chatActions";

import { Context } from "@/app/_context/NoteContext";
const Sent = ({
  selectflag,
  setSelectflag,
  selected,
  setSelected,
  forward,
  setForward,
  username,
  message,
  file,
  name = "uwedg",
  id,
  messageid,
  userfileid,
  fileid,
  type,
  extension,
  time,
}) => {
  const [options, setOptions] = useState(false);
  const { setMessageNotification, toUser, user, socket } = useContext(Context);
  const dropRef = useRef(null);
  const dropPointerRef = useRef(null);

  let date = new Date(time);

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

  async function handleDelete() {
    await deleteMesssage(id);
    setMessageNotification((m) => !m);
  }
  async function handleDeleteForAll() {
    if (toUser.isgroup) {
      const res = await fetch("/api/channel/users", {
        method: "POST",
        body: JSON.stringify({ channelid: toUser.channelid, user: user.id }),
      });

      const d = await res.json();
      await deleteForEveryoneMesssageGroup(
        id,
        d.data,
        toUser.channelid,
        messageid
      );
      setMessageNotification((m) => !m);
      for (let i = 0; i < d.data.length; i++) {
        console.log(d.data[i]);
        socket.emit("delete", { to: d.data[i], message: "message deleted" }); //mesagenotification to other to reload chats
      }
    } else {
      await deleteForEveryoneMesssage(
        id,
        toUser.channelid,
        toUser.id,
        messageid
      );
      setMessageNotification((m) => !m);
      socket.emit("delete", { to: toUser.id, message: "message deleted" }); //mesagenotification to other to reload chats
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClick);
  });
  return (
    <div className={styles.sent}>
      {options && (
        <OutClick show={options} setShow={setOptions} caller={dropPointerRef}>
          <div className={styles.dropdowncontainer}>
            <Dropdown
              options={[
                {
                  name: "Select",
                  action: () => {
                    setSelectflag(true);
                    setOptions(false);
                  },
                },
                {
                  name: "Forward",
                  action: () => {
                    setSelected((s) => [
                      ...s,
                      { id, messageid, userfileid, fileid },
                    ]);
                    setForward(true);
                    setSelectflag(false);
                  },
                },
                { name: "Delete", action: handleDelete },
                { name: "Delete for all", action: handleDeleteForAll },
              ]}
            />
          </div>
        </OutClick>
      )}
      {selectflag ? (
        <input
          type="checkbox"
          style={{ transform: "scale(1.3)" }}
          onChange={(e) => {
            if (e.target.checked) {
              setSelected((s) => [
                ...s,
                {
                  id: id,
                  messageid: messageid,
                  userfileid: userfileid,
                  fileid: fileid,
                },
              ]);
            } else {
              const filtered = selected.filter((e) => {
                return e.messageid != messageid;
              });
              setSelected(filtered);
            }
          }}
        />
      ) : (
        <IoIosArrowDropdownCircle
          ref={dropPointerRef}
          size={20}
          color="grey"
          onClick={() => {
            setOptions(!options);
          }}
        ></IoIosArrowDropdownCircle>
      )}

      <div className={styles.sentbox}>
        <div>
          <p>{username}</p>
          {file && (
            <FileWrapper
              link={file}
              type={type}
              extension={extension}
              name={name.substring(0, 50)}
            />
          )}
          <p>{message}</p>
          <p className={styles.time}>
            {date.getDate()}-{date.getMonth()}-{date.getFullYear()} {date.get}{" "}
            {date.getHours()}:{date.getMinutes()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sent;
