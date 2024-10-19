import React from "react";

const AirlinePhoto: React.FC = () => (
  <div
    style={{
      position: "relative",
      width: "40px",
      height: "40px",
      overflow: "hidden",
    }}
  >
    <img
      src="images/AirlinePhoto.png"
      alt="Airline photo"
      style={{
        position: "relative",
        bottom: "0",
        width: "100%",
        height: "auto",
        minHeight: "100%",
        objectFit: "cover",
      }}
    />
  </div>
);

export default AirlinePhoto;
