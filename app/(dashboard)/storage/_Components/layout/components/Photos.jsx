"use client";
import React, { useEffect, useState } from "react";
import StorageItem from "../wrappers/StorageItem";
const Photos = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/user/photos", {
      method: "POST",
    })
      .then((d) => d.json())
      .then((d) => {
        console.log(d.data);
        setPhotos(() => d.data);
        // console.log(photos)
      });
  }, []);
  return (
    <>
      {photos.map((e) => {
        if (e.file)
          return (
            <StorageItem
              key={e._id}
              type="image"
              name={e.name}
              src={e.file.file}
            />
          );
      })}
    </>
  );
};

export default Photos;
