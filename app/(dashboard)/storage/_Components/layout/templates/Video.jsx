import React from "react";
import styles from "../../Component.module.css"
const Video = ({ src, name }) => {
  return (
    <>
      <div className={styles.videowrapper}>
        <img src="/play.png" alt="play" width={30} />
      </div>
      <video src={src} alt="video"></video>
     
    </>
  );
};

export default Video;
