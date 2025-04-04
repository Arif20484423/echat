"use client";

import { useEffect, useState } from "react";
import { Context } from "./NoteContext";

export default function NoteProvider({
  children,
}) {
  const [socket, setSocket] = useState(null);
  const [messageNotification, setMessageNotification] = useState(false);
  const [toUser, setToUser] = useState(null);
  const [user, setUser] = useState(null);
  const [connectedRefetch, setConnectedRefetch] = useState(true);

  
  useEffect(()=>{
    if(user){
      sessionStorage.setItem("user",JSON.stringify(user))
    }
  },[user])
  useEffect(()=>{
    console.log("toUser",toUser)
    console.log("user",user)
    if(toUser){
      sessionStorage.setItem("toUser",JSON.stringify(toUser));
    console.log(JSON.parse(sessionStorage.getItem("toUser")))
    }
  },[toUser,user])
  return (
    <Context.Provider
      value={{
        socket,
        setSocket,
        messageNotification,
        setMessageNotification,
        toUser,
        setToUser,
        user,
        setUser,
        connectedRefetch,
        setConnectedRefetch,
      }}
    >
      {children}
    </Context.Provider>
  );
}
