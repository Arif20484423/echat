import React from 'react'
import styles from './Component.module.css'
const FormContainer = ({children}) => {
  return (
    <div  className={styles.formcontainer}>
        {children}
    </div>
  )
}

export default FormContainer