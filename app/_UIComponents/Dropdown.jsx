"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Component.module.css";

const Dropdown = ({ options}) => {
 
  
  return (
    <div className={styles.dropdown}>
      {options.map((e) => {
        return <div key={e.name} onClick={(event)=>{
          event.stopPropagation();
          e.action()
        }}>{e.name}</div>;
      })}
    </div>
  );
};

export default Dropdown;
