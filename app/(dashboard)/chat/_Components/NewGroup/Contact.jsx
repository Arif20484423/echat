"use client"
import React, { useContext } from 'react'
import styles from "../Contacts/Contacts.module.css";
// import styles2 from "./NewContacts.module.css"
import { VscKebabVertical } from "react-icons/vsc";
import { Context } from '@/app/_context/NoteContext';
import { createChannel, deleteChat } from '@/lib/actions/chatActions';
const Contact = ({id,name,email,image,setPage,selectedUsers,setSelectedUsers}) => {
  
  const {setToUser,user } = useContext(Context)
  
  return (
    <div className={styles.contactbox} >
            <img src={image} alt="image" className={styles.profilepic}/>
            <div className={styles.detailbox}>
            <div ><p className={styles.name}>{name}</p>
            <p className={styles.email}>{email}</p></div>
            <input type="checkbox" onClick={(e)=>{
              if(e.target.checked){
                selectedUsers.push(id);
                console.log(selectedUsers)
                setSelectedUsers(()=>selectedUsers)
                console.log(selectedUsers)
              }
              else{
                selectedUsers=selectedUsers.filter((e)=>e!=id);
                console.log(selectedUsers)
                setSelectedUsers(()=>selectedUsers)
                console.log(selectedUsers)
              }
            }} style={{"transform":"scale(1.3)"}}/>
            </div>

            
        </div>
  )
}

export default Contact