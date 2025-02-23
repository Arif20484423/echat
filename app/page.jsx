"use client";


import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

export default function Home() {
  return (
    <>
      
      <Picker data={data} onEmojiSelect={(e)=>{
        console.log(e.native)
      }} theme="light" previewPosition="none"/>
      
    </>
  );
}
