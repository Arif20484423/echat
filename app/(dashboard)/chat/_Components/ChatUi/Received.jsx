"use client";
import React from "react";
import styles from "./Chat.module.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Received = ({ user, message }) => {
  return (
    <div className={styles.received}>
      <div className={styles.receivedbox}>
        <div><p>{user}</p>
        <p>{message}</p></div>
      </div>
      <IoIosArrowDropdownCircle size={20} color="grey" />
    </div>
  );
};

export default Received;
