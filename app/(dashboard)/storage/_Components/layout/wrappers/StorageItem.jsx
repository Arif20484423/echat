"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import styles from "../../Component.module.css";
import File from "./File";
import Dropdown from "@/app/_UIComponents/Dropdown";
import OutClick from "@/app/_UIComponents/OutClick";
const Item = ({ type, src, name, ext, deleteItem, renameFlag=false, editable = true }) => {
  const [drop, setDrop] = useState(false);
  const dropper = useRef(null);
  return (
    <div className={styles.storageitem}>
      <Link
        href={type == "folder" ? "" : src}
        style={{ color: "black", textDecoration: "none" }}
        target={type == "folder" ? "" : "_blank"}
      >
        <div>
        <File type={type} src={src} ext={ext}></File>
        <p>{name}</p>
        </div>
      </Link>
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
              options={[
                { name: "send" },
                { name: "delete", action: deleteItem },
                { name: "rename"},
                { name: "move" },
              ]}
            />
          </div>
        </OutClick>
      )}
    </div>
  );
};

export default Item;
