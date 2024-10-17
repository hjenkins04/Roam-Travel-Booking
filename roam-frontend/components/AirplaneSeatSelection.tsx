import React, { useState } from "react";

// Define seat types
type SeatState = "available" | "taken" | "selected";

// Interface for seat properties
interface SeatProps {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  seatState: SeatState;
  onSeatClick: (id: number) => void;
}

// Seat component
const Seat: React.FC<SeatProps> = ({ id, x, y, width, height, rx, seatState, onSeatClick }) => {
  const fillColor =
    seatState === "available"
      ? "#E15454" // available (red)
      : seatState === "taken"
      ? "#FFDAD9" // taken (light pink)
      : "#2E9881"; // selected (green)

  return (
    <g id={`seat_${id}`} onClick={() => onSeatClick(id)}>
      <rect x={x} y={y} width={width} height={height} rx={rx} fill={fillColor} />
      {seatState === "selected" && (
        <g id="checkmark">
          <path
            d="M1130.73 832.757L1134.48 836.515L1142 829"
            stroke="#F6F6FE"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      )}
    </g>
  );
};

// RowNumber component
const RowNumber: React.FC<{ x: number; y: number; d: string }> = ({ x, y, d }) => (
  <g id="row number" transform={`translate(${x}, ${y})`}>
    <path d={d} fill="#7C8DB0" />
  </g>
);

// Information component
const Information: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <g id="18 / information">
    <circle cx={cx} cy={cy} r={r} stroke="#FF9500" strokeWidth="1.5" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1126 957.667C1126.46 957.667 1126.83 957.294 1126.83 956.833C1126.83 956.373 1126.46 956 1126 956C1125.54 956 1125.17 956.373 1125.17 956.833C1125.17 957.294 1125.54 957.667 1126 957.667ZM1126.75 959C1126.75 958.586 1126.41 958.25 1126 958.25C1125.59 958.25 1125.25 958.586 1125.25 959V961.333C1125.25 961.748 1125.59 962.083 1126 962.083C1126.41 962.083 1126.75 961.748 1126.75 961.333V959Z"
      fill="#FF9500"
    />
  </g>
);

