import React from "react";
import "../css/header.css";
import logo from "../img/logo.png";

const Header = () => {
  return (
    <header>
      <div className="header-wrapper">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="btn-wrapper">
          <button className="users-btn">Users</button>
          <button className="sign-up-btn">Sign up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
