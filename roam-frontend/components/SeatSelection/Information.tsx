import React from "react";

const Information: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
    <svg>
      <g>
        <g id="18 / information">
          {/* Circle for information icon */}
          <circle cx={cx} cy={cy} r={r} stroke="#FF9500" strokeWidth="1.5" />
    
          {/* Path inside the circle */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={`M${cx} ${cy - 2.333}C${cx + 0.46} ${cy - 2.333} ${cx + 0.83} ${cy - 2.706} ${cx + 0.83} ${cy - 3.167}C${cx + 0.83} ${cy - 3.627} ${cx + 0.46} ${cy - 4} ${cx} ${cy - 4}C${cx - 0.46} ${cy - 4} ${cx - 0.83} ${cy - 3.627} ${cx - 0.83} ${cy - 3.167}C${cx - 0.83} ${cy - 2.706} ${cx - 0.46} ${cy - 2.333} ${cx} ${cy - 2.333}ZM${cx + 0.75} ${cy}C${cx + 0.75} ${cy - 0.414} ${cx + 0.41} ${cy - 0.75} ${cx} ${cy - 0.75}C${cx - 0.41} ${cy - 0.75} ${cx - 0.75} ${cy - 0.414} ${cx - 0.75} ${cy}V${cy + 2.333}C${cx - 0.75} ${cy + 2.748} ${cx - 0.41} ${cy + 3.083} ${cx} ${cy + 3.083}C${cx + 0.41} ${cy + 3.083} ${cx + 0.75} ${cy + 2.748} ${cx + 0.75} ${cy + 2.333}V${cy}Z`}
            fill="#FF9500"
          />
        </g>
    
        {/* Exit row text below the circle */}
        <g>
          <text x={cx + r + 10} y={cy - r + 10} fill="#FF9500" fontSize="12" fontFamily="Arial">
            Exit row
          </text>
        </g>
      </g>
    </svg>
  );

export default Information;