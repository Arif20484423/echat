"use client";
import React, { useState, useEffect } from "react";
import StorageItem from "../wrappers/StorageItem";
const Documents = () => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/user/documents", {
      method: "POST",
    })
      .then((d) => d.json())
      .then((d) => {
        console.log(d.data);
        setDocs(() => d.data);
        // console.log(photos)
      });
  }, []);
  return (
    <>
      {docs.map((e) => {
        if (e.file) {
          console.log(e.file.extension);
          return (
            <StorageItem
              key={e._id}
              type={e.file.type}
              ext={e.file.extension}
              name={e.name}
              src={e.file.file}
            />
          );
        }
      })}
    </>
  );
};

export default Documents;
