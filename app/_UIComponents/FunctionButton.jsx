'use client'
import React from 'react'
import styles from "./Component.module.css"
const FunctionButton = ({children,onClick}) => {
  return (
    <button className={styles.functionbutton} onClick={onClick}>
        {children}
    </button>
  )
}

export default FunctionButton