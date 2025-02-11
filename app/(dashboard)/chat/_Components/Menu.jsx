"use client";
import React from "react";
import { PiChatsTeardropFill } from "react-icons/pi";
import { TiGroup } from "react-icons/ti";
import { TiUserAdd } from "react-icons/ti";
import { MdGroupAdd } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import styles from "./Menu.module.css";
import compStyles from "./Component.module.css"
const Menu = () => {
  return (
    <>
      <div className={styles.iconbox}>
        <PiChatsTeardropFill className={compStyles.icon} size={25} title="chats" />
      </div>
      <div className={styles.iconbox}>
        <TiGroup className={compStyles.icon} size={25} title="chats" />
      </div>
      <div className={styles.iconbox}>
        <FaFolder className={compStyles.icon} size={25} title="chats" />
      </div>
      <div className={styles.iconbox}>
        <TiUserAdd className={compStyles.icon} size={25} title="chats" />
      </div>
      <div className={styles.iconbox}>
        <MdGroupAdd className={compStyles.icon} size={25} title="chats" />
      </div>
    </>
  );
};

export default Menu;
