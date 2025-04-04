import React from "react";
import Menu from "./Menu"
import styles from "./Component.module.css";
import Storage from "./Storage"
const StorageLayout = ({ children }) => {
  return (
    <div className={styles.page}>
    
      <div className={styles.header}>
        <h2 className={styles.pagetitle}>Storage</h2>
      </div>
      
      <div className={styles.body}>
        <Menu/>
        <Storage/>
      </div>
    </div>
  );
};

export default StorageLayout;
