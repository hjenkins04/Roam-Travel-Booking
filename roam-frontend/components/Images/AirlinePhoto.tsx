import React from "react";
import Image from "next/image";

interface AirlinePhotoProps {
  imagePath?: string;
}

const AirlinePhoto: React.FC<AirlinePhotoProps> = ({ imagePath = "/images/default.png" }) => (
  <div style={{ position: "relative", width: "40px", height: "40px", overflow: "hidden" }}>
    <Image
      src={imagePath}
      alt="Airline photo"
      fill
      style={{ position: "absolute", objectFit: "cover" }}
    />
  </div>
);

export default AirlinePhoto;
