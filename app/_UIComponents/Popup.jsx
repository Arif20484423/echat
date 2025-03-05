"us client"

import React from 'react'
import styles from "./Component.module.css"
const Popup = ({children}) => {
  return (
    <div className={styles.popup}>{children}</div>
  )
}

export default Popup