"use client";
import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import ErrorMessage from "../../../_UIComponents/ErrorMessage";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  userEmailOtp,
  userSignInGithub,
  userSignInGoogle,
} from "@/lib/actions/userActions";
import { useActionState } from "react";
import { useEffect, useState } from "react";

export default function Signup({ next, setEmail }) {
 
  const initialState = { message: null, errors: {}, success: false };
  const [state, formAction, pending] = useActionState(userEmailOtp, initialState);

  const [error, setError] = useState(false);
  useEffect(() => {
    if (state?.success) {
      next()
    }
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [state]);
  return (
    <>
      <FormContainer>
        <form action={formAction}>
          <h2 className={styles.head}>Signup to eChat</h2>
          <InputLabel tag="Email" name="email" setValue={setEmail} required={true}/>
          {error && (
            <ErrorMessage message={state?.message ? state?.message : ""} />
          )}
          <Button tag="Get Otp" type="submit" disabled={pending}/>
          <p className={styles.formlink}>
            Already a User, <Link href="/user/signin">Signin</Link>{" "}
          </p>
          <div className={styles.icons}>
            <FaGoogle
              size={25}
              onClick={() => {
                userSignInGoogle();
              }}
            />
            <FaGithub
              size={25}
              onClick={() => {
                userSignInGithub();
              }}
            />
          </div>
        </form>
      </FormContainer>
    </>
  );
}
