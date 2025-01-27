"use client";

import { Context } from "@/app/_context/NoteContext";
import { createFolder } from "@/lib/actions/storageActions";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const { user } = useContext(Context);
  const [pathFolders, setPathFolders] = useState([]);
  const [pos, setPos] = useState(-1);
  const [newFolder,setNewFolder]= useState(null)
  const [refetch,setRefetch]= useState(false)
  const [folders, setFolders] = useState(null);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    if (user) {
      fetch("/api/getrootfolder", {
        method: "POST",
        body: JSON.stringify({ user: user.id }),
      })
        .then((d) => d.json())
        .then((d) => {
          setPathFolders((f) => [...f, d.data]);
          setPos(() => 0);
        });
    }
    return () => {
      setPathFolders((f) => []);
    };
  }, [user]);
  useEffect(() => {
    if (pos >= 0) {
      console.log(pathFolders)
      console.log(pos)
      fetch("/api/getfolders", {
        method: "POST",
        body: JSON.stringify({ folder: pathFolders[pos]._id }),
      })
        .then((d) => d.json())
        .then((d) => {
          console.log("folders",d);
          setFolders(d.data);
        });
      fetch("/api/getfiles",{
        method:"POST",
        body:JSON.stringify({folder:pathFolders[pos]._id})
      }).then(d=>d.json()).then((d)=>{
        console.log("files",d.data);
        setFiles(d.data)
      })
    }
  }, [pos,refetch]);
  return (
    <>
      <input type="text" onChange={(e)=>{
        setNewFolder(e.target.value);
      }}/>
      <button onClick={async ()=>{
        await createFolder(newFolder,pathFolders[pos]._id,user.id)
        setRefetch((s)=>!s)
      }}>New Folder </button>
      {folders && folders.map((e) => {
        return <div key={e._id} onClick={()=>{
          setPathFolders((f)=>[...f,e]);
          setPos((p)=>p+1);
        }}>{e.name}</div>;
      })}
      {files && 
        files.map((e)=>{
          return (
            <div key={e._id}>
              {e.file.name}
            </div>
          )
        })
      }
    </>
  );
};

export default Page;
