import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const countries = ["UK", "Canada", "England", "Australia", "Japan"];

const LandingPagePart3 = () => {
  const [showCountries, setShowCountries] = useState(false);

  useEffect(() => {
    // Delay the appearance of countries for a beautiful effect
    const timer = setTimeout(() => {
      setShowCountries(true);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  const tileProps = useSpring({
    opacity: showCountries ? 1 : 0,
    transform: showCountries ? "translateY(0)" : "translateY(20px)",
    config: { duration: 500 }, // Faster animation duration
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {countries.map((country, index) => (
          <animated.div
            key={index}
            style={{
              ...tileProps,
              width: "150px",
              height: "100px",
              margin: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5em",
              fontWeight: "bold",
              borderRadius: "10px",
              cursor: "pointer",
              background: "linear-gradient(135deg, #2196F3, #00BCD4)", // Cool blue gradient
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #00BCD4, #2196F3)"; // Reverse gradient on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #2196F3, #00BCD4)"; // Restore original gradient
            }}
          >
            {country}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default LandingPagePart3;
