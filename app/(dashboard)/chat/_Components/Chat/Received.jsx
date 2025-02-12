"use client"
import React from 'react'
import styles from  './Chat.module.css'
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Received = () => {
  return (
    
    <div className={styles.received}>
        
        <div className={styles.receivedbox}><p>Sent a messge Lorem i Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam ducimus omnis molestiae eveniet. Incidunt aspernatur quaerat impedit! Molestiae ex a reprehenderit alias quas, inventore autem tempora exercitationem facere maiores omnis earum, iusto, minus sed asperiores recusandae distinctio reiciendis odit officia aliquam error et dolore! Vitae natus ea officia quae id!psipsum.to you u</p></div>
        <IoIosArrowDropdownCircle size={20} color="grey"/>
    </div>
  )
}

export default Received