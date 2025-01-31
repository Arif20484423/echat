import React from "react";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Login to echat</h1>
        <div className={styles.formgroup}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} type="email"></input>
          <label className={styles.label}>Password</label>
          <input className={styles.input} type="password"></input>
        </div>
        <button className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
