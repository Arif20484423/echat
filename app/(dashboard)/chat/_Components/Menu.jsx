"use client";
import React from "react";
import { PiChatsTeardropFill } from "react-icons/pi";
import { TiGroup } from "react-icons/ti";
import { TiUserAdd } from "react-icons/ti";
import { MdGroupAdd } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import styles from "./Menu.module.css";
const Menu = () => {
  return (
    <>
      <div className={styles.iconbox}>
        <PiChatsTeardropFill className={styles.icon} size={25} title="chats" />
      </div>
      <div className={styles.iconbox}>
        <TiGroup className={styles.icon} size={25} title="chats" />
      </div>
      <div className={styles.iconbox}>
        <FaFolder className={styles.icon} size={25} title="chats" />
      </div>
      <div className={styles.iconbox}>
        <TiUserAdd className={styles.icon} size={25} title="chats" />
      </div>
      <div className={styles.iconbox}>
        <MdGroupAdd className={styles.icon} size={25} title="chats" />
      </div>
    </>
  );
};

export default Menu;
