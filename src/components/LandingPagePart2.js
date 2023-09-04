import React from "react";
import img11 from "../img/img11.jpg";

const LandingPagePart2 = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  };

  const textContainerStyle = {
    flex: 1,
    padding: "20px",
  };

  const imageContainerStyle = {
    flex: 1,
    textAlign: "center",
  };

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
  };

  const interactiveTextStyle = {
    fontSize: "1.2em",
    color: "blue",
    cursor: "pointer",
  };

  const handleTextClick = () => {
    // Add your interactive logic here
    alert("You clicked the interactive text!"); // Example: Show an alert
  };

  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <h2>We Help You Find a Job Abroad</h2>
        <p>
          Our dedicated team of experienced consultants is here to guide you
          towards a successful career abroad.
        </p>
        <p>
          Whether you're looking for job opportunities, career advice, or
          assistance with the application process, we've got you covered. Feel
          free to ask anything to make your career dreams a reality.
        </p>
        <p>
          With our expertise and your determination, your journey to a job
          abroad starts here.
        </p>
      </div>
      <div style={imageContainerStyle}>
        <img src={img11} alt="Consultants" style={imageStyle} />
      </div>
    </div>
  );
};

export default LandingPagePart2;
