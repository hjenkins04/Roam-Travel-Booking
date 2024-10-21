import React from "react";
import Image from "next/image";

const HeaderBackground: React.FC = () => (
  <div style={{ position: "relative", width: "100%", height: "150px", overflow: "hidden" }} data-testid="header-background">
    <Image
      src="/images/header-background.png"
      alt="Header Background"
      fill
      style={{ position: "absolute", objectFit: "cover",  bottom: 0}}
      priority={true}
    />
  </div>
);

export default HeaderBackground;
