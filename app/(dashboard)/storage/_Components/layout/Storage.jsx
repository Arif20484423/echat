import React from "react";
import Photos from "./components/Photos";
import Videos from "./components/Videos";
import Root from "./components/Root";
import Documents from "./components/Documents";
import styles from "../Component.module.css";
const Storage = ({ page }) => {
  return (
    <div className={styles.storage}>
      {page == 1 && <Photos />}
      {page == 2 && <Videos />}
      {page == 3 && <Documents />}
      {page == 4 && <Root />}
    </div>
  );
};

export default Storage;
