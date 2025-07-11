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
      heading: "Chat Actions",
      text: (
        <div>
          <p>Messages - To chat with a user you are connected</p>
          <p>Add User - To connect with a new user</p>
          <p>Create Group - To create a group of users </p>
          <p>Storage - To move to the File manager page</p>
        </div>
      ),
      img: "/navspec.png",
      imgAlt: "",
    },
    {
      id: 2,
      icon: <FiMessageCircle />,
      heading: "User Account Actions",
      text: (
        <div>
          <p>Logout - Click the button to logout of you raccount</p>
          <p>Profile - Click the profile picture to edit your details.</p>
          <p> Profile contains Name, Photo, Description and Password</p>
        </div>
      ),
      img: "/logspec.png",
      imgAlt: "",
    },
    {
      id: 3,
      icon: <FiMessageCircle />,
      heading: "File Transfer Actions",
      text: (
        <div>
          <p>Storage - To transfer files from the echat saved files</p>
          <p>Device - To transfer files from you local computer</p>
        </div>
      ),
      img: "/sendfilespec.png",
      imgAlt: "",
    },
    {
      id: 4,
      icon: <FiMessageCircle />,
      heading: "Sent Message Actions",
      text: (
        <div>
          <p>Select - To select multiple messages</p>
          <p>Forward - To forward current message to your connections</p>
          <p>Delete - To delete message for you only</p>
          <p>Delete for all - To delete message for all the members </p>
        </div>
      ),
      img: "/usermenu.png",
      imgAlt: "",
    },
    {
      id: 5,
      icon: <FiMessageCircle />,
      heading: "Received Message Actions",
      text: (
        <div>
          <p>Select - To select multiple messages</p>
          <p>Forward - To forward current message to your connections</p>
          <p>Delete - To delete message for you only</p>
        </div>
      ),
      img: "/tousermenu.png",
      imgAlt: "",
    },
    {
      id: 6,
      icon: <FiMessageCircle />,
      heading: "Selected Message Actions",
      text: (
        <div>
          <p>Cancel - To halt the selections</p>
          <p>Delete - To delete message for you only</p>
          <p>Forward - To forward current message to you connections</p>
        </div>
      ),
      img: "/navmenuspec.png",
      imgAlt: "",
    },
    {
      id: 7,
      icon: <FiMessageCircle />,
      heading: "Users Profile",
      text: (
        <div>
          <p>Chat Profile contains users Name, Photo and Description</p>
          <p>Click to view</p>
        </div>
      ),
      img: "/touserprofilespec.png",
      imgAlt: "",
    },
    {
      id: 8,
      icon: <FiMessageCircle />,
      heading: "Storage File Actions",
      text: (
        <div>
          <p>Select - To select multiple files</p>
          <p>Send - To send file to your connections</p>
          <p>Delete - To delete file</p>
          <p>Rename - to rename file</p>
        </div>
      ),
      img: "/storagefilemenu.png",
      imgAlt: "",
    },
    {
      id: 9,
      icon: <FiMessageCircle />,
      heading: "Storage Selected File Actions",
      text: (
        <div>
          <p>Cancel - To halt the selection</p>
          <p>Send - To send file to your connections</p>
          <p>Delete - To delete file</p>
        </div>
      ),
      img: "/multifilemenuspec.png",
      imgAlt: "",
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
          <div>
            <h1 className="gradient-text">eChat (Chat and Storage)</h1>

            <p className="subtitle1">
              (Email-Based Application — Like WhatsApp is Phone Number-Based)
            </p>
          </div>
          <p className="subtitle">
            A full-stack chat and file storage application built using Next.js
            and Express.
            <br />
            <br /> It combines the power of messaging and file management into
            one seamless tool.
          </p>
          <button className="get-started-btn">Get Started</button>
        </div>
        <div className="icon-area">
          <AiFillMessage className="banner-icon" />
        </div>
      </div>

      <div className="introduction">
        <h1 className="section-heading">Application Interface</h1>
        <p className="section-subtitle">
          Everything you need to know to use the application
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
            <p>
              place for the communication with your teammates, colleagues etc
            </p>
            <div className="iconContainer">
              <FaXTwitter />
              <FaFacebookF />
              <FaInstagram />
              <FiGithub />
            </div>
          </div>
          <div className="rightPart">
            <ul>
              <li>
                <a href="">Features</a>
              </li>
              <li>
                <a href="">Pricing</a>
              </li>
              <li>
                <a href="">Integrations</a>
              </li>
              <li>
                <a href="">Roadmap</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
