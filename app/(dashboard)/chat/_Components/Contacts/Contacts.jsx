"use client";
import React, { useContext, useEffect, useState } from "react";
import Contact from "./Contact";
import styles from "./Contacts.module.css";
import compStyles from "../Component.module.css";
import { IoIosSearch } from "react-icons/io";
import { Context } from "@/app/_context/NoteContext";
const Contacts = () => {
  const [connected, setConnected] = useState([]);
  const { setToUser, user, connectedRefetch, setConnectedRefetch } =
    useContext(Context);
  useEffect(() => {
    fetch("/api/connections")
      .then((d) => d.json())
      .then((d) => {
        console.log(d.data)
        setConnected(d.data);
      });
  }, [connectedRefetch]);
  return (
    <>
      <div className={styles.searchbox}>
        <input
          type="text"
          className={compStyles.input}
          placeholder="Search contacts here"
        />
        <IoIosSearch className={styles.searchbutton} size={20} />
      </div>
      <div className={styles.contacts}>
        {connected.map((e, i) => {
          return <Contact key={e._id} name={e.connections[0].user.name} description={e.connections[0].user.description} id={e.connections[0].user._id} channelid={e.channelid} email={e.connections[0].user.email} image={e.connections[0].user.image}/>;
        })}
      </div>
    </>
  );
};

export default Contacts;
