"use client"
import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import ErrorMessage from "../../../_UIComponents/ErrorMessage";
import { useActionState } from "react";
import { userVerifyOtp } from '@/lib/actions/userActions'
import { useEffect, useState } from "react";
export default function Otp({next,email}) {
  const initialState={message:null}
      const [state,formAction,pending] = useActionState(userVerifyOtp,initialState)
       const [error, setError] = useState(false);
            useEffect(() => {
              if(state?.success){
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
        <input type="hidden" name='email' value={email}/>
        <InputLabel tag="Otp" name="otp"/>
        {error && <ErrorMessage message={state?.message?state?.message:""}/>}
        <Button tag="Confirm" type="submit" disabled={pending}/>
        </form>
      </FormContainer>
    </>
  );
}

