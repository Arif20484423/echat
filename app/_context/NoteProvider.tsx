"use client"

import { useEffect, useRef, useState } from "react";
import { Context } from "./NoteContext";

export default function NoteProvider({children}:{children:React.ReactNode}){
    const [socket,setSocket]= useState(null)
    const [messageNotification,setMessageNotification]=useState(null);
    const [toUser,setToUser]= useState(null);
    const [user,setUser]= useState(null);
    
    

    
    return <Context.Provider value={{socket,setSocket,messageNotification,setMessageNotification,toUser, setToUser,user,setUser}}>
        {children}
    </Context.Provider>
}