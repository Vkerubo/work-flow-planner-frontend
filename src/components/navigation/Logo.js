import React from "react";
import LogoImage from "./LogoImage.png";

export const Logo = () => {
  return (
    <div>
      {/* Logo container */}
      <span className="logo">
        {/* Image */}
        <img src={LogoImage} alt="Logo image" />
      </span>
    </div>
  );
};
