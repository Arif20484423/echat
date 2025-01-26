"use client";

import { Context } from "@/app/_context/NoteContext";
import { deleteChat } from "@/lib/actions/chatActions";
import React, { useContext, useEffect, useState } from "react";

const Connected = ({}) => {
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
        if (e.isgroup) {
          // if group add specific group info to toUser to use it to message and delete further  (to self and other users too)
          const key = e.group[0]._id || i;
          return (
            <div key={key}>
              <p
                onClick={() => {
                  setToUser({
                    isgroup: true, // for group check to define operations based on group or not
                    email: e.group[0].groupname, // username should be here in place of email  and name of contact will be group name for groups
                    channelid: e.channelid, // channelid  associated with user and  touser (here group so channelid will be used to fetch all other members of group)
                  });
                }}
              >
                {e.group[0].groupname}
              </p>
              <button
                onClick={async () => {
                  await deleteChat(e._id); // deleting chat for user by setting user with this channel  deleted true via its id
                  setConnectedRefetch((t) => !t);
                }}
              >
                deletechat
              </button>
            </div>
          );
        } else {
          const key = e.connections[0].user._id || i;
          return (
            <div key={key}>
              <p
                onClick={() => {
                  setToUser({
                    id: e.connections[0].user._id, // setting touser id if one to one chat will pass the user id directly instead of fetching users for group
                    email: e.connections[0].user.email, // username should be here for representing user but currently using email
                    channelid: e.connections[0].channelid, // channel id associated to user and toUser halp in adding and fetching messages for the user and for the specific channel
                  });
                }}
              >
                {e.connections[0].user.email}
              </p>
              <button
                onClick={async () => {
                  await deleteChat(e._id); // delete specific chat for the user side by setting deleted true
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
