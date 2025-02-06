import React from 'react'
import styles from './Component.module.css'
const ErrorMessage = ({message}) => {
  return (
    <p className={styles.errormessage}>{message}</p>
  )
}

export default ErrorMessage