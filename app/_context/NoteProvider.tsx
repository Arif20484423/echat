"use client"

import { useState } from "react";
import { Context } from "./NoteContext";

export default function NoteProvider({children}:{children:React.ReactNode}){
    const [socket,setSocket]= useState(null)
    const [message,setMessage]=useState(null);
    return <Context.Provider value={{socket,setSocket,message,setMessage}}>
        {children}
    </Context.Provider>
}