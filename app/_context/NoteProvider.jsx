"use client";

import { useEffect, useRef, useState } from "react";
import { Context } from "./NoteContext";

export default function NoteProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [messageNotification, setMessageNotification] = useState(false);
  const [toUser, setToUser] = useState(null);
  const [toUser2, setToUser2] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connectedRefetch, setConnectedRefetch] = useState(true);
  const [connected, setConnected] = useState([]);
  const [online,setOnline] = useState(false)
  const toUserRef = useRef(null);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    toUserRef.current = toUser2;
    if (toUser2) {
      sessionStorage.setItem("toUser", JSON.stringify(toUser2));
    }
  }, [toUser, user, toUser2]);
  return (
    <Context.Provider
      value={{
        socket,
        setSocket,
        messages,
        setMessages,
        messageNotification,
        setMessageNotification,
        toUser,
        toUserRef,
        setToUser,
        toUser2,
        setToUser2,
        user,
        setUser,
        connectedRefetch,
        setConnectedRefetch,
        connected,
        setConnected,
        online,
        setOnline
      }}
    >
      {children}
    </Context.Provider>
  );
}
