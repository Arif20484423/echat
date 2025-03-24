import React from 'react'
import styles from "./Component.module.css"
const Menu = () => {
  return (
    <div className={styles.menu}>
    <br />
    <div className={styles.itembox}>
      <div className={`${styles.item} ${styles.selecteditem}`}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg>
        <p>Photos </p>
      </div>
    </div>
    <div className={styles.itembox}>
      <div className={`${styles.item} `}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000"><path d="m380-300 280-180-280-180v360ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/></svg>
        <p>Videos </p>
      </div>
    </div>
    <div className={styles.itembox}>
      <div className={`${styles.item} `}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
        <p>Documents </p>
      </div>
    </div>
    <div className={styles.itembox}>
      <div className={`${styles.item} `}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000"><path d="M160-280h640v-240H160v240Zm520-60q25 0 42.5-17.5T740-400q0-25-17.5-42.5T680-460q-25 0-42.5 17.5T620-400q0 25 17.5 42.5T680-340Zm200-260H767l-80-80H273l-80 80H80l137-137q11-11 25.5-17t30.5-6h414q16 0 30.5 6t25.5 17l137 137ZM160-200q-33 0-56.5-23.5T80-280v-320h800v320q0 33-23.5 56.5T800-200H160Z"/></svg>
        <p>Root </p>
      </div>
    </div>
  </div>
  )
}

export default Menu