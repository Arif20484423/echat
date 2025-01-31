import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Signup to echat</h1>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input type="email" className={styles.input}></input>
        <button className={styles.button}>get OTP</button>
      </form>
    </div>
  );
};

export default SignUp;
