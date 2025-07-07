"use client";
import { Context } from "@/app/_context/NoteContext";
import { createFolder} from "@/lib/actions/storageActions";
import Navigations from "./Navigations";
import Path from "./Path";
import Buttons from "./Buttons";
import React, { useContext, useEffect, useRef, useState } from "react";
import FolderFiles from "./FolderFiles";
const Root = ({ fileClick,  check,setChecked }) => {
  //here folder path and location of storage means the folder location position is stored in
  //  sessionstorage so that once the page changes or refreshes the folder location can be
  // retrieved from sessionstorage and current open folder too or if page changes and reopened
  //  that opens in the location where it was closed

  const { user } = useContext(Context);
  //folder path related
  const [pathFolders, setPathFolders] = useState([]);
  const [pos, setPos] = useState(-1);
  const [lastPos, setLastPos] = useState(-1);

  const [newFolder, setNewFolder] = useState("New Folder");
  const [refetch, setRefetch] = useState(false);
  const fileref = useRef(null);

  useEffect(() => {
    if (user) {
      if (sessionStorage.getItem("pathFolders")) {
        setPos(() => JSON.parse(sessionStorage.getItem("pos")));
        setLastPos(() => JSON.parse(sessionStorage.getItem("lastPos")));
        setPathFolders(() => JSON.parse(sessionStorage.getItem("pathFolders")));
      } else {
        fetch("/api/user/root", {
          method: "POST",
          body: JSON.stringify({ user: user.id }),
        })
          .then((d) => d.json())
          .then((d) => {
            const pathFolders = [d.data];
            sessionStorage.setItem("pathFolders", JSON.stringify(pathFolders));
            sessionStorage.setItem("pos", JSON.stringify(0));
            sessionStorage.setItem("lastPos", JSON.stringify(0));
            setPos(() => 0);
            setLastPos(() => 0);
            setPathFolders(() => pathFolders);
          });
      }
    }
  }, [user]);

  return (
    <>
      <Navigations
        back={() => {
          if (pos > 0) {
            sessionStorage.setItem("pos", JSON.stringify(pos - 1));
            setPos(pos - 1);
          }
        }}
        forward={() => {
          if (pos < lastPos) {
            sessionStorage.setItem("pos", JSON.stringify(pos + 1));
            setPos(pos + 1);
          }
        }}
      />
      <Path
        pathFolders={pathFolders}
        setPathFolders={setPathFolders}
        pos={pos}
        setPos={setPos}
        setLastPos={setLastPos}
      />
      <Buttons
        fileref={fileref}
        folder={async function () {
          let folder = await createFolder(newFolder, pathFolders[pos]._id, user.id);
          setNewFolder("New Folder")
          setRefetch((s) => !s);
        }}
        newFolder={newFolder}
        setNewFolder={setNewFolder}
        files={async () => {
          const formData = new FormData();
          for (let i = 0; i < fileref.current.files.length; i++) {
            formData.append("files", fileref.current.files[i]);
          }
          formData.append("user", user.id);
          formData.append("folder", pathFolders[pos]._id);
          const res = await fetch("http://localhost:3000/api/user/media", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          setRefetch((t) => !t);
        }}
      />

      <FolderFiles
        pathFolders={pathFolders}
        setPathFolders={setPathFolders}
        pos={pos}
        setPos={setPos}
        lastPos={lastPos}
        setLastPos={setLastPos}
        refetch={refetch}
        setRefetch={setRefetch}
        fileClick={fileClick}
        check={check} setChecked={setChecked}
      />
    </>
  );
};

export default Root;
