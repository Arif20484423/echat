import React from "react";
import styles from "./NewContacts.module.css";
import skeletonStyles from "./Skeleton.module.css";

const LoadingSkeleton = () => {
  const skeletonArray = new Array(6).fill(0);

  return (
    <div className={styles.contacts}>
      {skeletonArray.map((_, i) => (
        <div key={i} className={skeletonStyles.skeletonContact}>
          <div className={skeletonStyles.skeletonImage}></div>
          <div className={skeletonStyles.skeletonDetails}>
            <div className={skeletonStyles.skeletonName}></div>
            <div className={skeletonStyles.skeletonEmail}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
