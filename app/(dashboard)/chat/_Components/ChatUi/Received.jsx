"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./Chat.module.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Dropdown from "@/app/_UIComponents/Dropdown";
import FileUi from "./FileUi"
const Received = ({ user, message, file , id,type, extension}) => {
  const [options, setOptions] = useState(false);
  const dropRef = useRef(null);
  const dropPointerRef = useRef(null);

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
  return (
    <div className={styles.received}>
      <div className={styles.receivedbox}>
        <div>
          <p>{user}</p>
          {file && <FileUi link={file} alt="file" type={type} extension={extension} width={type=="image"?300:150}/>}
          <p>{message}</p>
        </div>
      </div>
      <IoIosArrowDropdownCircle
        ref={dropPointerRef}
        size={20}
        color="grey"
        onClick={() => {
          setOptions(!options);
        }}
      />
      {options && (
        <div ref={dropRef} className={styles.dropdowncontainer}>
          <Dropdown
            options={[
              { name: "Select" },
              { name: "Forward" },
              { name: "Delete" },
            ]}
            message={"jhsbx"}
          />
        </div>
      )}
    </div>
  );
};

export default Received;
