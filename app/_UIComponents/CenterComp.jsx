"use client"
import React from 'react'
import styles from "./Component.module.css"

const CenterComp = ({children}) => {
  return (
    <div className={styles.centercomp}>{children}</div>
  )
}

export default CenterComp