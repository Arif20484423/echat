import React from "react";
import styles from "./Contacts.module.css";
import skeletonStyles from "./Skeleton.module.css";

const LoadingSkeleton = () => {
  const skeletonArray = new Array(6).fill(0);

  return (
    <div className={styles.contacts}>
      <div className={skeletonStyles.skeletonSearch}>
        <div className={skeletonStyles.skeletonSearchPlaceholder}></div>
        <div className={skeletonStyles.skeletonSearchIcon}></div>
      </div>
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
