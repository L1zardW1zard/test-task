import React from "react";
import "../css/header.css";

const Header = () => {
  return (
    <header>
      <div className="header-wrapper">
        <div className="logo">
          <img src="image.svg" alt="Logo" />
          <p>TESTTASK</p>
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
