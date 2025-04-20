"use client";
import React, { useRef, useEffect } from "react";
import styles from "./Component.module.css";
const OutClick = ({ children, show, setShow, caller }) => {
  const ref = useRef(null);
  function handleClick(e) {
    if (caller.current && !caller.current.contains(e.target)) {
      console.log("BHAI CLICKED");
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    }
  }
  useEffect(() => {
    console.log("YRR");
    document.addEventListener("click", handleClick);
  });
  return (
    <div ref={ref} className={styles.outclick}>
      {children}
    </div>
  );
};

export default OutClick;
