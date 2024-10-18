// RowNumber component
const RowNumber: React.FC<{ x: number; y: number; rowText: string }> = ({ x, y, rowText }) => (
    <g id="row-number" transform={`translate(${x}, ${y})`}>
      <text fill="#7C8DB0" fontSize="12" fontFamily="Arial" textAnchor="middle" alignmentBaseline="middle">
        {rowText}
      </text>
    </g>
  );

export default RowNumber;