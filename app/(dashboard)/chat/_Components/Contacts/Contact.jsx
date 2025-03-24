"use client";
import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./Contacts.module.css";
import { VscKebabVertical } from "react-icons/vsc";
import { Context } from "@/app/_context/NoteContext";
import Dropdown from "@/app/_UIComponents/Dropdown";
import { deleteChat } from "@/lib/actions/chatActions";
const Contact = ({
  name,
  email = "",
  id = "",
  userchatid,
  channelid,
  description,
  image = "",
  isgroup,
  select, setSelect
}) => {
  const { setToUser ,setMessageNotification} = useContext(Context);
  const [options, setOptions] = useState(false);
  const dropRef = useRef(null);
  const dropPointerRef = useRef(null);


  async function deletechat(){
    console.log("DEleting")
    await deleteChat(userchatid);
    console.log("DEleted")
    setMessageNotification((m)=>!m);
  }
  async function selectchat(){
    setSelect((t)=>!t)
    setOptions(false)
  }
  function handleClick(e) {
    if (
      dropPointerRef.current &&
      !dropPointerRef.current.contains(e.target) &&
      dropRef.current &&
      !dropRef.current.contains(e.target)
    ) {
      setOptions(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClick);
  });
  if (isgroup) {
    return (
      <div
        className={styles.contactbox}
        onClick={() => {
          setToUser({
            isgroup:true,
            channelid: channelid,
            description: description,
            name: name,
            image: image,
          });
        }}
      >
        <img src={image} alt="profile" className={styles.profilepic} />
        <div className={styles.detailbox}>
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.email}>{email}</p>
          </div>
          
          {select ? <input type="checkbox" style={{"transform":"scale(1.3)"}}  onClick={(e) => {
              e.stopPropagation();
            }}/>:<VscKebabVertical
            ref={dropPointerRef}
            onClick={(e) => {
              e.stopPropagation();
              setOptions(!options);
            }}
          />}
          {options && (
            <div ref={dropRef} className={styles.dropdowncontainer}>
              <Dropdown options={[{ name: "select" ,action:selectchat}, { name: "delete" ,action:deletechat}]} />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={styles.contactbox}
        onClick={() => {
          setToUser({
            id: id,
            email: email,
            channelid: channelid,
            description: description,
            name: name,
            image: image,
          });
        }}
      >
        <img src={image} alt="profile" className={styles.profilepic} />
        <div className={styles.detailbox}>
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.email}>{email}</p>
          </div>
          {select ?<input type="checkbox" style={{"transform":"scale(1.3)"}}  onClick={(e) => {
              e.stopPropagation();
            }}/> :<VscKebabVertical
            ref={dropPointerRef}
            onClick={(e) => {
              e.stopPropagation();
              setOptions(!options);
            }}
          />}
          {options && (
            <div ref={dropRef} className={styles.dropdowncontainer}>
              <Dropdown options={[{ name: "select" ,action:selectchat}, { name: "delete" ,action:deletechat}]} />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Contact;
