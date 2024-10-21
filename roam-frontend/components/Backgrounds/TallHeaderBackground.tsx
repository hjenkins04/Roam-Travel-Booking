import React from "react";
import Image from "next/image";

const TallHeaderBackground: React.FC = () => (
  <div style={{ position: "relative", width: "100%", height: "300px", overflow: "hidden", }} data-testid="tall-header-background">
    <Image
      src="/images/tall-header-background.png"
      alt="Tall Header Background"
      fill
      style={{ position: "absolute", objectFit: "cover",  bottom: 0}}
      priority={true}
    />
  </div>
);

export default TallHeaderBackground;
