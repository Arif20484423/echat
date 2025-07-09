// import React from 'react';
// import Card from "./Card"
// const ZigzagSection = ({data}) => {
//   return (
//     <div className='flex flex-col bg-gray-100 gap-3 px-5 py-10'>
//       {data.map((cardData) => (
//         <div key={cardData.id} className={`flex ${cardData.id % 2 == 1 ? "flex-row" : "flex-row-reverse"} w-full`}>
//           <Card icon={cardData.icon} heading={cardData.heading} text={cardData.text} />
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ZigzagSection


import React from 'react';
import Card from './Card';
import './ZigzagSection.css'; // Import external CSS

const ZigzagSection = ({ data }) => {
  return (
    <div className="zigzag-section">
      {data.map((cardData) => (
        <div
          key={cardData.id}
          className={`card-row ${cardData.id % 2 === 1 ? 'normal' : 'reverse'}`}
        >
          <Card
            icon={cardData.icon}
            heading={cardData.heading}
            text={cardData.text}
          />
        </div>
      ))}
    </div>
  );
};

export default ZigzagSection;
