import React from "react";

const User = ({ userName, phone, position, email, photo }) => {
  return (
    <div className="user">
      <img src={photo} alt="User avatar" />
      <div className="user-info">
        <p className="user-name">{userName}</p>
      </div>
      <div className="user-info">
        <p>{position}</p>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </div>
  );
};
export default User;
