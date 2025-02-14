"use client";
import React from "react";
import Menu from "./Menu.jsx";
import Contacts from "./Contacts/Contacts.jsx";
import Chat from "./ChatUi/ChatUi.jsx";
import ChatProfile from "./ChatProfile/ChatProfile.jsx";
import styles from "./PageLayout.module.css";
import compStyles from "./Component.module.css";
import { TbMessageChatbotFilled } from "react-icons/tb";
const PageLayout = () => {
  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.header}>
            <div className={styles.headiconbox}>
              <TbMessageChatbotFilled className={compStyles.icon} size={25} />
            </div>
            <h2>eChat</h2>
          </div>
          <div className={styles.navs}>
            <div className={styles.menu}>
              {" "}
              <Menu></Menu>{" "}
            </div>
            <div className={styles.contacts}>
              {" "}
              <Contacts />{" "}
            </div>
          </div>
        </div>
        <div className={styles.chat}>
          <Chat />
          {/* <ChatProfile/>           */}
        </div>
      </div>
    </>
  );
};

export default PageLayout;
