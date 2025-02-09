"use client"
import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import { useActionState } from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/_context/NoteContext";
import {  userDetails } from "@/lib/actions/userActions";
import ErrorMessage from "@/app/_UIComponents/ErrorMessage";
import { useRouter } from "next/navigation";
export default function Details() {
  const router= useRouter();
  const {user} = useContext(Context);
  const initialState={success:false,message:null};
  const [state,formAction,pending]= useActionState(userDetails,initialState);
  
   const [error, setError] = useState(false);
    useEffect(() => {
      if(state.success){
        router.push("/chat")
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
        <h2 className={styles.head}>Personal Infromation</h2>
        <InputLabel tag="Name" name="name"/>
        <InputLabel tag="Description" name="description"/> 
        {error &&  <ErrorMessage message={!state?.success?state?.message:""}/>}
         <Button tag="Update" type="submit" disabled={pending}/>
         
         </form>
      </FormContainer>
    </>
  );
}
