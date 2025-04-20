import React from "react";
import styles from "./_Components/Component.module.css";
import StorageLayout from "./_Components/StorageLayout";
const page = () => {
  return (
    <div className={styles.page}>
      <StorageLayout />
    </div>
  );
  // return (
  //   <Storage/>
  // )
};

export default page;
