import React from "react";
import Image from "next/image";

const LandingPageBackground: React.FC = () => (
  <div style={{ position: 'relative', width: '100%', height: '761px', overflow: 'hidden' }}>
    <Image
      src="/images/landing-page-background.png"
      alt="Landing Page Background"
      layout="fill"
      objectFit="cover"
      priority={true}
    />
  </div>
);

export default LandingPageBackground;
