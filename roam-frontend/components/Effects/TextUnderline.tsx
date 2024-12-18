import React from 'react';

interface TextUnderlineProps {
  width?: number;
  height?: number;
  className?: string;
}

const TextUnderline: React.FC<TextUnderlineProps> = ({ width = 330, height = 34, className }) => (
  <svg
    data-testid="text-underline"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 330 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.01562 24.5954C76.3902 9.92164 146.254 6.07175 173.872 6.07178C202.856 6.07181 174.026 18.5611 163.155 22.8929C160.638 23.8956 158.033 24.7363 155.417 25.4389C124.327 33.7884 208.421 6.63048 324.004 21.5997"
      stroke="#FF9A2A"
      strokeWidth="11.9995"
      strokeLinecap="round"
    />
  </svg>
);

export default TextUnderline;
