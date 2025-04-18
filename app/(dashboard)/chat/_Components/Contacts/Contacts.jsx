"use client";
import React, { useContext, useEffect, useState } from "react";
import Contact from "./Contact";
import styles from "./Contacts.module.css";
import compStyles from "../Component.module.css";
import { IoIosSearch } from "react-icons/io";
import { Context } from "@/app/_context/NoteContext";
const Contacts = ({check,setContacts,contacts}) => {
  
  const [connected, setConnected] = useState([]);
  const [select,setSelect]= useState(false);
  const [selectedContacts,setSelectedContacts] = useState([]);
  const { setToUser, user, toUser, connectedRefetch, setConnectedRefetch } =
    useContext(Context);
  useEffect(() => {
    fetch("/api/connections")
      .then(async (d) => {
        console.log("res",d)
        const res=await d.json();
        return res;
      })
      .then((d) => {
        setConnected(d.data);
        console.log(d.data);
        if(toUser==null && sessionStorage.getItem("toUser")){
          setToUser(()=>JSON.parse(sessionStorage.getItem("toUser")))
        }
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
          if(e.isgroup){
            {/* image={e.connections[0].user.image} */}
            return <Contact key={e._id} check={check} setContacts={setContacts} contacts={contacts} select={select} setSelect={setSelect} userchatid={e._id} isgroup={true}  name={e.group[0].name} description={e.group[0].description}  channelid={e.channelid}  connections={e.connections}  image={e.group[0].image.file}/>;
          }
          else{
            return <Contact key={e._id} check={check}  setContacts={setContacts}  contacts={contacts} select={select} setSelect={setSelect} userchatid={e._id} isgroup={false} name={e.connections[0].user.name} description={e.connections[0].user.description} id={e.connections[0].user._id} connections={e.connections}  channelid={e.channelid} email={e.connections[0].user.email} image={e.connections[0].user.image}/>;
          }
          
        })}
      </div>
    </>
  );
};

export default Contacts;
