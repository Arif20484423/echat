"use client";
import React from "react";
import styles from "./Chat.module.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";
const Sent = ({ user, message }) => {
  return (
    <div className={styles.sent}>
      <IoIosArrowDropdownCircle size={20} color="grey" />
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
