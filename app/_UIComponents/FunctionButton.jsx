'use client'
import React from 'react'
import styles from "./Component.module.css"
const FunctionButton = ({children,onClick, disabled=false}) => {
  return (
    <button className={styles.functionbutton} onClick={onClick} disabled={disabled}>
        {children}
    </button>
  )
}

export default FunctionButton