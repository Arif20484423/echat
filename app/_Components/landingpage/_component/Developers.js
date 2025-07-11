// import React from 'react'
// import DevCard from "./DevCard";

// const Developers = ({data}) => {
//   return (
//     <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-5'>
//       {data.map((devData) => (
//         <div key={devData.id}><DevCard name={devData.name} imageSrc={devData.imageSrc} designation={devData.designation} gitLink={devData.gitLink}/></div>
//       ))}
//     </div>
//   )
// }

// export default Developers
"use client";
import { React, useEffect } from "react";
import DevCard from "./DevCard";
import "./Developers.css"; // Import the external CSS file

const Developers = ({ data }) => {
  useEffect(() => {
    const scrollContainer = document.querySelector(".developers-grid");
    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1; // scrolls right 1px
      }
    }, 20); // scroll speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="developers-grid">
      {data.map((devData) => (
        <div key={devData.id}>
          <DevCard
            name={devData.name}
            imageSrc={devData.imageSrc}
            designation={devData.designation}
            gitLink={devData.gitLink}
          />
        </div>
      ))}
    </div>
  );
};

export default Developers;
