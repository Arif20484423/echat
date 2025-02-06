"use client";
import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import ErrorMessage from "../../../_UIComponents/ErrorMessage";
import { useFormState } from "react-dom";

import { userSignIn ,userSignInGoogle,userSignInGithub} from "@/lib/actions/userActions";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function Login() {
  const initialState = { message: null, errors: {} };
  const [state, formAction, isPending] = useFormState(userSignIn, initialState);
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [state]);
  return (
    <>
      <FormContainer>
        <form action={formAction}>
          <h2 className={styles.head}>Login to eChat</h2>
          <InputLabel tag="Email" name="email" />
          <InputLabel tag="Password" name="password" />

          {error && <ErrorMessage message={state?.message}/>}

          <Button tag="Submit" type="submit" />
          <div className={styles.icons}>
            <FaGoogle size={25} onClick={()=>{
              userSignInGoogle()
            }}/>
            <FaGithub size={25} onClick={()=>{
              userSignInGithub()
            }}/>
          </div>
        </form>
      </FormContainer>
    </>
  );
}
