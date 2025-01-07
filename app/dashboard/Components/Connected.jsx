"use client";

import { Context } from "@/app/_context/NoteContext";
import { deleteChat } from "@/lib/actions/chatActions";
import React, { useContext, useEffect, useState } from "react";

const Connected = ({ showConnected }) => {
  const [connected, setConnected] = useState([]);

  const { setToUser, user, connectedRefetch, setConnectedRefetch } =
    useContext(Context);
  useEffect(() => {
    fetch("/api/connectedcontacts")
      .then((d) => d.json())
      .then((d) => {
        setConnected(d.data);
      });
  }, [connectedRefetch]);
  return (
    <div>
      {connected.map((e, i) => {
        if(e.isgroup){
          const key = e.group[0]._id || i;
        return (
          <div>
            <p
              key={key}
              onClick={() => {
                setToUser({
                  isgroup:true,
                  email: e.group[0].name,
                  channelid: e.channelid,
                });
              }}
            >
              {e.group[0].name}
            </p>
            <button
              onClick={async () => {
                await deleteChat(user.id, e.channelid);
                setConnectedRefetch((t) => !t);
              }}
            >
              deletechat
            </button>
          </div>
        );
        }
        else{
          const key = e.connections[0].user._id || i;
        return (
          <div>
            <p
              key={key}
              onClick={() => {
                setToUser({
                  id: e.connections[0].user._id,
                  email: e.connections[0].user.email,
                  channelid: e.connections[0].channelid,
                });
              }}
            >
              {e.connections[0].user.email}
            </p>
            <button
              onClick={async () => {
                await deleteChat(e._id);
                setConnectedRefetch((t) => !t);
              }}
            >
              deletechat
            </button>
          </div>
        );
        }
      })}
    </div>
  );
};

export default Connected;
