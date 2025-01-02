"use client"

import { useState } from "react";
import { Context } from "./NoteContext";

export default function NoteProvider({children}:{children:React.ReactNode}){
    const [socket,setSocket]= useState(null);

    return <Context.Provider value={{socket,setSocket}}>
        {children}
    </Context.Provider>
}