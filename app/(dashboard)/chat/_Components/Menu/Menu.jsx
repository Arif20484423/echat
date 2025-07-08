"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import styles from "./Menu.module.css";
import UserInfo from "./UserInfo";
import { PiSignOutBold } from "react-icons/pi";
import { Context } from "@/app/_context/NoteContext";
import { userSignOut } from "@/lib/actions/userActions";
import { FiMessageSquare } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FaRegFolder } from "react-icons/fa";
const Menu = ({ setPage, page }) => {
  
  const { user,online } = useContext(Context);
  const [userinfo, setUserinfo] = useState(false);
  return (
    <>
      <br />
      <div
        className={`${styles.iconbox} ${page == 1 ? styles.selectedicon : ""}`}
        onClick={() => {
          setPage(1);
        }}
      >
        <FiMessageSquare className={`${styles.menuicon} `}></FiMessageSquare>
      </div>

      <div
        className={`${styles.iconbox} ${page == 2 ? styles.selectedicon : ""}`}
        onClick={() => {
          setPage(2);
        }}
      >
        <FiUser className={`${styles.menuicon} `} />
      </div>
      <div
        className={`${styles.iconbox} ${page == 3 ? styles.selectedicon : ""}`}
        onClick={() => {
          setPage(3);
        }}
      >
        <FiUsers className={`${styles.menuicon} `}></FiUsers>
      </div>
      <Link href="/storage">
        <div
          className={`${styles.iconbox} ${
            page == 4 ? styles.selectedicon : ""
          }`}
        >
          <FaRegFolder className={`${styles.menuicon} `}></FaRegFolder>
        </div>
      </Link>
      <div className={styles.user}>
        <div
          className={`${styles.iconbox} ${
            page == 4 ? styles.selectedicon : ""
          }`}
          onClick={() => {
            sessionStorage.setItem("user", JSON.stringify(null));
            sessionStorage.setItem("toUser", JSON.stringify(null));
            userSignOut();
          }}
        >
          <PiSignOutBold className={`${styles.menuicon} `} />
        </div>

        <div className={styles.userimage}>
          <img
            src={
              user && user.image && user.image.length > 0
                ? user.image
                : "/profile.jpg"
            }
            alt="user"
            width={50}
            onClick={() => {
              setUserinfo((t) => !t);
            }}
          />
          <div className={`${online ? styles.online : styles.offline}`}></div>
        </div>

        {userinfo && (
          <UserInfo
            setUserinfo={setUserinfo}
            name_={user.name}
            image_={user.image ? user.image : "/profile.jpg"}
            desc_={user.description}
          />
        )}
      </div>
    </>
  );
};

export default Menu;
