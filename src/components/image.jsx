import React from "react";
import useProgressiveImg from "../hooks/useProgressiveImg";
import lowResImage from "../img/main-placeholder.webp";
import normalImage from "../img/main.webp";

const Image = () => {
  const [src, { blur }] = useProgressiveImg(lowResImage, normalImage);
  return (
    <img
      alt="main"
      src={src}
      style={{
        filter: blur ? "blur(2px)" : "none",
        transition: blur ? "none" : "filter 0.7s ease-out",
      }}
    />
  );
};

export default Image;
