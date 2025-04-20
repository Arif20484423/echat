"use client";
import React, { useState } from "react";
import Menu from "./Menu";
import styles from "./Component.module.css";
import Storage from "./Storage";
const StorageLayout = ({ check, setChecked }) => {
  const [page, setPage] = useState(4);
  return (
    <div className={styles.layoutpage}>
      <div className={styles.header}>
        <h2 className={styles.pagetitle}>Storage</h2>
      </div>

      <div className={styles.body}>
        <Menu setPage={setPage} page={page} />

        <Storage page={page} check={check} setChecked={setChecked} />
      </div>
    </div>
  );
};

export default StorageLayout;
