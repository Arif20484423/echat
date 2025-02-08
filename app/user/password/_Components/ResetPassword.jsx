import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import {FaGoogle,FaGithub}  from "react-icons/fa"
export default function ResetPassword() {
  return (
    <>
      <FormContainer>
        <h2 className={styles.head}>Personal Infromation</h2>
        <InputLabel tag="Password" />
        <InputLabel tag="Confirm Password" />
        <Button tag="Update" />
      </FormContainer>
    </>
  );
}

