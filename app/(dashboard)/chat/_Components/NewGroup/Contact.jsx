"use client";
import React from "react";
import styles from "../Contacts/Contacts.module.css";
const Contact = ({
  id,
  name,
  email,
  image,
  selectedUsers,
  setSelectedUsers,
}) => {
  return (
    <div className={styles.contactbox}>
      <img src={image} alt="image" className={styles.profilepic} />
      <div className={styles.detailbox}>
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.email}>{email}</p>
        </div>
        <input
          type="checkbox"
          onClick={(e) => {
            if (e.target.checked) {
              selectedUsers.push(id);
              setSelectedUsers(() => selectedUsers);
            } else {
              selectedUsers = selectedUsers.filter((e) => e != id);
              setSelectedUsers(() => selectedUsers);
            }
          }}
          style={{ transform: "scale(1.3)" }}
        />
      </div>
    </div>
  );
};

export default Contact;
