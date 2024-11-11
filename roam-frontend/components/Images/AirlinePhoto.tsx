import React from "react";
import Image from "next/image";

interface AirlinePhotoProps {
  imagePath?: string;
  testid?: string;
}

const AirlinePhoto: React.FC<AirlinePhotoProps> = ({
  imagePath = "/images/default.png",
  testid,
}) => (
  <div
    style={{
      position: "relative",
      width: "40px",
      height: "40px",
      overflow: "hidden",
    }}
  >
    <Image
      src={imagePath}
      alt="Airline photo"
      fill
      style={{ position: "absolute", objectFit: "cover" }}
      data-testid={testid}
    />
  </div>
);

export default AirlinePhoto;
