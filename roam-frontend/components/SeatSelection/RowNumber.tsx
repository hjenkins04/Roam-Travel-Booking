import React from "react";
const RowNumber: React.FC<{ x: number; y: number; rowText: string }> = ({ x, y, rowText }) => (
    <svg>
      <g id="row-number" transform={`translate(${x}, ${y})`}>
        <text fill="#7C8DB0" fontSize="12" fontFamily="Arial" textAnchor="middle" alignmentBaseline="middle">
          {rowText}
        </text>
      </g>
    </svg>
  );

export default RowNumber;