"use client";
import { useContext, useEffect } from "react";
import { Context } from "../_context/NoteContext";
import { io } from "socket.io-client";
const SetSocket = () => {
  const {
    setSocket,
    socket,
    setMessageNotification,
    toUser,
    toUserRef,
    toUser2,
    setConnectedRefetch,
    messages,
    setMessages,
    connected,
    setConnected,
  } = useContext(Context);
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
            console.log("Room TO Join",data.user._id)
            sock.emit("join_room", { room: data.user._id });
          });
          sock.on("check",(data)=>{
            console.log("CHECK ",data)
          })
          sock.on("checkto", (data) => {
            console.log("CHECK TO ", data);
          });
          sock.on("disconnect", () => {
            console.log("Disconnected");
          });
          sock.on("message", (data) => {
            // messagenotification to reload chat and connected as needed
            console.log("SOCKET")
            console.log(data.message)
            if(toUserRef.current){
              
              if(toUserRef.current.channelid!=data.from){
                
                setConnected((t) =>
                  t.map((e) => {
                    if (e.channelid == data.from) {
                      console.log(
                        data.message[data.message.length - 1].channelupdate
                      );
                      e = {
                        ...e,
                        ...data.message[data.message.length - 1].channelupdate
                          
                      };
                    }
                    return e;
                  })
                );
                
              }
              else{
                setConnected((t) =>
                  t.map((e) => {
                    if (e.channelid == data.from) {
                      console.log(
                        data.message[data.message.length - 1].channelupdate
                      );
                      e = {
                        ...e,
                        ...data.message[data.message.length - 1].channelupdate,
                      };
                    }
                    return e;
                  })
                );
                setMessages((m) => [...m, ...data.message]);
                
              }
            }
            else{
              setConnectedRefetch((t) => !t);
            }
            
            // if(toUser){
            //   if(data.from!=toUser.channelid){
            //     setConnectedRefetch((t)=>!t)  
            //   }
            // }
            // else{
            //   setConnectedRefetch((t)=>!t)
            // }
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
