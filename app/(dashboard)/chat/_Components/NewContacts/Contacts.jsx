"use client";
import React, { useContext, useEffect, useState } from "react";
import Contact from "./Contact";
import styles from "../Contacts/Contacts.module.css";
import compStyles from "../Component.module.css";
import { IoIosSearch } from "react-icons/io";
import LoadingSkeleton from "./LoadingSkeleton"
import { Context } from "@/app/_context/NoteContext";
const Contacts = ({setPage}) => {
  const {user} = useContext(Context)
  const [loading,setLoading] = useState(true);
  const [key, setKey] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ key: key }),
    })
      .then((d) => d.json())
      .then((d) => {
        setUsers(d.data);
        setLoading(false)
      });
  }, [key]);
  if(loading){
    return <LoadingSkeleton></LoadingSkeleton>
  }
  return (
    <>
      
      <div className={styles.searchbox}>
        <input
          type="text"
          className={compStyles.input}
          placeholder="Search email"
          onChange={(e) => {
            setKey(e.target.value);
          }}
        />
        <IoIosSearch className={styles.searchbutton} size={20} />
      </div>
      {users.length <=1  && <p className={styles.message}>Seems no user is registered to echat, ask your friends to join echat and then continue with the application</p>}
      <div className={styles.contacts}>
        {users.map((e, i) => {
          {
            if(user._id!=e._id)
             return <Contact key={e._id} name={e.name} id={e._id}  email={e.email} image={e.image} setPage={setPage}/>; 
          }
        })}
      </div>
    </>
  );
};

export default Contacts;
