"use client";
import styles from "../../User.module.css";
import styles2 from "@/app/_UIComponents/Component.module.css";
import FormContainer from "../../../_UIComponents/FormContainer";
import InputLabel from "../../../_UIComponents/InputLabel";
import Button from "../../../_UIComponents/Button";
import { useActionState } from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/_context/NoteContext";
import { userDetails } from "@/lib/actions/userActions";
import ErrorMessage from "@/app/_UIComponents/ErrorMessage";
import { useRouter } from "next/navigation";
import { FcBiotech } from "react-icons/fc";
export default function Details() {
  const router = useRouter();
  const { user } = useContext(Context);
  const initialState = { success: false, message: null };
  const [state, formAction, pending] = useActionState(
    userDetails,
    initialState
  );
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (state.success) {
      router.push("/chat");
    }
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
    fetch("/api/details")
      .then((d) => d.json())
      .then((d) => {
        if (d.success) {
          setDetails(d.data);
        }
      });
  }, [state]);
  function setName(v) {
    setDetails({ ...details, name: v });
  }
  function setDescription(v) {
    setDetails({ ...details, description: v });
  }
  return (
    <>
      {details && (
        <FormContainer>
          <form action={formAction}>
            <input type="hidden" name="id" value={details._id} />
            <h2 className={styles.head}>Personal Infromation</h2>

            <label htmlFor="Name" className={styles2.label}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={details.name}
              id="Name"
              className={styles2.input}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <label htmlFor="Description" className={styles2.label}>
              Description
            </label>
            <input
              type="text"
              name="description"
              value={details.description}
              id="Descrition"
              className={styles2.input}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <input type="file" name="image" accept=".jpg, .jpeg, .png" />
            {details.image && (
              <input type="hidden" name="imageexists" value={details.image} />
            )}
            {error && (
              <ErrorMessage message={!state?.success ? state?.message : ""} />
            )}
            <Button tag="Update" type="submit" disabled={pending} />
          </form>
        </FormContainer>
      )}
    </>
  );
}
