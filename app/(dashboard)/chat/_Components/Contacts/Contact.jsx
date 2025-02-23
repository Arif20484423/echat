"use client"
import React, { useContext, useState, useRef, useEffect } from 'react'
import styles from "./Contacts.module.css"
import { VscKebabVertical } from "react-icons/vsc";
import { Context } from '@/app/_context/NoteContext';
import Dropdown from "@/app/_UIComponents/Dropdown"
const Contact = ({name,email,id,channelid,description,image}) => {
  const {setToUser} = useContext(Context)
  const [options,setOptions]=useState(false);
  const dropRef= useRef(null)
    const dropPointerRef= useRef(null)
  
    function handleClick(e){
      if(dropPointerRef.current && !dropPointerRef.current.contains(e.target) && dropRef.current && !dropRef.current.contains(e.target)){
        setOptions(false)
      }
    }
    useEffect(()=>{
      document.addEventListener("click",handleClick);
    })
  return (
    <div className={styles.contactbox} onClick={()=>{
        setToUser({id:id,email:email,channelid:channelid,description:description,name:name,image:image})
    }}>
            <img src={image} alt="profile" className={styles.profilepic}/>
            <div className={styles.detailbox}>
            <div ><p className={styles.name}>{name}</p>
            <p className={styles.email}>{email}</p></div>
            <VscKebabVertical ref={dropPointerRef} onClick={(e)=>{
              e.stopPropagation();
              setOptions(!options);
            }} />
              { options && <div ref={dropRef} className={styles.dropdowncontainer}><Dropdown options={[{name:"select"},{name:"delete"}]}/></div>}
            </div>
        </div>
  )
}

export default Contact