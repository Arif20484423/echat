"use client";

import React, { useState, useRef } from "react";
import OutClick from "@/app/_UIComponents/OutClick";
import styles from "../../Component.module.css";

const Buttons = ({ fileref, folder, files, newFolder, setNewFolder }) => {
  const [add, setAdd] = useState(false);
  const addref = useRef(null);
  return (
    <>
      <div className={styles.buttons}>
        <input
          type="file"
          ref={fileref}
          onChange={files}
          style={{ display: "none" }}
          multiple
        />
        <button
          className={styles.uploadfile}
          onClick={() => {
            fileref.current.click();
          }}
        >
          Upload Files{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#ffffff"
          >
            <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
          </svg>
        </button>
        <button
          className={styles.createfolder}
          ref={addref}
          onClick={() => {
            setAdd((a) => !a);
          }}
        >
          Add Folder{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#ffffff"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>
      </div>
      {add && (
        <OutClick show={add} setShow={setAdd} caller={addref}>
          <div className={styles.newfolder}>
            <label htmlFor="folder">Folder Name</label>
            <input
              type="text"
              id="folder"
              name="folder"
              value={newFolder}
              onChange={(e) => {
                setNewFolder(e.target.value);
              }}
            />
            <button onClick={folder}>Create</button>
          </div>
        </OutClick>
      )}
    </>
  );
};

export default Buttons;
