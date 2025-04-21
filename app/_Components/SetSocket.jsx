"use client";
import { useContext, useEffect } from "react";
import { Context } from "../_context/NoteContext";
import { io } from "socket.io-client";
const SetSocket = () => {
  const { setSocket, socket, setMessageNotification,toUser,setConnectedRefetch } = useContext(Context);
  // component for connecting and setting up socket

  useEffect(() => {
    fetch("/api/user")
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
          sock.on("disconnect", () => {
            console.log("Disconnected");
          });

          sock.emit("join_room", { room: data.user._id });
          sock.on("message", (data) => {
            // messagenotification to reload chat and connected as needed
            setMessageNotification(data);
            if(toUser){
              if(data.from!=toUser.channelid){
                setConnectedRefetch((t)=>!t)  
              }
            }
            else{
              setConnectedRefetch((t)=>!t)
            }
          });
          sock.on("delete", (data) => {
            // messagenotification to reload chat and connected as needed
            console.log("deleted");
            setMessageNotification((m) => !m);
          });
        }
      });
  }, []);
  return <></>;
};

export default SetSocket;
