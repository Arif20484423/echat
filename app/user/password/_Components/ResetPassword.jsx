"use client"
import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import ErrorMessage from "@/app/_UIComponents/ErrorMessage";
import { userResetPassword } from "@/lib/actions/userActions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
export default function ResetPassword() {
  let initialState={message:null}
      const [state,formAction]=useFormState(userResetPassword,initialState)
       const [error, setError] = useState(false);
        useEffect(() => {
          console.log(state)
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        }, [state]);
  return (
    <>
      <FormContainer>
      <form action={formAction}>
        <h2 className={styles.head}>Reset Password</h2>
        <InputLabel tag="Current Password" name="currentpassword"/>
        <InputLabel tag="New Password" name="password"/>
        {error && <ErrorMessage message={state?.message?state?.message:""}/>}
        <Button tag="Update" type="submit"/></form>
      </FormContainer>
    </>
  );
}

