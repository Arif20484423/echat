"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const fref = useRef(null);
  function handle() {
    // const f = new FormData();
    // for (let i = 0; i < fref.current.files.length; i++) {
    //   f.append("file", fref.current.files[i]);
    // }
    console.log(fref.current.files)
    // fetch("/api/message", {
    //   method: "POST",
    //   body: f,
    // });
  }
  return (
    <>
      hello
      <input type="file" ref={fref} multiple />
      <button onClick={handle}>sub</button>
    </>
  );
}
