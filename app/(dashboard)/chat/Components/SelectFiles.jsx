"use client"
import React from 'react'
import Storage from "../../storage/_Components/Storage"
import styles from "./Component.module.css"
const SelectFiles = () => {
    function fileClick(){
        alert("eyye")
    }

  return (
    <div className={styles.selectfiles}>
        <Storage fileClick={fileClick}/>
    </div>
  )
}

export default SelectFiles