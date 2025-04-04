import React from 'react'
import styles from "./Component.module.css"
const Folder = ({name}) => {
  return (
    <div >
    <img src="/folder.png" alt="img" />
    <p>{name}</p>
    </div>
  )
}

export default Folder