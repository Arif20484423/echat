"use client";
import React, { useContext, useEffect, useState } from "react";
import Contact from "./Contact";
import styles from "./Contacts.module.css";
import compStyles from "../Component.module.css";
import { IoIosSearch } from "react-icons/io";
import LoadingSkeleton from "./LoadingSkeleton";
import { Context } from "@/app/_context/NoteContext";
const Contacts = ({ check, setContacts }) => {
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("");
  const [select, setSelect] = useState(false);
  const {
    toUser2,
    setToUser2,
    connectedRefetch,
    connected,
    setConnected,
  } = useContext(Context);

  function selectContact(data){
    setToUser2(data)
    console.log("TOUSER",data);
  }
  useEffect(() => {
    fetch("/api/connections")
      .then(async (d) => {
        const res = await d.json();
        return res;
      })
      .then((d) => {
        setConnected(d.data);
        setLoading(false);
        if (toUser2 == null && sessionStorage.getItem("toUser")) {
          setToUser2(() => JSON.parse(sessionStorage.getItem("toUser")));
        }
      });
  }, [connectedRefetch]);

  useEffect(() => {
    const fil = connected.filter((e) => {
      if (e.isgroup) {
        return e.group[0].name.substring(0, filter.length) == filter;
      } else {
        return e.connections[0].user.name.substring(0, filter.length) == filter;
      }
    });
    fil.sort((a,b)=>{
      return new Date(b.lastMessage) - new Date(a.lastMessage);
    })
    setFiltered(fil);
  }, [filter,connected]);
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
          if(!e.deleted){
            if (e.isgroup) {
              {
                /* image={e.connections[0].user.image} */
              }
              return (
                <Contact
                  key={e._id}
                  check={check}
                  selectContact={() => {
                    setContacts((c) => [...c, e]);
                  }}
                  deselectContact={() => {
                    setContacts((c) => c.filter((ce) => ce._id != e._id));
                  }}
                  userchatid={e._id}
                  isgroup={true}
                  name={e.group[0].name}
                  image={e.group[0].image ? e.group[0].image.file : ""}
                  lastSeen={e.lastSeen}
                  lastMessage={e.lastMessage}
                  onClick={() => {
                    selectContact(e);
                  }}
                />
              );
            } else {
              return (
                <Contact
                  key={e._id}
                  check={check}
                  selectContact={() => {
                    setContacts((c) => [...c, e]);
                  }}
                  deselectContact={() => {
                    setContacts((c) => c.filter((ce) => ce._id != e._id));
                  }}
                  userchatid={e._id}
                  isgroup={false}
                  name={e.connections[0].user.name}
                  email={e.connections[0].user.email}
                  image={e.connections[0].user.image}
                  lastSeen={e.lastSeen}
                  lastMessage={e.lastMessage}
                  onClick={() => {
                    selectContact(e);
                  }}
                />
              );
            }
          }
          
        })}
      </div>
    </>
  );
};

export default Contacts;
