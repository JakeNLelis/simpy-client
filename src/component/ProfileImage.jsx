import React from "react";

function ProfileImage({ image, className }) {
  return (
    <div className={`profileImage ${className}`}>
      <img src={image} alt="" />
    </div>
  );
}

export default ProfileImage;
