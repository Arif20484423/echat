"use client";
import React, { useRef, useState } from "react";

import styles from "../../Component.module.css";
import File from "./File";
import Dropdown from "@/app/_UIComponents/Dropdown";
import OutClick from "@/app/_UIComponents/OutClick";
const Item = ({
  type,
  src,
  name,
  ext,
  userfileid,
  fileid,
  deleteItem,
  renameItem,
  sendItem,
  selectFlag,
  selected,
  setSelected,
  selectItem,
  editable = true,
}) => {
  const [drop, setDrop] = useState(false);
  const dropper = useRef(null);
  const [renameFlag, setRenameFlag] = useState(false);

  function rename() {
    setRenameFlag(true);
    setDrop(false);
  }

  return (
    <div className={styles.storageitem}>
      {selectFlag && type != "folder" && (
        <input
          type="checkbox"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            e.stopPropagation();
            console.log(name);
            if (e.target.checked) {
              console.log(name, selected);
              setSelected((s) => [
                ...s,
                { file: fileid, userfile: userfileid },
              ]);
            } else {
              const filtered = selected.filter((e) => {
                return e.file != fileid;
              });
              console.log(filtered);
              setSelected(filtered);
            }
          }}
        />
      )}
      <div>
        <File type={type} src={src} ext={ext}></File>
        <p>{name}</p>
        {renameFlag && (
          <input
            type="text"
            style={{ width: "80px" }}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                renameItem(e.target.value);
                setRenameFlag(false);
              }
            }}
          />
        )}
      </div>
      {editable && (
        <svg
          ref={dropper}
          onClick={(e) => {
            e.stopPropagation();
            setDrop((d) => !d);
          }}
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="grey"
        >
          <path d="m480-340 180-180-57-56-123 123-123-123-57 56 180 180Zm0 260q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      )}
      {drop && (
        <OutClick show={drop} setShow={setDrop} caller={dropper}>
          <div className={styles.dropdown}>
            <Dropdown
              options={
                type == "folder"
                  ? [
                      { name: "delete", action: deleteItem },
                      { name: "rename", action: rename },
                    ]
                  : [
                      { name: "select", action: selectItem },
                      { name: "send", action: sendItem },
                      { name: "delete", action: deleteItem },
                      { name: "rename", action: rename },
                      
                    ]
              }
            />
          </div>
        </OutClick>
      )}
    </div>
  );
};

export default Item;
