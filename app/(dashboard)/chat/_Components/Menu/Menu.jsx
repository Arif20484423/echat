"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import styles from "./Menu.module.css";
import UserInfo from "./UserInfo"
import compStyles from "../Component.module.css";
import { Context } from "@/app/_context/NoteContext";
import { userSignOut } from "@/lib/actions/userActions";

const Menu = ({ setPage }) => {
  const { user } = useContext(Context);
  const [userinfo,setUserinfo] =useState(false);
  return (
    <>
      <div
        className={styles.iconbox}
        onClick={() => {
          setPage(1);
        }}
      >
        <svg
          className={compStyles.icon}
          xmlns="http://www.w3.org/2000/svg"
          height="26px"
          viewBox="0 0 24 24"
          width="26px"
          fill="#00000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 14H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      </div>

      <div
        className={styles.iconbox}
        onClick={() => {
          setPage(2);
        }}
      >
        <svg
          className={compStyles.icon}
          xmlns="http://www.w3.org/2000/svg"
          height="26px"
          viewBox="0 0 24 24"
          width="26px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V8c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1H6zm9 4c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <div
        className={styles.iconbox}
        onClick={() => {
          setPage(3);
        }}
      >
        <svg
          className={compStyles.icon}
          xmlns="http://www.w3.org/2000/svg"
          height="26px"
          viewBox="0 0 24 24"
          width="26px"
          fill="#000000"
        >
          <g>
            <rect fill="none" height="24" width="24" />
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <path d="M22,9V8c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v1h-1c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h1v1c0,0.55,0.45,1,1,1h0 c0.55,0,1-0.45,1-1v-1h1c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H22z" />
            <g>
              <path d="M8,12c2.21,0,4-1.79,4-4s-1.79-4-4-4S4,5.79,4,8S5.79,12,8,12z" />
              <path d="M8,13c-2.67,0-8,1.34-8,4v3h16v-3C16,14.34,10.67,13,8,13z" />
              <path d="M12.51,4.05C13.43,5.11,14,6.49,14,8s-0.57,2.89-1.49,3.95C14.47,11.7,16,10.04,16,8S14.47,4.3,12.51,4.05z" />
              <path d="M16.53,13.83C17.42,14.66,18,15.7,18,17v3h2v-3C20,15.55,18.41,14.49,16.53,13.83z" />
            </g>
          </g>
        </svg>
      </div>
      <Link href="/storage">
      <div className={styles.iconbox}>
        
        <svg
          className={compStyles.icon}
          xmlns="http://www.w3.org/2000/svg"
          height="26px"
          viewBox="0 0 24 24"
          width="26px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-1.41-1.41z" />
        </svg>
      </div></Link>
      <div className={styles.user}>
        <svg
          onClick={() => {
            sessionStorage.setItem("user", JSON.stringify(null));
            sessionStorage.setItem("toUser", JSON.stringify(null));
            userSignOut();
          }}
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="26px"
          fill="#00000"
        >
          <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-160q100 0 170-70t70-170q0-51-19-94.5T650-650l-57 57q22 22 34.5 51t12.5 62q0 66-47 113t-113 47q-66 0-113-47t-47-113q0-33 12.5-62t34.5-51l-57-57q-32 32-51 75.5T240-480q0 100 70 170t170 70Zm-40-240h80v-240h-80v240Z" />
        </svg>
        
        <img src={(user && user.image && user.image.length>0)? user.image : "/profile.jpg"} alt="user" width={50}  onClick={()=>{
          setUserinfo((t)=>!t);
        }}/>
          {userinfo && <UserInfo setUserinfo={setUserinfo} name_={user.name} image_={user.image?user.image:"/profile.jpg"} desc_={user.description}/>}
      </div>
    </>
  );
};

export default Menu;
