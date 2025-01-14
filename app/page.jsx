"use client";

import { useEffect, useState } from "react";
import { uploadfile } from "../lib/actions/mediaactions";
import {supabase} from "./_Components/SupabaseClient"

export default function Home() {
  const [fil, setFil] = useState(null);
  const [m, setM] = useState(null);
  async function submit(e) {
    e.preventDefault();
    const file = e.target.filess.files[0];
    console.log(file)
    console.log("uploading");
    // const { data, error } = await supabase.storage
    //   .from("echat public")
    //   .upload("public/p2.pdf", file);
    // console.log("data", data);
    // console.log("error", error);
    // console.log("uploaded");

    
    // console.log("uploading")
    // const buff= await file.arrayBuffer()
    // console.log("done")
    // console.log(buff)
    // const buffer= Buffer.from(buff)
    // console.log("buffer")
    // console.log(buffer)
    // const data=buffer.toString("base64")
    // const base64Url = `data:png;base64,${data}`;
    // console.log("buffer done")
    // setFil(base64Url)
    // setM("M")
    // const formData= new FormData();
    // formData.append("image",file)
    // uploadfile(formData);
    // console.log(formData.get(file.name))
  }
  

  return (
    <div>
      home
      <img src={fil} alt="no img" />
      {m && m}
      <form onSubmit={submit}>
        <input type="file" name="filess" />
        <button type="submit">open</button>
      </form>
    </div>
  );
}
