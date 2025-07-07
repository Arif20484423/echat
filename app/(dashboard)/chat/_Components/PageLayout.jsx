"use client";
import React, { useState } from "react";
import Menu from "./Menu/Menu.jsx";
import Contacts from "./Contacts/Contacts.jsx";
import Chat from "./ChatUi/ChatUi.jsx";
import ChatProfile from "./ChatProfile/ChatProfile.jsx";
import styles from "./PageLayout.module.css";
import NewContacts from "./NewContacts/Contacts.jsx";
import NewGroup from "./NewGroup/Contacts.jsx";
import GrouInfo from "./NewGroup/GroupInfo.jsx";
import Instruction from "./NewContacts/Instruction.jsx";
import compStyles from "./Component.module.css";
import { AiFillMessage } from "react-icons/ai";
const PageLayout = () => {
  const [page, setPage] = useState(1);
  const [chatPage, setChatPage] = useState(1);
  const [newGroupUsers, setNewGroupUsers] = useState([]);
  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.header}>
            <div className={styles.headiconbox}>
              <AiFillMessage className={compStyles.icon} size={30} />
            </div>
            <h2>eChat</h2>
          </div>
          <div className={styles.navs}>
            <div className={styles.menu}>
              <Menu setPage={setPage} page={page}></Menu>
            </div>
            <div className={styles.contacts}>
              {page === 1 && <Contacts />}
              {page === 2 && <NewContacts setPage={setPage} />}
              {page === 3 && (
                <NewGroup
                  setPage={setPage}
                  setSelectedUsers={setNewGroupUsers}
                  selectedUsers={newGroupUsers}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.chat}>
          {page == 1 && (
            <>
              {chatPage == 1 && <Chat setChatPage={setChatPage} />}
              {chatPage == 2 && <ChatProfile setChatPage={setChatPage} />}{" "}
            </>
          )}
          {page == 2 && <Instruction/>}
          {page == 3 && <GrouInfo users={newGroupUsers} setPage={setPage} />}
        </div>
      </div>
    </>
  );
};

export default PageLayout;
