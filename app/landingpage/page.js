// "use client";
// import React from "react";
// import { AiFillMessage } from "react-icons/ai";
// import { FiMessageCircle } from "react-icons/fi";
// import { TiFlashOutline } from "react-icons/ti";
// import ZigzagSection from "./_component/ZigzagSection";
// import Developers from "./_component/Developers";

// const LandingPage = () => {
//   const cardData = [
//     {
//       id: 1,
//       icon: <FiMessageCircle />,
//       heading: "Heading",
//       text: "Whatever you wanna write",
//     },
//     {
//       id: 2,
//       icon: <TiFlashOutline />,
//       heading: "Heading",
//       text: "Whatever you wanna write",
//     },
//   ];
//   const developers = [
//     {
//       id: 1,
//       name: "Sudip Das",
//       designation: "Manager",
//       gitLink: "https://github.com/Arif20484423",
//       imageSrc: "/devImages/devSudip.jpg",
//     },
//     {
//       id: 2,
//       name: "Mohammad Arif",
//       designation: "Manager",
//       gitLink: "https://github.com/Arif20484423",
//       imageSrc: "/devImages/devArif.jpg",
//     },
//     {
//       id: 3,
//       name: "Sakshi Dewangan",
//       designation: "Manager",
//       gitLink: "https://github.com/Arif20484423",
//       imageSrc: "/devImages/devSakshi.jpg",
//     },
//     {
//       id: 4,
//       name: "Sangeeta Bhargava",
//       designation: "Manager",
//       gitLink: "https://github.com/Arif20484423",
//       imageSrc: "/devImages/devSangeeta.jpg",
//     },
//   ];
//   return (
//     <div className="flex flex-col ">
//       <div className=" navbar flex justify-between py-2  w-[100%] px-5">
//         <div className="icon flex justify-center gap-1">
//           <AiFillMessage className="text-[20px] mt-1 text-blue-600" />
//           <p className=" text-[20px] font-bold">eChat</p>
//         </div>
//         <div className="navigators flex gap-5 text-[15px] text-gray-700 mt-1">
//           <p className="cursor-pointer hover:font-medium" onClick={() => {}}>
//             Intorduction
//           </p>
//           <p className="cursor-pointer hover:font-medium" onClick={() => {}}>
//             Developers
//           </p>
//           <p className="cursor-pointer hover:font-medium" onClick={() => {}}>
//             Contact
//           </p>
//         </div>
//         <div className="login&signup flex gap-2 text-[12px]">
//           <button
//             className="px-5 py-2 border-2 border-blue-200 rounded-[5px]"
//             onClick={() => {}}
//           >
//             Sign Up
//           </button>
//           <button
//             className="px-5 py-2 text-white bg-blue-600 rounded-[5px]"
//             onClick={() => {}}
//           >
//             Login
//           </button>
//         </div>
//       </div>
//       <div className="mainbanner flex flex-col sm:flex-row mt-[30px] justify-between px-5">
//         <div className="textarea flex flex-col">
//           <h1 className="text-[40px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
//             Introduction
//           </h1>
//           <p className=" text-gray-600 text-[15px]">
//             Streamline your communication with our all-in-one platform for
//             messaging, document and collaboration
//           </p>
//           <button
//             className="px-5 py-2 text-white bg-blue-600 rounded-[5px] w-max text-[12px] mt-5"
//             onClick={() => {}}
//           >
//             Get Started
//           </button>
//         </div>
//         <div className="iconarea hidden sm:flex text-[200px] lg:text-[300px]">
//           <AiFillMessage className=" text-blue-600" />
//         </div>
//       </div>
//       <div className="introduction flex flex-col bg-gray-100 px-5 py-5">
//         <h1 className=" text-center font-bold text-[25px] text-gray-800">
//           Introduction
//         </h1>
//         <p className="text-center text-[12px] text-gray-600">
//           Everything you need to connect, share and collaborate in one
//           integrated platform
//         </p>
//         <ZigzagSection data={cardData} />
//       </div>
//       {/* Developers area start from here */}
//       <div className="developers flex flex-col">
//         \
//         <div className="textarea flex flex-col">
//           <h2 className="text-center font-bold text-[25px] text-gray-800">
//             Developers
//           </h2>
//           <p className="text-center text-[12px] text-gray-600">
//             Meet the developers of our site
//           </p>
//         </div>
//         <div className="developerCardContainer">
//             <Developers data={developers}/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


"use client";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import { TiFlashOutline } from "react-icons/ti";
import ZigzagSection from "./_component/ZigzagSection";
import Developers from "./_component/Developers";
import "./style.css"; // 

const LandingPage = () => {
  const cardData = [
    {
      id: 1,
      icon: <FiMessageCircle />,
      heading: "Heading",
      text: "Whatever you wanna write",
    },
    {
      id: 2,
      icon: <TiFlashOutline />,
      heading: "Heading",
      text: "Whatever you wanna write",
    },
  ];

  const developers = [
    {
      id: 1,
      name: "Sudip Das",
      designation: "Manager",
      gitLink: "https://github.com/Arif20484423",
      imageSrc: "/devImages/devSudip.jpg",
    },
    {
      id: 2,
      name: "Mohammad Arif",
      designation: "Manager",
      gitLink: "https://github.com/Arif20484423",
      imageSrc: "/devImages/devArif.jpg",
    },
    {
      id: 3,
      name: "Sakshi Dewangan",
      designation: "Manager",
      gitLink: "https://github.com/Arif20484423",
      imageSrc: "/devImages/devSakshi.jpg",
    },
    {
      id: 4,
      name: "Sangeeta Bhargava",
      designation: "Manager",
      gitLink: "https://github.com/Arif20484423",
      imageSrc: "/devImages/devSangeeta.jpg",
    },
  ];

  return (
    <div className="landing">
      <div className="navbar">
        <div className="logo">
          <AiFillMessage className="logo-icon" />
          <p className="logo-text">eChat</p>
        </div>
        <div className="nav-links">
          <p>Introduction</p>
          <p>Developers</p>
          <p>Contact</p>
        </div>
        <div className="auth-buttons">
          <button className="signup-button">Sign Up</button>
          <button className="login-button">Login</button>
        </div>
      </div>

      <div className="main-banner">
        <div className="text-content">
          <h1 className="gradient-text">Introduction</h1>
          <p className="subtitle">
            Streamline your communication with our all-in-one platform for
            messaging, document and collaboration
          </p>
          <button className="get-started-btn">Get Started</button>
        </div>
        <div className="icon-area">
          <AiFillMessage className="banner-icon" />
        </div>
      </div>

      <div className="introduction">
        <h1 className="section-heading">Introduction</h1>
        <p className="section-subtitle">
          Everything you need to connect, share and collaborate in one
          integrated platform
        </p>
        <ZigzagSection data={cardData} />
      </div>

      <div className="developers">
        <div className="text-content">
          <h2 className="section-heading">Developers</h2>
          <p className="section-subtitle">Meet the developers of our site</p>
        </div>
        <div className="developer-card-container">
          <Developers data={developers} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
