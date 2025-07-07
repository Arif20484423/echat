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
  selectMessage,
  deselectMessage,
  setForward,
  username,
  message,
  file,
  name = "uwedg",
  id,
  messageid,
  type,
  extension,
  time,
}) => {
  const [options, setOptions] = useState(false);
  const { toUser2, socket, messages, setMessages } =
    useContext(Context);
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
    let temp = [];
    for (let j = 0; j < messages.length; j++) {
      
        if (messages[j]._id == id) {
          messages[j].delete = true;
        }
      
      temp.push(messages[j]);
    }
    setMessages(temp);
    deleteMesssage(id);
  }
  async function handleDeleteForAll() {
    if (toUser2.isgroup) {
      let temp = [];
      for (let j = 0; j < messages.length; j++) {
        if (messages[j]._id == id) {
          messages[j].delete = true;
        }

        temp.push(messages[j]);
      }
      setMessages(temp);
      deleteForEveryoneMesssageGroup(
        id,
        toUser2.connections,
        toUser2.channelid,
        messageid
      );
      for (let i = 0; i < toUser2.connections.length; i++) {
        socket.emit("delete", {
          from: toUser2.channelid,
          to: toUser2.connections[i].user._id,
          messageid: messageid,
        }); 
      }
    } else {
      let temp = [];
      for (let j = 0; j < messages.length; j++) {
        if (messages[j]._id == id) {
          messages[j].delete = true;
        }

        temp.push(messages[j]);
      }
      setMessages(temp);
      deleteForEveryoneMesssage(
        id,
        toUser2.channelid,
        toUser2.connections[0].user._id,
        messageid
      );
      socket.emit("delete", {
        from: toUser2.channelid,
        to: toUser2.connections[0].user._id,
        messageid: messageid,
      }); 
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
                    selectMessage();
                    setOptions(false);
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
              selectMessage();
            } else {
              deselectMessage();
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
