"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Component.module.css";
const Dropdown = ({ options }) => {
    const ref= useRef(null);
    useEffect(()=>{
        // ref.current.style.display = "none";
    })
  return <div className={styles.dropdown} ref={ref}>{
    options.map(e=>{
        return (
            <div key={e.name}>{e.name}</div>
        )
    })
  }</div>;
};

export default Dropdown;
