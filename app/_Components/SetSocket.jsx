"use client";
import React, { useContext, useEffect } from "react";
import { Context } from "../_context/NoteContext";
import { io } from "socket.io-client";
const SetSocket = () => {
  const { socket, setSocket, setMessage } = useContext(Context);

  useEffect(() => {
    fetch("/api/userLoggedIn")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.success) {
          let sock = io(process.env.NEXT_PUBLIC_SOCKET_URL);
          setSocket(sock);
          sock.on("connect", () => {
            console.log("Connected");
          });
          sock.emit("join_room", { room: data.id });
        }
      });
  }, []);
  return null;
};

export default SetSocket;
