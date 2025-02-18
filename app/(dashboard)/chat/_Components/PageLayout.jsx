"use client"
import React,{useState} from "react";
import Menu from "./Menu.jsx";
import Contacts from "./Contacts/Contacts.jsx";
import Chat from "./ChatUi/ChatUi.jsx";
import ChatProfile from "./ChatProfile/ChatProfile.jsx";
import styles from "./PageLayout.module.css";
import NewContacts from "./NewContacts/Contacts.jsx"
import compStyles from "./Component.module.css";
import { TbMessageChatbotFilled } from "react-icons/tb";
const PageLayout = () => {
  const [page,setPage]= useState(1);
  const [chatPage,setChatPage]=useState(1);
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
              
              <Menu setPage={setPage}></Menu>
            </div>
            <div className={styles.contacts}>
              
                {page===1 && <Contacts />}
                {page===3 && <NewContacts setPage={setPage}/>}
              
            </div>
          </div>
        </div>
        <div className={styles.chat}>
        {
          chatPage==1 && <Chat setChatPage={setChatPage}/>
        }
        {
          chatPage==2 && <ChatProfile setChatPage={setChatPage}/>
        } 
          {/*            */}
        </div>
      </div>
    </>
  );
};

export default PageLayout;
