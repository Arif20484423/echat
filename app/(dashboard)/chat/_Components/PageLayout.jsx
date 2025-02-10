"use client"
import React from 'react'
import Menu from "./Menu.jsx"
import Contacts from "./Contacts.jsx"
import styles from "./Menu.module.css"
import { TbMessageChatbotFilled } from "react-icons/tb";
const PageLayout = () => {
  return (
    <>
        <div className={styles.header}> 
            <div className={styles.headiconbox}>
            <TbMessageChatbotFilled className={styles.icon} size={25}/>
            </div>
         <h2>eChat</h2></div>
        <div className={styles.container}>
            <div className={styles.menu}> <Menu></Menu> </div>
            <div className={styles.contacts}> <Contacts/> </div>
            <div className={styles.chat}></div>
        </div>
    </>
  )
}

export default PageLayout