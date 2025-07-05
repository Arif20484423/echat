"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./ChatProfile.module.css";
import { Context } from "@/app/_context/NoteContext";
import FileUi from "../Files/FileUi";
import Skeleton from "./Skeleton"
const ChatProfile = ({ setChatPage }) => {
  const [loading,setLoading] = useState(true)
  const { toUser2, user } = useContext(Context);
  const [files, setFiles] = useState([]);
  const [members,setMembers] = useState(null);

  useEffect(() => {
    

    async function fun() {
      let mem = await fetch("/api/channel/users/details", {
        method: "POST",
        body: JSON.stringify({ channelid: toUser2.channelid }),
      });
      mem= await mem.json()
      // console.log(mem.data)
      setMembers(mem.data)
      const res = await fetch("/api/channel/files", {
        method: "POST",
        body: JSON.stringify({ channelid: toUser2.channelid, user: user.id }),
      });
      const data = await res.json();
      // console.log(data.data);
      setFiles(() => data.data);
      setLoading(false)
    }
    fun();
  }, [toUser2]);
  if(loading){
    return <Skeleton></Skeleton>
  }
  return (
    <div className={styles.chatprofile}>
      <div>
        <div className={styles.nav}>
          <svg
            onClick={() => {
              setChatPage(1);
            }}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
        <div className={styles.profile}>
          <img
            src={toUser2 ? toUser.connections[0].user.image : "/profile.jpg"}
            alt="image"
            className={styles.profilepic}
          />
          <h1>{toUser2.connections[0].user.name}</h1>
          <p>{toUser2.connections[0].user.email}</p>
          <p>{toUser2.connections[0].user.description}</p>
        </div>

        <h3>Members</h3>
        <p>
          {members &&
            members.map((e) => {
              return <span key={e._id}>{e.user.name}, </span>;
            })}
        </p>
        <h3>Media</h3>

        <div className={styles.files}>
          {files.map((e) => {
            return (
              <div key={e._id}>
                <FileUi
                  type={e.file.file.type}
                  link={e.file.file.file}
                  extension={e.file.file.extension}
                  width={100}
                  height={100}
                />
                <p className={styles.filename}>
                  {e.file.name.substring(0, 15)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatProfile;
