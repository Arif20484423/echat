"use client";
import React, { useRef, useState } from "react";
import OutClick from "@/app/_UIComponents/OutClick";
import Dropdown from "@/app/_UIComponents/Dropdown";
import styles from "../../Component.module.css";
const SelectedMenu = ({ setSelectFlag, send, deleteMultiple }) => {
  const [drop, setDrop] = useState(false);
  const dropper = useRef(null);
  function cancel() {
    setSelectFlag(false);
  }
  return (
    <div className={styles.selectedmenu}>
      <svg
        ref={dropper}
        onClick={(e) => {
          e.stopPropagation();
          setDrop((d) => !d);
        }}
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="black"
      >
        <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
      </svg>
      

      {drop && (
        <OutClick show={drop} setShow={setDrop} caller={dropper}>
          <div className={styles.dropdown}>
            <Dropdown
              options={[
                { name: "cancel", action: cancel },
                { name: "send", action: send },
                { name: "delete", action: deleteMultiple },
                // { name: "delete", action: deleteItem },
                // { name: "rename", action: rename },
                // { name: "move" },
              ]}
            />
          </div>
        </OutClick>
      )}
    </div>
  );
};

export default SelectedMenu;
