import React from 'react'
import styles from "./Component.module.css"
const Button = ({tag,type="",disabled=false}) => {
  return (
    <button className={styles.button} type={type} disabled={disabled}>
        {tag}
    </button>
  )
}

export default Button