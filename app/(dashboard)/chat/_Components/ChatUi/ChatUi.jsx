"use client"
import React, { useContext, useRef, useState } from "react"
import styles from "./Chat.module.css"
import compStyles from "../Component.module.css"
import Messages from "./Messages"
import { Context } from "@/app/_context/NoteContext"
import { addMessage } from "@/lib/actions/chatActions"
export default function Chat({setChatPage}){
    const [message, setMessage] = useState("");
    const fileref = useRef(null);
    const {
          toUser,
          user,
          setMessageNotification,
          socket,
        } = useContext(Context);

    async function sendMessage(){
        if (toUser.isgroup) {
            console.log("group")
            //for group adding different method to add messages
            fetch("/api/getchannelusers", {
              method: "POST",
              body: JSON.stringify({
                channel: toUser.channelid,
                user: user.id,
              }),
            })
              .then((d) => d.json())
              .then(async (d) => {
                const formData = new FormData();
                for (let i = 0; i < fileref.current.files.length; i++) {
                  formData.append("files", fileref.current.files[i]);
                }
                if (message.length > 0) formData.append("message", message);
                await addMessageGroup(
                  user.id, // for message creation and addition of message at users side in channelmessage (channelmessage comntains user channel specific message instance)
                  d.data, // for adding message to other group members in channelmessage
                  toUser.channelid,
                  formData
                );
                setMessageNotification(message); //mesagenotification to self to reload chats
                socket.emit("groupmessage", {
                  to: d.data,
                  message: message,
                }); //mesagenotification to other to reload chats
              });
          } else {
            console.log("onetoone")
            const formData = new FormData();
            for (let i = 0; i < fileref.current.files.length; i++) {
              formData.append("files", fileref.current.files[i]);
            }
            if (message.length > 0) formData.append("message", message);

            await addMessage(
              toUser.channelid,
              user.id,
              toUser.id,
              formData
            );
            setMessageNotification(message); //mesagenotification to self to reload chats
            socket.emit("message", { to: toUser.id, message: message }); //mesagenotification to other to reload chats
          }
    }
    return (
        <div className={styles.chatbox}>
            <div className={styles.chatheader}  onClick={()=>{
              setChatPage(2);
            }}>
                <div className={styles.userinfo}>
                    <img src={toUser ? toUser.image:"/profile.jpg"} alt="img" className={styles.userimage}/>
                    <div>
                    {
                      toUser && 
                      <><p className={styles.name}>{toUser.name}</p>
                      <p className={styles.desc}>{toUser.email}</p></>
                    }
                    </div>
                </div>
                
            </div>
            <Messages/>
            <div className={styles.messagebox}>
            <input type="file" className={styles.file} ref={fileref} multiple />
            <svg xmlns="http://www.w3.org/2000/svg"  height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><g/><path d="M11.99,2C6.47,2,2,6.48,2,12c0,5.52,4.47,10,9.99,10C17.52,22,22,17.52,22,12C22,6.48,17.52,2,11.99,2z M8.5,8 C9.33,8,10,8.67,10,9.5S9.33,11,8.5,11S7,10.33,7,9.5S7.67,8,8.5,8z M16.71,14.72C15.8,16.67,14.04,18,12,18s-3.8-1.33-4.71-3.28 C7.13,14.39,7.37,14,7.74,14h8.52C16.63,14,16.87,14.39,16.71,14.72z M15.5,11c-0.83,0-1.5-0.67-1.5-1.5S14.67,8,15.5,8 S17,8.67,17,9.5S16.33,11,15.5,11z"/></g></svg>
            <svg onClick={()=>{
                fileref.current.click()
            }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 6.75v10.58c0 2.09-1.53 3.95-3.61 4.15-2.39.23-4.39-1.64-4.39-3.98V5.14c0-1.31.94-2.5 2.24-2.63 1.5-.15 2.76 1.02 2.76 2.49v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6.75c0-.41-.34-.75-.75-.75s-.75.34-.75.75v8.61c0 1.31.94 2.5 2.24 2.63 1.5.15 2.76-1.02 2.76-2.49V5.17c0-2.09-1.53-3.95-3.61-4.15C9.01.79 7 2.66 7 5v12.27c0 2.87 2.1 5.44 4.96 5.71 3.29.3 6.04-2.26 6.04-5.48V6.75c0-.41-.34-.75-.75-.75s-.75.34-.75.75z"/></svg>
            <input type="text"  className={compStyles.input} style={{width:"80%"}} placeholder='your message here' onChange={(e)=>{
                setMessage(e.target.value);
            }}/>
            <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"/></svg>
            </div>
        </div>
    );

}