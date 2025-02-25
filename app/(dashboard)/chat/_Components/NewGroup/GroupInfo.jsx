"use client"
import React, { useContext, useRef, useState } from 'react'
import styles from "./NewGroup.module.css"
import InputLabel from '@/app/_UIComponents/InputLabel'
import FunctionButton from "@/app/_UIComponents/FunctionButton"
import { Context } from '@/app/_context/NoteContext'
import ErrorMessage from '@/app/_UIComponents/ErrorMessage'
import { useRouter } from 'next/navigation'

const GroupInfo = ({users,setPage}) => {
    const router = useRouter()
    const {user,setToUser} =useContext(Context)
    const [name,setName]= useState("");
    const [description,setDescription]= useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const imageRef= useRef(null);
    async function handleClick(){
        const formData = new FormData();
        console.log(imageRef.current.file)
        formData.append("image",imageRef.current.files[0])
        formData.append("user",user.id)
        formData.append("name",name);
        formData.append("description",description);
        for(let i=0;i<users.length;i++){
            formData.append("toUsers",users[i]);
        }
        console.log("send")
        const res= await fetch("/api/group/channel",{
            method:"POST",
            body:formData
        })
        console.log("retruned")
        if(res.redirected){
            router.replace(res.url);
        }
        console.log("json fetch")
        const d = await res.json();
        console.log(d)
        if(d.success){
            setPage(()=>1);
        }
        else{
            setErrorMessage(()=>"Error group creation! Please Retry");
            setTimeout(()=>{
                setErrorMessage(()=>"")
            },3000)
        }
        // const group=await createGroupChannel(user.id,users,name,description,formData);

        
    }
  return (
    <div className={styles.groupinfo}>
    <h2>New Group</h2>
        
        <InputLabel tag="Name" name="name" setValue={setName}/>
        <InputLabel tag="Description" name="description" setValue={setDescription}/>
        {/* <button className={styles.create}>Create Group</button> */}
        <input type="file" ref={imageRef}  accept='.jpg, .jpeg, .png' />
        <ErrorMessage message={errorMessage}/>
        <FunctionButton onClick={handleClick}>create group</FunctionButton>
    </div>
  )
}

export default GroupInfo