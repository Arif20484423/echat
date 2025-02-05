import React from 'react'
import styles from './Component.module.css'
const InputLabel = ({tag}) => {
  return (
    <>
        <label htmlFor={tag} className={styles.label}>{tag}</label>
        <input type="text" name={tag} id={tag}  className={styles.input}/>
    </>
  )
}

export default InputLabel