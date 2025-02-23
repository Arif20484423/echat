"use client"
import React from 'react'
import styles from "./Chat.module.css"
const FileUi = ({type,link,extension,width=80}) => {
    if(type=="image")
  return (
    <>
        <img className={styles.image} src={link} alt="image" width={width}/>
        
    </>
    
  )
  else if(extension=="pdf"){
    return (
        <>
            <a href={link} target="_blank"><img src='/pdf.png' alt="image" width={width}/></a>
        </>
        
      )     
  }
  else if(extension=="csv"){
    return (
        <>
            <a href={link} target="_blank"><img src='/csv-file.png' alt="image" width={width}/></a>
        </>
        
      )     
  }
  else if(extension=="xlsx"){
    return (
        <>
            <a href={link} target="_blank"><img src='/xls-file.png' alt="image" width={width}/></a>
        </>
        
      )     
  }
  else if(extension=="docx"){
    return (
        <>
            <a href={link} target="_blank"><img src='/docx-file.png' alt="image" width={width}/></a>
        </>
        
      )     
  }
  else if(extension=="ppt"){
    return (
        <>
            <a href={link} target="_blank"><img src='/ppt.png' alt="image" width={width}/></a>
        </>
        
      )     
  }
  else if(extension=="pptx-file"){
    return (
        <>
            <a href={link} target="_blank"><img src='/pptx-file.png' alt="image" width={width}/></a>
        </>
        
      )     
  }
  else {
    return (
        <>
            <a href={link} target="_blank"><img src='/file.png' alt="image" width={width}/></a>
        </>
        
      )     
  }

}

export default FileUi