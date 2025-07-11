
import React from "react";
import "./DevCard.css"; // Import the external CSS file

const DevCard = ({ imageSrc, name, designation, gitLink }) => {
  const names = name.split(" ");
  let nameTag = "";
  for (let i = 0; i < names.length; i++) {
    nameTag += names[i].charAt(0).toUpperCase();
  }

  return (
    <div className="dev-card">
      <div className="image-container">
        <img src={imageSrc} alt={name} className="profile-image" />
      </div>
      <div className="details-container">
        <div className="name-tag">{nameTag}</div>
        <div className="details">
          <a href={gitLink} target="_blank" rel="noopener noreferrer" className="name-link">
            {name}
          </a>
          <p className="designation">{designation}</p>
        </div>
      </div>
    </div>
  );
};

export default DevCard;

