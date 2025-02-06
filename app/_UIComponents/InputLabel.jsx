import React from 'react'
import styles from './Component.module.css'
const InputLabel = ({tag,name}) => {
  return (
    <>
        <label htmlFor={tag} className={styles.label}>{tag}</label>
        <input type="text" name={name} id={tag}  className={styles.input} />
    </>
  )
}

export default InputLabel