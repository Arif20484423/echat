"use client"
import React from 'react'
import styles from  './Chat.module.css'
import { IoIosArrowDropdownCircle } from "react-icons/io";
const Sent = () => {
  return (
    <div className={styles.sent}>
    <IoIosArrowDropdownCircle size={20} color='grey'/>
        <div className={styles.sentbox}><p>Sent a Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam dolores facilis ex odit, dolore sit reprehenderit autem itaque praesentium maxime cupiditate esse suscipit numquam temporibus facere molestiae iste ea eius aperiam similique sunt, consequatur assumenda? Ratione optio quasi necessitatibus, quae fuga obcaecati voluptas distinctio eum iure, consequatur sequi iste blanditiis? meslorem50
        sge lorem30to you u</p></div>
        
    </div>
  )
}

export default Sent