import React from "react";
import Menu from "./Menu"
import Files from "./Files"
import styles from "./Component.module.css";
const StorageLayout = ({ children }) => {
  return (
    <div className={styles.page}>
    
      <div className={styles.header}>
        <h2 className={styles.pagetitle}>Storage</h2>
      </div>
      
      <div className={styles.body}>
        <Menu/>
        <Files/>
      </div>
    </div>
  );
};

export default StorageLayout;
