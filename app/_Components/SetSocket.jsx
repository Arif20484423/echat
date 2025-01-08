"use client";
import { useContext, useEffect } from "react";
import { Context } from "../_context/NoteContext";
import { io } from "socket.io-client";
const SetSocket = () => {
  const { setSocket, setMessageNotification } = useContext(Context);
// component for connecting and setting up socket 
  useEffect(() => {
    fetch("/api/userlogged")
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
          sock.on("message", (data) => {
            // messagenotification to reload chat and connected as needed
            setMessageNotification(data);
          });
        }
      });
  }, []);
  return null;
};

export default SetSocket;
