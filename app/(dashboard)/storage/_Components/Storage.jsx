"use client";

import { Context } from "@/app/_context/NoteContext";
import { createFolder, uploadMedia } from "@/lib/actions/storageActions";
import React, { useContext, useEffect, useRef, useState } from "react";
import FolderFiles from "./FolderFiles";
import Modal from "./Modal"
const Storage = ({fileClick}) => {
  //here folder path and location of storage means the folder location position is stored in
  //  sessionstorage so that once the page changes or refreshes the folder location can be 
  // retrieved from sessionstorage and current open folder too or if page changes and reopened
  //  that opens in the location where it was closed


  const { user } = useContext(Context);
  //folder path related
  const [pathFolders, setPathFolders] = useState([]);
  const [pos, setPos] = useState(-1);
  const [lastPos, setLastPos] = useState(-1);

  //
  const [newFolder, setNewFolder] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const fileref= useRef(null);

  const [modal,setModal]= useState(false);
  
  useEffect(() => {
    if (user) {
      if(sessionStorage.getItem("pathFolders")){
        // console.log("have")
        setPos(()=>JSON.parse(sessionStorage.getItem("pos")))
        setLastPos(()=>JSON.parse(sessionStorage.getItem("lastPos")))
        setPathFolders(()=>JSON.parse(sessionStorage.getItem("pathFolders")))
      }
      else{
        // console.log("setting")
        fetch("/api/getrootfolder", {
          method: "POST",
          body: JSON.stringify({ user: user.id }),
        }).then(d=>d.json()).then((d)=>{
          const pathFolders=[d.data]
          sessionStorage.setItem("pathFolders",JSON.stringify(pathFolders))
          sessionStorage.setItem("pos",JSON.stringify(0))
          sessionStorage.setItem("lastPos",JSON.stringify(0))
          setPos(()=>0);
          setLastPos(()=>0)
          setPathFolders(()=>pathFolders)
        })
      }
      
    }
  }, [user]);

  return (
    <>
      <button

        onClick={() => {
          if (pos > 0) {
            sessionStorage.setItem("pos", JSON.stringify(pos-1));
            setPos(pos-1);
            
          }
        }}
      >
        back
      </button>

      <button
        onClick={() => {
          if (pos < lastPos) {
            sessionStorage.setItem("pos", JSON.stringify(pos+1));
            setPos(pos + 1);
            
          }
        }}
      >
        next
      </button>
      <br />
      {pathFolders.map((e, i) => {
        if(i<=pos){
          return (
          <button
            key={e._id}
            onClick={() => {
              const newpathFolders=pathFolders.slice(0,i+1);
              sessionStorage.setItem("pathFolders",JSON.stringify(newpathFolders));
              sessionStorage.setItem("pos",JSON.stringify(i));
              sessionStorage.setItem("lastPos",JSON.stringify(i));
              setPathFolders(()=>newpathFolders);
              setPos(()=>i);
              setLastPos(()=>i);
            }}
            className={` ${i == pos ? "text-blue-300" : null} `}
          >
            {e.name}
            <span>/</span>
          </button>
        );
        }
        
      })}
      <br />

      <input
        type="text"
        onChange={(e) => {
          setNewFolder(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          await createFolder(newFolder, pathFolders[pos]._id, user.id);
          setRefetch((s) => !s);
        }}
      >
        New Folder{" "}
      </button>

        <input type="file" ref={fileref} multiple/>
        <button onClick={async ()=>{
          const formData= new FormData();
         for(let i=0;i<fileref.current.files.length;i++){
          formData.append("files",fileref.current.files[i])
         }
          await uploadMedia(formData,user.id,pathFolders[pos]._id)
          setRefetch((t)=>!t);
          
        }}>uploadfiles</button>

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
      />
      <button onClick={()=>{
        setModal((t)=>!t);
      }}>set</button>
      {modal && <Modal setModal={setModal}/>}
    </>
  );
};

export default Storage;

