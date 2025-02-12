"use client"
import React from "react"
import styles from "./Chat.module.css"
import Messages from "./Messages"
export default function Chat(){
    return (
        <div className={styles.chatbox}>
            <div className={styles.chatheader}>
                <div className={styles.userinfo}>
                    <img src="/profile.jpg" alt="img" className={styles.userimage}/>
                    <div>
                    <p className={styles.name}>Sudip Das</p>
                    <p className={styles.desc}>This may be users description</p>
                    </div>
                </div>
                
            </div>
            <Messages/>
        </div>
    );

}