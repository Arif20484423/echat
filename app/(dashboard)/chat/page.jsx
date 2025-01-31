"use client";

import { userSignOut } from "@/lib/actions/userActions";
import React, { useState } from "react";
import Connected from "./Components/Connected";
import SearchUser from "./Components/SearchUser";
import CreateGroup from "./Components/CreateGroup"
import Chat from './Components/Chat'
import SelectFiles from "./Components/SelectFiles"
const Page = () => {
  const [showConnected,setShowConnected]=useState(true);
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
         <SelectFiles/>
    </div>
  );
};

export default Page;
