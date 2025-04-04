"use client"
import React, { useEffect, useState } from 'react'
import StorageItem from "./StorageItem"
const Videos = () => {
    const [videos,setVideos] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:3000/api/user/videos",{
            method:"POST"
        }).then((d)=>d.json()).then((d)=>{
            console.log(d.data)
            setVideos(()=>d.data);
            // console.log(photos)
        })
    },[])
  return (
    <>
        {videos.map((e)=>{
            if(e.file!=null)
            return (
                <StorageItem key={e._id} type="video" name={e.name} src={e.file.file}/>  
            );
        })}
    </>
  )
}

export default Videos