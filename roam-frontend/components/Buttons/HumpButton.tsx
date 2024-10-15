"use client"; // Ensuring the component is client-side

import React, { useState } from 'react';

interface HumpButton2Props {
  primaryColor: string;
  secondaryColor: string;
  primaryText: string;
  secondaryText: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
  width?: number;
  height?: number;
}

const HumpButton2: React.FC<HumpButton2Props> = ({
  primaryColor,
  secondaryColor,
  primaryText,
  secondaryText,
  onPrimaryClick,
  onSecondaryClick,
  width = 540,
  height = 58,
}) => {
  const [isPrimaryActive, setIsPrimaryActive] = useState(true);

  const handlePrimaryClick = () => {
    setIsPrimaryActive(true);
    onPrimaryClick();
  };

  const handleSecondaryClick = () => {
    setIsPrimaryActive(false);
    onSecondaryClick();
  };

  return (
    <div style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}>
      <svg width={width} height={height} viewBox="0 0 540 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rectangle in the Background */}
        <rect
          x="134.99"
          y="1.49902"
          width="270"
          height="56"
          fill={ primaryColor }
        />

        {/* Left Button Path (Primary) */}
        <g clipPath="url(#clip0_20_24218)">
          <path
            d="M34.3072 32.293C25.3572 49.5865 8.94898 56.1745 -0.000976562 56.998H269.99C256.266 56.998 239.41 47.9399 232.698 32.293C225.986 16.6461 214.798 1 194.661 1H72.107C60.9195 1 45.5614 10.5472 34.3072 32.293Z"
            fill={isPrimaryActive ? secondaryColor : primaryColor}
            style={{ cursor: 'pointer' }}
            onClick={handlePrimaryClick}
          />
        </g>

        {/* Right Button Path (Secondary) */}
        <path
          d="M304.317 32.5949C295.367 50.1978 278.959 56.9037 270.009 57.7419H540C526.276 57.7419 509.421 48.5218 502.708 32.5949C495.996 16.668 484.808 0.741943 464.671 0.741943H342.117C330.93 0.741943 315.572 10.46 304.317 32.5949Z"
          fill={!isPrimaryActive ? secondaryColor : primaryColor}
          style={{ cursor: 'pointer' }}
          onClick={handleSecondaryClick}
        />

        <defs>
          <clipPath id="clip0_20_24218">
            <rect width="270" height="57" fill="white" transform="translate(0 1)" />
          </clipPath>
        </defs>
      </svg>

      {/* Text for Left Button */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={isPrimaryActive}
        onClick={handlePrimaryClick}
        onKeyDown={(e) => e.key === 'Enter' && handlePrimaryClick()}
        style={{
          position: 'absolute',
          top: '50%',
          left: isPrimaryActive ? '23%' : '33%',
          transform: 'translate(-50%, -50%)',
          color: isPrimaryActive ? primaryColor : 'white',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        {primaryText}
      </div>

      {/* Text for Right Button */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={!isPrimaryActive}
        onClick={handleSecondaryClick}
        onKeyDown={(e) => e.key === 'Enter' && handleSecondaryClick()}
        style={{
          position: 'absolute',
          top: '50%',
          right: isPrimaryActive ? '33%' : '23%',
          transform: 'translate(50%, -50%)',
          color: !isPrimaryActive ? primaryColor : 'white',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        {secondaryText}
      </div>
    </div>
  );
};

export default HumpButton2;
