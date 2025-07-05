import React from "react";

const DevCard = ({ imageSrc, name, designation, gitLink }) => {
  const names = name.split(" ");
  let nameTag = "";
  for (let i = 0; i < names.length; i++) {
    nameTag += names[i].charAt(0).toUpperCase();
  }
  return (
    <div className="flex flex-col items-center justify-between w-[250px] h-[300px] border border-blue-200 rounded-md p-5">
      <div className="imageContainer w-[150px] h-[150px] rounded-full mb-5">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        ></img>
      </div>
      <div className="detailsContainer flex gap-5">
        <div className="nameTagContainer flex bg-blue-100 font-bold rounded-full w-[50px] h-[50px] justify-center items-center">
          {nameTag}
        </div>
        <div className="details flex flex-col">
          <a
            href={gitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gray-800 hover:underline"
          >
            {name}
          </a>
          <p className="font-medium text-[12px] text-gray-700">{designation}</p>
        </div>
      </div>
    </div>
  );
};

export default DevCard;
