"use client"

import { useEffect, useState } from "react";
import { Context } from "./NoteContext";

export default function NoteProvider({children}:{children:React.ReactNode}){
    const [socket,setSocket]= useState(null)
    const [message,setMessage]=useState(null);
    const [toUser,setToUser]= useState(null);
    const [user,setUser]= useState(null);
    useEffect(()=>{
        console.log("Provider")
        console.log(toUser)
        console.log(user)
    },[toUser,user])
    return <Context.Provider value={{socket,setSocket,message,setMessage,toUser, setToUser,user,setUser}}>
        {children}
    </Context.Provider>
}