// PlaneSeats component with plane outline
const PlaneSeats: React.FC = () => {
  const [seatStates, setSeatStates] = useState<{ [id: number]: SeatState }>({
    1: "available",
    2: "available",
    3: "taken",
    4: "available",
    5: "taken",
    6: "available",
    7: "available",
    8: "taken",
    9: "available",
    10: "taken",
  });

  const toggleSeatState = (id: number) => {
    setSeatStates((prevState) => {
      const currentState = prevState[id];
      const newState: SeatState =
        currentState === "available"
          ? "selected"
          : currentState === "selected"
          ? "available"
          : "taken";
      return { ...prevState, [id]: newState };
    });
  };

  return (
    <svg width="2426" height="2965" viewBox="0 0 2426 2965" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plane outline */}
      <g id="Plane (seat selection)">
        <path
          id="Rectangle 9"
          d="M1181.84 2666.02L762.645 2779.88C759.951 2766.37 759.639 2755.88 760.346 2748.26C761.054 2740.62 762.78 2735.89 764.12 2733.86L1135.08 2487.92L1135.38 2487.72L1135.28 2487.37L1119.31 2426.77C1118.76 2424.68 1118.26 2422.66 1117.79 2420.56C1112.88 2398.45 1083.5 2262.57 1083.5 2171.5V1667.5V1667H1083H904.87C894.874 1667 885.088 1668.44 875.531 1671.38C647.042 1741.53 217.903 1873.65 157.849 1893.57C155.116 1894.48 152.392 1892.59 152.142 1889.68C146.5 1824.11 179.424 1785.66 197.053 1774.43C197.057 1774.43 197.062 1774.42 197.066 1774.42L979.613 1347.83L979.638 1347.82L979.66 1347.8L1039.21 1306.25C1047.18 1300.69 1054.3 1294.01 1060.35 1286.4L1084.1 1256.54C1085.58 1254.69 1086.38 1252.38 1086.38 1250.01V1184V632.025C1086.38 620.724 1087.34 609.457 1089.3 598.329C1096.03 560.253 1113.17 465.485 1128.49 400.114C1138.74 356.36 1151.61 302.634 1166.1 259.848C1173.35 238.452 1180.99 219.82 1188.9 206.545C1192.85 199.907 1196.86 194.632 1200.9 191.022C1204.94 187.412 1208.98 185.5 1213 185.5C1217.02 185.5 1221.08 187.427 1225.16 191.064C1229.24 194.7 1233.3 200.01 1237.31 206.687C1245.34 220.04 1253.12 238.766 1260.46 260.224C1275.14 303.133 1288.01 356.86 1297.51 400.107C1311.81 465.194 1329.31 558.914 1336.41 597.488C1338.56 609.187 1339.62 621.029 1339.62 632.926V1184V1250.01C1339.62 1252.38 1340.42 1254.69 1341.9 1256.54L1365.65 1286.4C1371.7 1294.01 1378.82 1300.69 1386.79 1306.25L1446.34 1347.8L1446.36 1347.82L1446.39 1347.83L2228.93 1774.42C2228.94 1774.42 2228.94 1774.43 2228.95 1774.43C2246.58 1785.66 2279.5 1824.11 2273.86 1889.68C2273.61 1892.59 2270.88 1894.48 2268.15 1893.57C2208.1 1873.65 1778.96 1741.53 1550.47 1671.38C1540.91 1668.44 1531.13 1667 1521.13 1667H1343H1342.5V1667.5V2171.5C1342.5 2262.57 1313.12 2398.45 1308.21 2420.56C1307.74 2422.66 1307.24 2424.68 1306.69 2426.77L1290.72 2487.37L1290.62 2487.72L1290.92 2487.92L1660.4 2733.86C1661.74 2735.89 1663.47 2740.62 1664.18 2748.26C1664.88 2755.88 1664.57 2766.37 1661.88 2779.88L1244.16 2666.02L1243.67 2665.89L1243.54 2666.37L1240.02 2679.74L1240.02 2679.75L1240.02 2679.75L1240.01 2679.77L1239.99 2679.84C1239.97 2679.91 1239.94 2680.01 1239.91 2680.14C1239.83 2680.4 1239.72 2680.79 1239.57 2681.28C1239.27 2682.26 1238.82 2683.67 1238.22 2685.35C1237.04 2688.73 1235.27 2693.22 1232.95 2697.71C1230.64 2702.2 1227.78 2706.67 1224.42 2710C1221.07 2713.34 1217.25 2715.5 1213 2715.5C1208.75 2715.5 1204.93 2713.34 1201.58 2710C1198.22 2706.67 1195.36 2702.2 1193.05 2697.71C1190.73 2693.22 1188.96 2688.73 1187.78 2685.35C1187.18 2683.67 1186.73 2682.26 1186.43 2681.28C1186.28 2680.79 1186.17 2680.4 1186.09 2680.14C1186.06 2680.01 1186.03 2679.91 1186.01 2679.84L1185.99 2679.77L1185.98 2679.75L1185.98 2679.75L1185.98 2679.75L1182.46 2666.37L1182.33 2665.89L1181.84 2666.02Z"
          fill="url(#paint0_linear_2261_2619)"
          stroke="#FF9A2A"
        />
      </g>

      {/* Business class seats */}
      <g id="business">
        <rect x="1113" y="617" width="200" height="312" rx="8" fill="white" />
        <Seat id={1} x={1121} y={633} width={30} height={40} rx={4} seatState={seatStates[1]} onSeatClick={toggleSeatState} />
        <Seat id={2} x={1159.5} y={633} width={30} height={40} rx={4} seatState={seatStates[2]} onSeatClick={toggleSeatState} />
        <RowNumber x={1210} y={649} d="M1210.54 658V657.02H1212.79V649.124H1213.39L1211.01 650.636L1210.52 649.782L1213.11 648.13H1213.94V657.02H1216.05V658H1210.54Z" />
        <Seat id={3} x={1236.5} y={633} width={30} height={40} rx={4} seatState={seatStates[3]} onSeatClick={toggleSeatState} />
        <Seat id={4} x={1275} y={633} width={30} height={40} rx={4} seatState={seatStates[4]} onSeatClick={toggleSeatState} />


        <Seat id={5} x={1121} y={693} width={30} height={40} rx={4} seatState={seatStates[5]} onSeatClick={toggleSeatState} />
        <Seat id={6} x={1159.5} y={693} width={30} height={40} rx={4} seatState={seatStates[6]} onSeatClick={toggleSeatState} />

        <Seat id={7} x={1236.5} y={693} width={30} height={40} rx={4} seatState={seatStates[7]} onSeatClick={toggleSeatState} />
        <Seat id={8} x={1275} y={693} width={30} height={40} rx={4} seatState={seatStates[8]} onSeatClick={toggleSeatState} />

        <Seat id={9} x={1121} y={753} width={30} height={40} rx={4} seatState={seatStates[9]} onSeatClick={toggleSeatState} />
        <Seat id={10} x={1159.5} y={753} width={30} height={40} rx={4} seatState={seatStates[10]} onSeatClick={toggleSeatState} />
      </g>

      {/* Row numbers */}
      <RowNumber x={1210} y={649} d="M1210.54 658V657.02H1212.79V649.124H1213.39L1211.01 650.636L1210.52 649.782L1213.11 648.13H1213.94V657.02H1216.05V658H1210.54Z" />

      {/* Information components */}
      <Information cx={1126} cy={959} r={6} />

      <defs>
        <linearGradient id="paint0_linear_2261_2619" x1="151" y1="1312" x2="2275" y2="1312" gradientUnits="userSpaceOnUse">
          <stop offset="0.28" stopColor="#FF8600" />
          <stop offset="0.489583" stopColor="#FFAB4D" />
          <stop offset="0.72" stopColor="#FFDAB1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Example use case with a button
const App: React.FC = () => {
  return (
    <div>
      <h1>Airline Seat Selection</h1>
      <PlaneSeats />
    </div>
  );
};

export default App;
