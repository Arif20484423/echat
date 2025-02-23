"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import Dropdown from "@/app/_UIComponents/Dropdown";
import FileUi from "./FileUi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { deleteForEveryoneMesssage, deleteMesssage } from "@/lib/actions/chatActions";

import { Context } from "@/app/_context/NoteContext";
const Sent = ({ user, message, file , id, messageid,type, extension}) => {
  const [options, setOptions] = useState(false);
  const {setMessageNotification,toUser,socket}=useContext(Context);
  const dropRef = useRef(null);
  const dropPointerRef = useRef(null);

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

  async function handleDelete(){
    await deleteMesssage(id)
    setMessageNotification((m)=>!m);
  }
  async function handleDeleteForAll(){
    await deleteForEveryoneMesssage(id,toUser.channelid,toUser.id,messageid);
    setMessageNotification((m)=>!m);
    socket.emit("delete", { to: toUser.id, message: "message deleted" }); //mesagenotification to other to reload chats
  }
  useEffect(() => {
    document.addEventListener("click", handleClick);
  });
  return (
    <div className={styles.sent}>
      {options && (
        <div ref={dropRef} className={styles.dropdowncontainer}>
          <Dropdown
            options={[
              { name: "Select" },
              { name: "Forward" },
              { name: "Delete",action:handleDelete },
              { name: "Delete for all", action : handleDeleteForAll },
            ]}
          />
        </div>
      )}
      <IoIosArrowDropdownCircle
        ref={dropPointerRef}
        size={20}
        color="grey"
        onClick={() => {
          setOptions(!options);
        }}
      ></IoIosArrowDropdownCircle>

      <div className={styles.sentbox}>
        <div>
          
          <p>{user}</p>
          {file && <FileUi link={file} alt="file" type={type} extension={extension} width={300}/>}
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Sent;
