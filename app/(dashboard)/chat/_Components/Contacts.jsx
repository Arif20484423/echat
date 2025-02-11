"use client";
import React from "react";
import Contact from "./Contact";
import styles from "./Contacts.module.css";
import { IoIosSearch } from "react-icons/io";
const Contacts = () => {
  return (
    <>
      <div className={styles.searchbox}>
        <input
          type="text"
          className={styles.searchinput}
          placeholder="Search contacts here"
        />
        <IoIosSearch className={styles.searchbutton} size={20} />
      </div>
      <div className={styles.contacts}>
      <Contact></Contact>
      <Contact></Contact>
      <Contact></Contact>

      <Contact></Contact>
      <Contact></Contact>
      <Contact></Contact>
      <Contact></Contact>
      <Contact></Contact>

      <Contact></Contact>
      <Contact></Contact>
      <Contact></Contact>

      <Contact></Contact>
      <Contact></Contact>
      <Contact></Contact>

      <Contact></Contact>
      <Contact></Contact>
      </div>
    </>
  );
};

export default Contacts;
