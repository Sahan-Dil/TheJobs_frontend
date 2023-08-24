import React, { useState, useEffect } from "react";

const RandomImage = ({ images, interval }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [images, interval]);

  const imgStyles = {
    display: "block",
    width: "100%",
    height: "auto",
  };

  return <img src={images[currentImageIndex]} alt="Random" style={imgStyles} />;
};
export default RandomImage;
