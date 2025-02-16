"use client"
import React, { useEffect, useRef } from 'react'

const ScrollDown = () => {
    const ref= useRef(null)
    useEffect(()=>{
        ref.current.scrollIntoView()
    },[])
  return (
    <div ref={ref}></div>
  )
}

export default ScrollDown