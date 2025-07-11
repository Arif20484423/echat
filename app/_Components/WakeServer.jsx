"use client";
import React, { useEffect } from "react";

const WakeServer = () => {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}`)
      .then((d) => d.json())
      .then((d) => {
        console.log(d.message);
      });
  }, []);
  return <></>;
};

export default WakeServer;
