"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Component.module.css";
const Dropdown = ({ options}) => {
  const ref = useRef(null);

  
  return (
    <div className={styles.dropdown} ref={ref}>
      {options.map((e) => {
        return <div key={e.name} onClick={e.action}>{e.name}</div>;
      })}
    </div>
  );
};

export default Dropdown;
