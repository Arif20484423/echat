"use client";
import React, { useContext, useEffect, useState } from "react";
import Contact from "./Contact";
import styles from "./Contacts.module.css";
import compStyles from "../Component.module.css";
import { IoIosSearch } from "react-icons/io";
import LoadingSkeleton from "./LoadingSkeleton";
import { Context } from "@/app/_context/NoteContext";
const Contacts = ({ check, setContacts, contacts }) => {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("");
  const [select, setSelect] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const { setToUser, user, toUser, connectedRefetch, setConnectedRefetch } =
    useContext(Context);
  useEffect(() => {
    // console.log("REfetching cont")
    fetch("/api/connections")
      .then(async (d) => {
        console.log("res", d);
        const res = await d.json();
        return res;
      })
      .then((d) => {
        setConnected(d.data);
        setFiltered(d.data);
        setLoading(false);
        // console.log(d.data);
        if (toUser == null && sessionStorage.getItem("toUser")) {
          setToUser(() => JSON.parse(sessionStorage.getItem("toUser")));
        }
        // console.log("REfetchcont")
      });
    // console.log("REfetched cont")
  }, [connectedRefetch,toUser]);

  useEffect(() => {
    const fil = connected.filter((e) => {
      if (e.isgroup) {
        return e.group[0].name.substring(0, filter.length) == filter;
      } else {
        return e.connections[0].user.name.substring(0, filter.length) == filter;
      }
    });
    // console.log(fil)
    setFiltered(fil);
  }, [filter]);
  if (loading) {
    return <LoadingSkeleton />;
  }
  return (
    <>
      <div className={styles.searchbox}>
        <input
          type="text"
          className={compStyles.input}
          placeholder="Search name"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        <IoIosSearch className={styles.searchbutton} size={20} />
      </div>
      <div className={styles.contacts}>
        {filtered.map((e, i) => {
          if (e.isgroup) {
            {
              /* image={e.connections[0].user.image} */
            }
            return (
              <Contact
                key={e._id}
                check={check}
                setContacts={setContacts}
                contacts={contacts}
                select={select}
                setSelect={setSelect}
                userchatid={e._id}
                isgroup={true}
                name={e.group[0].name}
                description={e.group[0].description}
                channelid={e.channelid}
                connections={e.connections}
                image={e.group[0].image.file}
                lastSeen={e.lastSeen}
                lastMessage={e.lastMessage}
              />
            );
          } else {
            return (
              <Contact
                key={e._id}
                check={check}
                setContacts={setContacts}
                contacts={contacts}
                select={select}
                setSelect={setSelect}
                userchatid={e._id}
                isgroup={false}
                name={e.connections[0].user.name}
                description={e.connections[0].user.description}
                id={e.connections[0].user._id}
                connections={e.connections}
                channelid={e.channelid}
                email={e.connections[0].user.email}
                image={e.connections[0].user.image}
                lastSeen={e.lastSeen}
                lastMessage={e.lastMessage}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default Contacts;
