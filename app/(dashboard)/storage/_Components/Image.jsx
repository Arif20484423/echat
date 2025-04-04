import React from 'react'
import styles from "./Component.module.css"
const Image = ({src,name}) => {
  return (
    <div >
    <img src={src} alt="img" />
    <p>{name}</p>
    </div>
  )
}

export default Image