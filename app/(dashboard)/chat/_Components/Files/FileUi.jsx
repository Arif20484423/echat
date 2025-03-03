"use client"
import React from 'react'
import styles from "./Files.module.css"
const FileUi = ({type,link,extension,width=80,height="auto"}) => {
    if(type=="image")
  return (
    <>
        <img className={styles.image} src={link} alt="image" width={width} height={height}/>
        
    </>
    
  )
  else if(extension=="pdf"){
    return (
        <>
            <a href={link} target="_blank"><img className={styles.image} src='/pdf.png' alt="image" width={width} height={height}/></a>
        </>
        
      )     
  }
  else if(extension=="csv"){
    return (
        <>
            <a href={link} target="_blank"><img className={styles.image} src='/csv-file.png' alt="image" width={width} height={height}/></a>
        </>
        
      )     
  }
  else if(extension=="xlsx"){
    return (
        <>
            <a href={link} target="_blank"><img className={styles.image} src='/xls-file.png' alt="image" width={width} height={height}/></a>
        </>
        
      )     
  }
  else if(extension=="docx"){
    return (
        <>
            <a href={link} target="_blank"><img className={styles.image} src='/docx-file.png' alt="image" width={width} height={height}/></a>
        </>
        
      )     
  }
  else if(extension=="ppt"){
    return (
        <>
            <a href={link} target="_blank"><img className={styles.image} src='/ppt.png' alt="image" width={width} height={height}/></a>
        </>
        
      )     
  }
  else if(extension=="pptx-file"){
    return (
        <>
            <a href={link} target="_blank"><img className={styles.image} src='/pptx-file.png' alt="image" width={width} height={height}/></a>
        </>
        
      )     
  }
  else {
    return (
        <>
            <a href={link} target="_blank"><img className={styles.image} src='/file.png' alt="image" width={width} height={height}/></a>
        </>
        
      )     
  }

}

export default FileUi