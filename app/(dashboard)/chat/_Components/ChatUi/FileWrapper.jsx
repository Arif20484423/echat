"use client"

import React from 'react'
import styles from "./Chat.module.css"
import FileUi from "../Files/FileUi"

const FileWrapper = ({link,type,extension,name}) => {
    if(type=="image"){
        return <FileUi link = {link} type={type} extension={extension} width={250}/>
    }
  return (
    <div className={styles.filewrapper}>
    <FileUi link={link} type={type} extension={extension} width={50}></FileUi>
    <p>{name}</p>
    </div>
  )
}

export default FileWrapper