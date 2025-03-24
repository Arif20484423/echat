import React from 'react'
import styles from "./Component.module.css"
const File = ({src}) => {
  return (
    <div className={styles.file}>
    <img src={src} alt="img" />
    </div>
  )
}

export default File