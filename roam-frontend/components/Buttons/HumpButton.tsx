interface HumpButtonProps {
  color: string;
  width?: number;
  height?: number;
}

const HumpButton: React.FC<HumpButtonProps> = ({ color, width = 270, height = 57 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 270 57"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
  >
    <path d="M34.3074 32.0521C25.3575 49.3456 8.94923 55.9336 -0.000732422 56.7571H269.99C256.266 56.7571 239.411 47.699 232.698 32.0521C225.986 16.4051 214.798 0.759033 194.661 0.759033H72.1072C60.9198 0.759033 45.5616 10.3062 34.3074 32.0521Z"/>
  </svg>
);

export default HumpButton;
