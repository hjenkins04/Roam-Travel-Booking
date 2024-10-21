import React from "react";
import Image from "next/image";

const LandingPageBackground: React.FC = () => (
  <div style={{ position: 'relative', width: '100%', height: '761px', overflow: 'hidden' }} data-testid="landing-page-background">
    <Image
      src="/images/landing-page-background.png"
      alt="Landing Page Background"
      fill
      style={{ position: "absolute", objectFit: "cover",  bottom: 0}}
      priority={true}
    />
  </div>
);

export default LandingPageBackground;
