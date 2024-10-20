import React from "react";
import Image from "next/image";

interface HeaderBackgroundProps {
  backgroundImage?: boolean;
  headerSize?: string;
}

const HeaderBackground: React.FC<HeaderBackgroundProps> = ({
  backgroundImage,
  headerSize,
  ...props
}) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "150px",
      overflow: "hidden",
      background: backgroundImage
        ? 'url("images/header-background.png")'
        : "none",
    }}
    {...props}
  >
    <Image
      src="images/header-background.png"
      alt="Header Background"
      style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "auto",
        minHeight: "100%",
        objectFit: "cover",
      }}
    />
  </div>
);

export default HeaderBackground;
