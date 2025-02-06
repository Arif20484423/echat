import React from 'react'
import styles from "./Component.module.css"
const Button = ({tag,type,disabled}:{tag:string,type?:"submit",disabled?:boolean}) => {
  return (
    <button className={styles.button} type={type} disabled={disabled}>
        {tag}
    </button>
  )
}

export default Button