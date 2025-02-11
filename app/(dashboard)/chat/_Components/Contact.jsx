"use client"
import React from 'react'
import styles from "./Contacts.module.css"
const Contact = () => {
  return (
    <div className={styles.contactbox}>
            <img src="/profile.jpg" alt="profile" className={styles.profilepic}/>
            <p>Jaid Ansari</p>
        </div>
  )
}

export default Contact