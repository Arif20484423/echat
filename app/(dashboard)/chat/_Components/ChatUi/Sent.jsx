"use client";
import React, { useState } from "react";
import styles from "./Chat.module.css";
import Dropdown from "@/app/_UIComponents/Dropdown";
import { IoIosArrowDropdownCircle } from "react-icons/io";
const Sent = ({ user, message }) => {
  const [options,setOptions]=useState(false);
  return (
    <div className={styles.sent}>
      <IoIosArrowDropdownCircle size={20} color="grey" onClick={()=>{
        setOptions(!options)
      }}></IoIosArrowDropdownCircle>
      {options && <Dropdown options={[{name:"Select"},{name:"Forward"},{name:"Delete"},{name:"Delete for all"}]}/>}
      <div className={styles.sentbox}>
        <div>
        <p>{user}</p>
        <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Sent;
