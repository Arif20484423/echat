


"use client";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import { TiFlashOutline } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import ZigzagSection from "./_component/ZigzagSection";
import Developers from "./_component/Developers";
import Link from "next/link";
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
      <div className="contactUs">
        <h2>Contact Details</h2>
        <footer>
          <div className="leftPart">
            <h2>eChat</h2>
            <p>place for the communication with your teammates, colleagues etc</p>
            <div className="iconContainer">
              <FaXTwitter />
              <FaFacebookF />
              <FaInstagram />
              <FiGithub />
            </div>
          </div>
          <div className="rightPart">
            <ul>
              <li><a href="">Features</a></li>
              <li><a href="">Pricing</a></li>
              <li><a href="">Integrations</a></li>
              <li><a href="">Roadmap</a></li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
