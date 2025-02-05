import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import {FaGoogle,FaGithub}  from "react-icons/fa"
export default function Login() {
  return (
    <>
      <FormContainer>
        <h2 className={styles.head}>Login to eChat</h2>
        <InputLabel tag="Email" />
        <InputLabel tag="Password" />
        <Button tag="Submit" />
        <div className={styles.icons}>
        <FaGoogle size={25}/>
        <FaGithub size={25}/>
        </div>
      </FormContainer>
    </>
  );
}

