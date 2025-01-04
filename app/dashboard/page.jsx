"use client";

import { userSignOut } from "@/lib/actions/userActions";
import React, { useContext, useEffect, useState } from "react";
import Connected from "./Components/Connected";
import SearchUser from "./Components/SearchUser";
import { Context } from "../_context/NoteContext";
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
        setShowConnected(c=>!c);
      }}>new</button>
      <div className="grid grid-cols-2" >
      
        <div className=" bg-slate-400">
          {
            showConnected?<Connected showConnected={showConnected}/>:<SearchUser setShowConnected={setShowConnected}/>
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
