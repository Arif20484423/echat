"use client"
import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import ErrorMessage from "../../../_UIComponents/ErrorMessage";
import {FaGoogle,FaGithub}  from "react-icons/fa"
import { userEmailOtp } from '@/lib/actions/userActions'
import { useFormState } from 'react-dom'
import { useEffect, useState } from "react";
export default function Login({step,setStep,setEmail}:{step:number,setStep:Function,setEmail:Function}) {
  const initialState={message:null,errors:{},success:false}
    const [state,formAction] = useFormState(userEmailOtp,initialState);
    if(state?.success){
      setStep(step+1);
    }
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
        <h2 className={styles.head}>Signup to eChat</h2>
        <InputLabel tag="Email" name="email" setValue={setEmail}/>
        {error &&  <ErrorMessage message={state?.message}/>}
        <Button tag="Get Otp" type="submit" />
        <div className={styles.icons}>

        <FaGoogle size={25}/>
        <FaGithub size={25}/>
        </div>
        </form>
      </FormContainer>
    </>
  );
}

