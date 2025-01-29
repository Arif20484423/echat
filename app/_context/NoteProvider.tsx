"use client";

import { useEffect, useState } from "react";
import { Context } from "./NoteContext";

export default function NoteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState(null);
  const [messageNotification, setMessageNotification] = useState(null);
  const [toUser, setToUser] = useState(null);
  const [user, setUser] = useState(null);
  const [connectedRefetch, setConnectedRefetch] = useState(true);


  // useEffect(()=>{
  //   console.log("toUser",toUser)
  //   console.log("user",user)
  // },[toUser,user])
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
