"use client"
import React, { useContext } from 'react'
import styles from "./Contacts.module.css"
import { VscKebabVertical } from "react-icons/vsc";
import { Context } from '@/app/_context/NoteContext';
const Contact = ({name,email,id,channelid}) => {
  const {setToUser} = useContext(Context)

  return (
    <div className={styles.contactbox} onClick={()=>{
        setToUser({id:id,email:email,channelid:channelid})
    }}>
            <img src="/profile.jpg" alt="profile" className={styles.profilepic}/>
            <div className={styles.detailbox}>
            <div ><p className={styles.name}>{name}</p>
            <p className={styles.email}>{email}</p></div>
            <VscKebabVertical  />
            </div>
        </div>
  )
}

export default Contact