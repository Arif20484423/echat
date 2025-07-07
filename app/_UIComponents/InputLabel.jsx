import React from 'react'
import styles from './Component.module.css'
const InputLabel = ({tag,name,setValue=null,type="text" , required=false}) => {
  return (
    <>
        <label htmlFor={tag} className={styles.label}>{tag}</label>
        <input type={type} name={name} id={tag}  className={styles.input} required={required} onChange={(e)=>{
          if(setValue)
          setValue(e.target.value)
        }}/>
    </>
  )
}

export default InputLabel