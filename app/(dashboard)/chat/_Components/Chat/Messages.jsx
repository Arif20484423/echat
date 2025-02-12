"use client"
import React from 'react'
import Sent from "./Sent"
import Received from "./Received"
import styles from "./Chat.module.css"
const Messages = () => {
  return (
    <div className={styles.messages}>
        <Sent/>
        <Received/>
        <Sent/>
        <Sent/>
        <Received/>
        <Received/>

    </div>
  )
}

export default Messages