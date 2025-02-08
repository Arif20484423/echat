"use client"
import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import ErrorMessage from "../../../_UIComponents/ErrorMessage";
import { userSetPassword } from '@/lib/actions/userActions'
import { useFormState } from 'react-dom'
import { ResponseType } from '@/lib/actions/userActions'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
export default function Password({email}) {
  const router= useRouter()
    const initialState={message:null}
    const [state,formAction]=useFormState(userSetPassword,initialState);

 const [error, setError] = useState(false);
 const [password, setPassword] = useState("");
 const [passwordCheck, setPasswordCheck] = useState("");
 const [disabled, setDisabled] = useState(true);
 useEffect(()=>{
  if(password===passwordCheck){
    setDisabled(false)
  }
  else{
    setDisabled(true)
  }
 },[password,passwordCheck])
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
        <input type="hidden" name='email' value={email}/>
        <InputLabel tag="Password" name="password" setValue={setPassword}/>
        <InputLabel tag="Confirm Password" name="passwordcheck" setValue={setPasswordCheck}/>
        {error &&  <ErrorMessage message={state?.message?state?.message:""}/>}
        <Button tag="Signup" type="submit" disabled={disabled}/>
        </form>
      </FormContainer>
    </>
  );
}

