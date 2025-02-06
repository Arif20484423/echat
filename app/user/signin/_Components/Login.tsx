"use client"
import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import { useActionState } from "react";
import { userSignIn } from "@/lib/actions/userActions";
import {ResponseType} from "@/lib/actions/userActions"
import {FaGoogle,FaGithub}  from "react-icons/fa"
export default function Login() {
  const initialState={message:null,errors:{}}
    const [state,formAction]=useActionState(userSignIn,initialState)
    
  return (
    <>
      <FormContainer>
      <form action={formAction}>
        <h2 className={styles.head}>Login to eChat</h2>
        <InputLabel tag="Email" tagname="email"/>
        <InputLabel tag="Password" tagname="password"/>
        {/* {state?.message && } */}
        <Button tag="Submit" type="submit"/>
        <div className={styles.icons}>
        <FaGoogle size={25}/>
        <FaGithub size={25}/>
        </div>
        </form>
      </FormContainer>
    </>
  );
}

