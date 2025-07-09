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

import React from 'react';
import DevCard from './DevCard';
import './Developers.css'; // Import the external CSS file

const Developers = ({ data }) => {
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

