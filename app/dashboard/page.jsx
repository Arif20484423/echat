"use client";

import { userSignOut } from "@/lib/actions/userActions";
import React, { useContext, useEffect, useState } from "react";
import Connected from "./Components/Connected";
import SearchUser from "./Components/SearchUser";
import { Context } from "../_context/NoteContext";
import CreateGroup from "./Components/CreateGroup"
import Chat from './Components/Chat'
const Page = () => {
  const {setUser} = useContext(Context)
  const [showConnected,setShowConnected]=useState(true);
  
  useEffect(()=>{
    fetch("/api/userlogged").then(d=>d.json()).then(d=>setUser({id:d.id,email:d.email}));
  },[])
  return (
    <div>
      dashboard page<br />
      <button
        onClick={(e) => {
          userSignOut();
        }}
      >
        signout
      </button>
<br />
      <button onClick={()=>{
        setShowConnected(()=>2);
      }}>new</button>
      <button onClick={()=>{
        setShowConnected(()=>3);
      }}>new group</button>
      <div className="grid grid-cols-2" >
      
        <div className=" bg-slate-400">
          {
            showConnected==1 && <Connected showConnected={showConnected}/>
          }
          {
            showConnected==2 && <SearchUser setShowConnected={setShowConnected}/>
          }
          {
            showConnected==3 && <CreateGroup setShowConnected={setShowConnected}/>
          }
        </div>
        <div className=" bg-blue-400">
          <Chat/>
        </div>
      </div>

    </div>
  );
};

export default Page;
