import React from 'react'
import styles from "./Component.module.css"
const Loading = () => {
  return (
    <div className={styles.loading}>
    <img src="/loader.svg" alt="Loading..." width={50} /></div>
  )
}

export default Loading