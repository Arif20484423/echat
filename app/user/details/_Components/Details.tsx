"use client"
import styles from "../../User.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
export default function Details() {
  return (
    <>
      <FormContainer>
        <h2 className={styles.head}>Personal Infromation</h2>
        <InputLabel tag="Name" name="name"/>
        <InputLabel tag="Description" name="descrition"/> 
         <Button tag="Update" type="submit"/>
      </FormContainer>
    </>
  );
}
