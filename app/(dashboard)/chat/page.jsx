"use client";

import { userSignOut } from "@/lib/actions/userActions";
import React, { useState } from "react";
import Connected from "./_Components/Connected";
import SearchUser from "./_Components/SearchUser";
import CreateGroup from "./_Components/CreateGroup"
import Chat from './_Components/Chat'
import SelectFiles from "./_Components/SelectFiles"
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
         {/* <SelectFiles/> */}
    </div>
  );
};

export default Page;
