import React from "react";
import Image from "next/image";

const AirlinePhoto: React.FC = () => (
  <div style={{ position: "relative", width: "40px", height: "40px", overflow: "hidden" }} >
    <Image
      src="/images/AirlinePhoto.png"
      alt="Airline photo"
      fill
      style={{ position: "absolute", objectFit: "cover"}}
    />
  </div>
);

export default AirlinePhoto;
