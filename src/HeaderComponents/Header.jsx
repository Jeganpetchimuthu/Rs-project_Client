import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import "../StyleComponents/Header.css";
function Header() {
  return (
    <div className="HeaderComponents">
      <h1 className="rsComponents">RS-TECH</h1>
      <div className="line">. </div>
      <FontAwesomeIcon icon={faCog} size="lg" className="settingsIcon" />
      <FontAwesomeIcon icon={faBell} size="lg" className="notificationIcon" />
      <img
        className="headerImageWrap"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBGR8P-J9WQlXFSrKgoVrUbTJN4PFawbIPzQ&s"
      />
    </div>
  );
}

export default Header;
