"use client"
import React from 'react'
import styles from "./Contacts.module.css"
import { VscKebabVertical } from "react-icons/vsc";
const Contact = () => {
  return (
    <div className={styles.contactbox}>
            <img src="/profile.jpg" alt="profile" className={styles.profilepic}/>
            <div className={styles.detailbox}>
            <div ><p className={styles.name}>Jaid Ansari</p>
            <p className={styles.email}>jaid123@gmail.com</p></div>
            <VscKebabVertical  />
            </div>
        </div>
  )
}

export default Contact