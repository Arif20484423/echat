"use client";
import React, { useContext } from "react";
import { PiChatsTeardropFill } from "react-icons/pi";
import { TiGroup } from "react-icons/ti";
import { TiUserAdd } from "react-icons/ti";
import { MdGroupAdd } from "react-icons/md";
import Image from "next/image";
import { FaFolder } from "react-icons/fa";
import styles from "./Menu.module.css";
import compStyles from "./Component.module.css";
import { Context } from "@/app/_context/NoteContext";
const Menu = ({ setPage }) => {
  const { user } = useContext(Context);
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
          <rect fill="none" height="24" width="24" />
          <g>
            <path d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,17c0,0.55-0.45,1-1,1H7c-0.55,0-1-0.45-1-1l0-0.61 c0-1.18,0.68-2.26,1.76-2.73C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2 C2,12.1,2.9,13,4,13z M5.13,14.1C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43L0,17 c0,0.55,0.45,1,1,1l3.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2 C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1 c0.4,0.68,0.63,1.46,0.63,2.29V18l3.5,0c0.55,0,1-0.45,1-1L24,16.43z M12,6c1.66,0,3,1.34,3,3c0,1.66-1.34,3-3,3s-3-1.34-3-3 C9,7.34,10.34,6,12,6z" />
          </g>
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
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V8c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1H6zm9 4c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <div
        className={styles.iconbox}
        onClick={() => {
          setPage(4);
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
      </div>
      <div className={styles.user }>
        <img src={user ? user.image : "/profile.jpg"}  alt="user" width={50} />
      </div>
    </>
  );
};

export default Menu;
