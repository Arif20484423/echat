"use client"
import React, { useContext } from 'react'
import styles from "../Contacts/Contacts.module.css";
import styles2 from "./NewContacts.module.css"
import { Context } from '@/app/_context/NoteContext';
import { createChannel } from '@/lib/actions/chatActions';
const Contact = ({id,name,email,image,setPage}) => {
  
  const {user} = useContext(Context)

  return (
    <div className={styles.contactbox} >
            <img src={image} alt="image" className={styles.profilepic}/>
            <div className={styles.detailbox}>
            <div ><p className={styles.name}>{name}</p>
            <p className={styles.email}>{email}</p></div>
            <svg onClick={async ()=>{ 
                await createChannel(user.id,id);
                setPage(1);
            }} className={styles2.add} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="grey"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </div>
        </div>
  )
}

export default Contact