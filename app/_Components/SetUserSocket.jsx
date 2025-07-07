"use client";
import { useContext, useEffect } from "react";
import { Context } from "../_context/NoteContext";
import { io } from "socket.io-client";
const SetSocket = () => {
  const {
    setUser,
    setSocket,
    toUserRef,
    setConnectedRefetch,
    setMessages,
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
          setUser(() => ({ ...data.user, id: data.user._id }));

          let sock = io(process.env.NEXT_PUBLIC_SOCKET_URL);
          setSocket(sock);

          sock.on("connect", () => {
            sock.emit("join_room", { room: data.user._id });
          });
          sock.on("message", (data) => {
            if (toUserRef.current) {
              if (toUserRef.current.channelid != data.from) {
                setConnected((t) =>
                  t.map((e) => {
                    if (e.channelid == data.from) {
                      e = {
                        ...e,
                        ...data.message[data.message.length - 1].channelupdate,
                      };
                    }
                    return e;
                  })
                );
              } else {
                setMessages((m) => [...m, ...data.message]);
                setConnected((t) =>
                  t.map((e) => {
                    if (e.channelid == data.from) {
                      e = {
                        ...e,
                        ...data.message[data.message.length - 1].channelupdate,
                      };
                    }
                    return e;
                  })
                );
              }
            } else {
              setConnected((t) =>
                t.map((e) => {
                  if (e.channelid == data.from) {
                    e = {
                      ...e,
                      ...data.message[data.message.length - 1].channelupdate,
                    };
                  }
                  return e;
                })
              );
            }
          });
          sock.on("delete", (data) => {
            if (data.from == toUserRef.current.channelid) {
              setMessages((messages) => {
                let temp = [];
                for (let j = 0; j < messages.length; j++) {
                  if (messages[j].message._id == data.messageid) {
                    messages[j].delete = true;
                  }

                  temp.push(messages[j]);
                }
                return temp;
              });
            }
          });
        } else {
          console.error("Error loading user in SetUserSocket.jsx");
        }
      });
  }, []);
  return <></>;
};

export default SetSocket;
