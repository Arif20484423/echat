import React from 'react'
import styles from "../Component.module.css"
const Navigations = ({back,forward}) => {
  return (
    <div className={styles.nav}>
        <svg onClick={back} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="0000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
          
        <svg onClick={forward} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="0000000"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
    </div>
  )
}

export default Navigations