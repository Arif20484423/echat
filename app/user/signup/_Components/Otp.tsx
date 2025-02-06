"use client"
import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import ErrorMessage from "../../../_UIComponents/ErrorMessage";
import { useFormState } from 'react-dom'
import { ResponseType } from '@/lib/actions/userActions'
import { userVerifyOtp } from '@/lib/actions/userActions'
import { useEffect, useState } from "react";
export default function Otp({step,setStep,email}:{step:number,setStep:Function,email:string}) {
  const initialState:ResponseType={message:null}
      const [state,formAction] = useFormState(userVerifyOtp,initialState)
       const [error, setError] = useState(false);
            useEffect(() => {
              setError(true);
              setTimeout(() => {
                setError(false);
              }, 3000);
            }, [state]);
      if(state?.success){
        setStep(step+1)
      }
  return (

    <>
      <FormContainer>
        <form action={formAction}>
        <h2 className={styles.head}>Signup to eChat</h2>
        <input type="hidden" name='email' value={email}/>
        <InputLabel tag="Otp" name="otp"/>
        {error && <ErrorMessage message={state?.message}/>}
        <Button tag="Confirm" type="submit"/>
        </form>
      </FormContainer>
    </>
  );
}

