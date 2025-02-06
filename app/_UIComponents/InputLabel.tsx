import React from 'react'
import styles from './Component.module.css'
const InputLabel = ({tag,name,setValue}:{tag:string,name?:string,setValue?:Function}) => {
  return (
    <>
        <label htmlFor={tag} className={styles.label}>{tag}</label>
        <input type="text" name={name} id={tag}  className={styles.input} onChange={(e)=>{
          if(setValue)
          setValue(e.target.value)
        }}/>
    </>
  )
}

export default InputLabel