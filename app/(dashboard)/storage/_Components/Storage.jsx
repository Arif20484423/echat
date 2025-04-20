import React from "react";
import Photos from "./components/Photos";
import Videos from "./components/Videos";
import Root from "./components/Root";
import Documents from "./components/Documents";
import styles from "./Component.module.css";
const Storage = ({ page, check, setChecked }) => {
  return (
    <div className={styles.storage}>
      {page == 1 && <Photos check={check} setChecked={setChecked} />}
      {page == 2 && <Videos check={check} setChecked={setChecked} />}
      {page == 3 && <Documents check={check} setChecked={setChecked} />}
      {page == 4 && <Root check={check} setChecked={setChecked} />}
    </div>
  );
};

export default Storage;
