"use client";
import React, { useRef, useEffect, useState, useContext } from "react";
import styles from "./Chat.module.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Dropdown from "@/app/_UIComponents/Dropdown";
import FileWrapper from "./FileWrapper"
import { deleteMesssage } from "@/lib/actions/chatActions";
import { Context } from "@/app/_context/NoteContext";
const Received = ({ username, message, file, id, type, extension, name, time }) => {
  const { setMessageNotification } = useContext(Context);
  const [options, setOptions] = useState(false);
  const dropRef = useRef(null);
  const dropPointerRef = useRef(null);
  const date= new Date(time);
  async function handleDelete() {
    await deleteMesssage(id);
    setMessageNotification((m) => !m);
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
  return (
    <div className={styles.received}>
      <div className={styles.receivedbox}>
        <div>
          <p>{username}</p>
          {file && (
            <FileWrapper
              link={file}
              type={type}
              extension={extension}
              name={name.substring(0,50)}
            />
          )}
          <p>{message}</p>
          <p className={styles.time}>{date.getDate()}-{date.getMonth()}-{date.getFullYear()} {date.get} {date.getHours()}:{date.getMinutes()}</p>
        </div>
      </div>
      <IoIosArrowDropdownCircle
        ref={dropPointerRef}
        size={20}
        color="grey"
        onClick={() => {
          setOptions(!options);
        }}
      />
      {options && (
        <div ref={dropRef} className={styles.dropdowncontainer}>
          <Dropdown
            options={[
              { name: "Select" },
              { name: "Forward" },
              { name: "Delete", action: handleDelete },
            ]}
            message={"jhsbx"}
          />
        </div>
      )}
    </div>
  );
};

export default Received;
