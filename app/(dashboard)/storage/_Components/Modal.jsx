import React from 'react'
import styles from "./component.module.css"
const Modal = ({setModal}) => {
  return (
    <div className={styles.modal}>
        <div className={styles.modalin}>Modalin<button onClick={()=>{
            setModal((t)=>!t)
        }}>close</button></div>
        
    </div>
  )
}

export default Modal