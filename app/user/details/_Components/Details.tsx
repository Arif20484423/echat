"use client"
import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import { useFormState } from "react-dom";
import { useContext } from "react";
import { Context } from "@/app/_context/NoteContext";
import { ResponseType, userDetails, userSignIn } from "@/lib/actions/userActions";
export default function Details() {
  const {user} = useContext(Context);
  const initialState={success:false,message:null};
  const [state,formAction]= useFormState(userSignIn,initialState);
  return (
    <>
      <FormContainer>
        <form action={formAction}>
        <input type="hidden" name="id" value={user.id}/>
        <h2 className={styles.head}>Personal Infromation</h2>
        <InputLabel tag="Name" name="name"/>
        <InputLabel tag="Description" name="descrition"/> 
         <Button tag="Update" type="submit"/>
         </form>
      </FormContainer>
    </>
  );
}
