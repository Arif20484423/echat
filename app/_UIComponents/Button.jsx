import React from 'react'
import styles from "./Component.module.css"
const Button = ({tag,type}) => {
  return (
    <button className={styles.button} type={type}>
        {tag}
    </button>
  )
}

export default Button