import React from 'react'
import styles from "./Component.module.css"
const Button = ({tag}) => {
  return (
    <button className={styles.button}>
        {tag}
    </button>
  )
}

export default Button