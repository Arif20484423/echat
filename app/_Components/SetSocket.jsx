"use client";
import React, { useContext, useEffect } from "react";
import { Context } from "../_context/NoteContext";
import { io } from "socket.io-client";
const SetSocket = () => {
  const {  setSocket, setMessageNotification,toUser } = useContext(Context);

  useEffect(() => {
    fetch("/api/userlogged")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.success) {
          console.log("Connecting",process.env.NEXT_PUBLIC_SOCKET_URL);
          let sock = io(process.env.NEXT_PUBLIC_SOCKET_URL);
          setSocket(sock);

          sock.on("connect", () => {
            console.log("Connected");
          });
          sock.emit("join_room", { room: data.id });
          sock.on("message", (data) => {
            setMessageNotification(data);
          });
        }
      });
  }, []);
  return null;
};

export default SetSocket;
