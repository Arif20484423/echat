import React from "react";
import styles from "./EnterOtp.module.css";

const EnterOtp = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Signup to echat</h1>
        <label htmlFor="otp" className={styles.label}>
          Enter OTP
        </label>
        <input type="text" className={styles.input}></input>
        <button className={styles.button}>Confirm</button>
        <button className={styles.newOtp}>request new OTP</button>
      </form>
    </div>
  );
};

export default EnterOtp;
