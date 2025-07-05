"use client";
import React, { useRef, useEffect, useState, useContext } from "react";
import styles from "./Chat.module.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Dropdown from "@/app/_UIComponents/Dropdown";
import FileWrapper from "./FileWrapper";
import { deleteMesssage } from "@/lib/actions/chatActions";
import { Context } from "@/app/_context/NoteContext";
import OutClick from "@/app/_UIComponents/OutClick";
const Received = ({
  selectflag,
  setSelectflag,
  selectMessage,
  deselectMessage,
  forward,
  setForward,
  messageid,
  userfileid,
  fileid,
  username,
  message,
  file,
  id,
  type,
  extension,
  name,
  time,
}) => {
  const { setMessageNotification } = useContext(Context);
  const [options, setOptions] = useState(false);
  const dropRef = useRef(null);
  const dropPointerRef = useRef(null);
  const date = new Date(time);
  async function handleDelete() {
    await deleteMesssage(id);
    setMessageNotification((m) => !m);
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
  return (
    <div className={styles.received}>
      <div className={styles.receivedbox}>
        <div>
          <p>{username}</p>
          {file && (
            <FileWrapper
              link={file}
              type={type}
              extension={extension}
              name={name.substring(0, 50)}
            />
          )}
          <p>{message}</p>
          <p className={styles.time}>
            {date.getDate()}-{date.getMonth()}-{date.getFullYear()} {date.get}{" "}
            {date.getHours()}:{date.getMinutes()}
          </p>
        </div>
      </div>
      {selectflag ? (
        <input
          type="checkbox"
          style={{ transform: "scale(1.3)" }}
          onChange={(e) => {
            if (e.target.checked) {
              selectMessage()
            } else {
              deselectMessage()
            }
          }}
        />
      ) : (
        <IoIosArrowDropdownCircle
          ref={dropPointerRef}
          size={20}
          color="grey"
          onClick={() => {
            setOptions(!options);
          }}
        />
      )}

      {options && (
        <OutClick show={options} setShow={setOptions} caller={dropPointerRef}>
          <div className={styles.dropdowncontainer}>
            <Dropdown
              options={[
                {
                  name: "Select",
                  action: () => {
                    setSelectflag(true);
                    setOptions(false);
                  },
                },
                {
                  name: "Forward",
                  action: () => {
                    selectMessage()
                    setOptions(false);
                    setForward(true);
                    setSelectflag(false);
                  },
                },
                { name: "Delete", action: handleDelete },
              ]}
              message={"jhsbx"}
            />
          </div>
        </OutClick>
      )}
    </div>
  );
};

export default Received;
