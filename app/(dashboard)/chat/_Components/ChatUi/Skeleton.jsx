import React from "react";
import styles from "./Skeleton.module.css";

const ChatSkeleton = () => {
  return (
    <div className={styles.chatContainer}>
      <div className={`${styles.chatHeader} ${styles.skeleton}`} />

      <div className={styles.chatBody}>
        <div
          className={`${styles.message} ${styles.received} ${styles.skeleton}`}
        >
          <div className={styles.bubbleLine} style={{ width: "60%" }} />
          <div className={styles.bubbleLine} style={{ width: "40%" }} />
        </div>
        <div className={`${styles.message} ${styles.sent} ${styles.skeleton}`}>
          <div className={styles.bubbleLine} style={{ width: "50%" }} />
          <div className={styles.bubbleLine} style={{ width: "30%" }} />
        </div>
        <div
          className={`${styles.message} ${styles.received} ${styles.skeleton}`}
        >
          <div className={styles.bubbleLine} style={{ width: "70%" }} />
          <div className={styles.bubbleLine} style={{ width: "50%" }} />
        </div>
      </div>

      <div className={styles.chatInput}>
        <div className={`${styles.inputField} ${styles.skeleton}`} />
        <div className={`${styles.sendBtn} ${styles.skeleton}`} />
      </div>
    </div>
  );
};

export default ChatSkeleton;
