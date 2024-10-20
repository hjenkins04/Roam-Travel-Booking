import React, { useState, useEffect } from "react";
import Seat, {SeatState } from "@/components/SeatSelection/Seat"
import RowNumber from "@/components/SeatSelection/RowNumber"
import Information from "@/components/SeatSelection/Information"
import Draggable from "react-draggable";

// Total number of seats on the plane
const TOTAL_SEATS = 188;

const Airplane = ({ onSeatClick }: { onSeatClick: (seatNumber: number) => void }) => {
    // Initialize all seat states to "loading" immediately
    const initialSeatStates = Array.from({ length: TOTAL_SEATS }, (_, i) => ({
        [i + 1]: "loading" as SeatState,
    })).reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const [seatStates, setSeatStates] = useState<{ [id: number]: SeatState }>(initialSeatStates);
    const [areSeatsInitialized, setAreSeatsInitialized] = useState(false);

    // Generate random seats as booked or available
    const generateSeatStates = () => {
        const seatStates: { [id: number]: SeatState } = {};

        const bookedPercentage = Math.floor(Math.random() * 60) + 20; // Random between 20% and 80%
        const totalBookedSeats = Math.floor((bookedPercentage / 100) * TOTAL_SEATS);
        const seatNumbers = Array.from({ length: TOTAL_SEATS }, (_, i) => i + 1);

        const bookedSeats = new Set<number>();
        while (bookedSeats.size < totalBookedSeats) {
            const randomSeat = Math.floor(Math.random() * TOTAL_SEATS) + 1;
            bookedSeats.add(randomSeat);
        }

        seatNumbers.forEach((seatNumber) => {
            seatStates[seatNumber] = bookedSeats.has(seatNumber) ? "taken" : "available";
        });

        return seatStates;
    };
    
    useEffect(() => {

      setSeatStates(generateSeatStates());
      setAreSeatsInitialized(true);
    }, []);


    const toggleSeatState = (id: number) => {
        setSeatStates((prevState) => {
            const newSeatStates: { [id: number]: SeatState } = {};

            Object.keys(prevState).forEach((seatId) => {
                const seatIdNumber = Number(seatId);
                if (seatIdNumber === id && prevState[seatIdNumber] === "available") {
                    newSeatStates[seatIdNumber] = "selected";
                    onSeatClick(id);
                } else if (prevState[seatIdNumber] === "selected") {
                    newSeatStates[seatIdNumber] = "available";
                    onSeatClick(id);
                } else {
                    newSeatStates[seatIdNumber] = prevState[seatIdNumber];
                }
            });

            return newSeatStates;
        });
    };



  return (
    <Draggable defaultPosition={{ x: -960, y: -800 }} axis="y">
      <svg width="2426" height="2965" viewBox="0 0 2426 2965" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Plane outline */}
        <g id="Plane (seat selection)" data-testid={"plane-outline"}>
          <path
            id="Rectangle 9"
            d="M1181.84 2666.02L762.645 2779.88C759.951 2766.37 759.639 2755.88 760.346 2748.26C761.054 2740.62 762.78 2735.89 764.12 2733.86L1135.08 2487.92L1135.38 2487.72L1135.28 2487.37L1119.31 2426.77C1118.76 2424.68 1118.26 2422.66 1117.79 2420.56C1112.88 2398.45 1083.5 2262.57 1083.5 2171.5V1667.5V1667H1083H904.87C894.874 1667 885.088 1668.44 875.531 1671.38C647.042 1741.53 217.903 1873.65 157.849 1893.57C155.116 1894.48 152.392 1892.59 152.142 1889.68C146.5 1824.11 179.424 1785.66 197.053 1774.43C197.057 1774.43 197.062 1774.42 197.066 1774.42L979.613 1347.83L979.638 1347.82L979.66 1347.8L1039.21 1306.25C1047.18 1300.69 1054.3 1294.01 1060.35 1286.4L1084.1 1256.54C1085.58 1254.69 1086.38 1252.38 1086.38 1250.01V1184V632.025C1086.38 620.724 1087.34 609.457 1089.3 598.329C1096.03 560.253 1113.17 465.485 1128.49 400.114C1138.74 356.36 1151.61 302.634 1166.1 259.848C1173.35 238.452 1180.99 219.82 1188.9 206.545C1192.85 199.907 1196.86 194.632 1200.9 191.022C1204.94 187.412 1208.98 185.5 1213 185.5C1217.02 185.5 1221.08 187.427 1225.16 191.064C1229.24 194.7 1233.3 200.01 1237.31 206.687C1245.34 220.04 1253.12 238.766 1260.46 260.224C1275.14 303.133 1288.01 356.86 1297.51 400.107C1311.81 465.194 1329.31 558.914 1336.41 597.488C1338.56 609.187 1339.62 621.029 1339.62 632.926V1184V1250.01C1339.62 1252.38 1340.42 1254.69 1341.9 1256.54L1365.65 1286.4C1371.7 1294.01 1378.82 1300.69 1386.79 1306.25L1446.34 1347.8L1446.36 1347.82L1446.39 1347.83L2228.93 1774.42C2228.94 1774.42 2228.94 1774.43 2228.95 1774.43C2246.58 1785.66 2279.5 1824.11 2273.86 1889.68C2273.61 1892.59 2270.88 1894.48 2268.15 1893.57C2208.1 1873.65 1778.96 1741.53 1550.47 1671.38C1540.91 1668.44 1531.13 1667 1521.13 1667H1343H1342.5V1667.5V2171.5C1342.5 2262.57 1313.12 2398.45 1308.21 2420.56C1307.74 2422.66 1307.24 2424.68 1306.69 2426.77L1290.72 2487.37L1290.62 2487.72L1290.92 2487.92L1660.4 2733.86C1661.74 2735.89 1663.47 2740.62 1664.18 2748.26C1664.88 2755.88 1664.57 2766.37 1661.88 2779.88L1244.16 2666.02L1243.67 2665.89L1243.54 2666.37L1240.02 2679.74L1240.02 2679.75L1240.02 2679.75L1240.01 2679.77L1239.99 2679.84C1239.97 2679.91 1239.94 2680.01 1239.91 2680.14C1239.83 2680.4 1239.72 2680.79 1239.57 2681.28C1239.27 2682.26 1238.82 2683.67 1238.22 2685.35C1237.04 2688.73 1235.27 2693.22 1232.95 2697.71C1230.64 2702.2 1227.78 2706.67 1224.42 2710C1221.07 2713.34 1217.25 2715.5 1213 2715.5C1208.75 2715.5 1204.93 2713.34 1201.58 2710C1198.22 2706.67 1195.36 2702.2 1193.05 2697.71C1190.73 2693.22 1188.96 2688.73 1187.78 2685.35C1187.18 2683.67 1186.73 2682.26 1186.43 2681.28C1186.28 2680.79 1186.17 2680.4 1186.09 2680.14C1186.06 2680.01 1186.03 2679.91 1186.01 2679.84L1185.99 2679.77L1185.98 2679.75L1185.98 2679.75L1185.98 2679.75L1182.46 2666.37L1182.33 2665.89L1181.84 2666.02Z"
            fill="url(#paint0_linear_2261_2619)"
            stroke="#FF9A2A"
          />
        </g>

        {/* Business class seats */}
        <g id="business" data-testid={"business-class"}>
          <rect x="1113" y="617" width="200" height="312" rx="8" fill="white" />
          <Seat id={1} x={1121} y={633} width={30} height={40} rx={4} seatState={seatStates[1]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={2} x={1159.5} y={633} width={30} height={40} rx={4} seatState={seatStates[2]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1210} y={649} rowText="1" />
          <Seat id={3} x={1236.5} y={633} width={30} height={40} rx={4} seatState={seatStates[3]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={4} x={1275} y={633} width={30} height={40} rx={4} seatState={seatStates[4]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />


          <Seat id={5} x={1121} y={693} width={30} height={40} rx={4} seatState={seatStates[5]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={6} x={1159.5} y={693} width={30} height={40} rx={4} seatState={seatStates[6]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1210} y={713} rowText="2" />
          <Seat id={7} x={1236.5} y={693} width={30} height={40} rx={4} seatState={seatStates[7]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={8} x={1275} y={693} width={30} height={40} rx={4} seatState={seatStates[8]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={9} x={1121} y={753} width={30} height={40} rx={4} seatState={seatStates[9]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={10} x={1159.5} y={753} width={30} height={40} rx={4} seatState={seatStates[10]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1210} y={778} rowText="3" />
          <Seat id={11} x={1236.5} y={753} width={30} height={40} rx={4} seatState={seatStates[11]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={12} x={1275.5} y={753} width={30} height={40} rx={4} seatState={seatStates[12]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={13} x={1121} y={813} width={30} height={40} rx={4} seatState={seatStates[13]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={14} x={1159.5} y={813} width={30} height={40} rx={4} seatState={seatStates[14]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1210} y={835} rowText="4" />
          <Seat id={15} x={1236.5} y={813} width={30} height={40} rx={4} seatState={seatStates[15]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={16} x={1275.5} y={813} width={30} height={40} rx={4} seatState={seatStates[16]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={17} x={1121} y={873} width={30} height={40} rx={4} seatState={seatStates[17]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={18} x={1159.5} y={873} width={30} height={40} rx={4} seatState={seatStates[18]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1210} y={898} rowText="5" />
          <Seat id={19} x={1236.5} y={873} width={30} height={40} rx={4} seatState={seatStates[19]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={20} x={1275.5} y={873} width={30} height={40} rx={4} seatState={seatStates[20]} seatType="business" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
        </g>

        {/* Economy class seats */}
        <g id="economy" data-testid={"economy-class"}>
          <rect x="1113" y="942" width="200" height="1332" rx="8" fill="white"/>
          
          <Information cx={1126} cy={959} r={6} />

          <Seat id={21} x={1117} y={976} width={22} height={32} rx={4} seatState={seatStates[21]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={22} x={1144} y={976} width={22} height={32} rx={4} seatState={seatStates[22]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={23} x={1171} y={976} width={22} height={32} rx={4} seatState={seatStates[23]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={997} rowText="6" />
          <Seat id={24} x={1233} y={976} width={22} height={32} rx={4} seatState={seatStates[24]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={25} x={1260} y={976} width={22} height={32} rx={4} seatState={seatStates[25]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={26} x={1287} y={976} width={22} height={32} rx={4} seatState={seatStates[26]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={27} x={1117} y={1020} width={22} height={32} rx={4} seatState={seatStates[27]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={28} x={1144} y={1020} width={22} height={32} rx={4} seatState={seatStates[28]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={29} x={1171} y={1020} width={22} height={32} rx={4} seatState={seatStates[29]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1031} rowText="7" />
          <Seat id={30} x={1233} y={1020} width={22} height={32} rx={4} seatState={seatStates[30]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={31} x={1260} y={1020} width={22} height={32} rx={4} seatState={seatStates[31]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={32} x={1287} y={1020} width={22} height={32} rx={4} seatState={seatStates[32]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={33} x={1117} y={1064} width={22} height={32} rx={4} seatState={seatStates[33]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={34} x={1144} y={1064} width={22} height={32} rx={4} seatState={seatStates[34]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={35} x={1171} y={1064} width={22} height={32} rx={4} seatState={seatStates[35]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1085} rowText="8" />
          <Seat id={36} x={1233} y={1064} width={22} height={32} rx={4} seatState={seatStates[36]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={37} x={1260} y={1064} width={22} height={32} rx={4} seatState={seatStates[37]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={38} x={1287} y={1064} width={22} height={32} rx={4} seatState={seatStates[38]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={39} x={1117} y={1108} width={22} height={32} rx={4} seatState={seatStates[39]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={40} x={1144} y={1108} width={22} height={32} rx={4} seatState={seatStates[40]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={41} x={1171} y={1108} width={22} height={32} rx={4} seatState={seatStates[41]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1129} rowText="9" />
          <Seat id={42} x={1233} y={1108} width={22} height={32} rx={4} seatState={seatStates[42]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={43} x={1260} y={1108} width={22} height={32} rx={4} seatState={seatStates[43]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={44} x={1287} y={1108} width={22} height={32} rx={4} seatState={seatStates[44]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={45} x={1117} y={1152} width={22} height={32} rx={4} seatState={seatStates[45]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={46} x={1144} y={1152} width={22} height={32} rx={4} seatState={seatStates[46]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={47} x={1171} y={1152} width={22} height={32} rx={4} seatState={seatStates[47]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1173} rowText="10" />
          <Seat id={48} x={1233} y={1152} width={22} height={32} rx={4} seatState={seatStates[48]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={49} x={1260} y={1152} width={22} height={32} rx={4} seatState={seatStates[49]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={50} x={1287} y={1152} width={22} height={32} rx={4} seatState={seatStates[50]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={51} x={1117} y={1196} width={22} height={32} rx={4} seatState={seatStates[51]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={52} x={1144} y={1196} width={22} height={32} rx={4} seatState={seatStates[52]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={53} x={1171} y={1196} width={22} height={32} rx={4} seatState={seatStates[53]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1217} rowText="11" />
          <Seat id={54} x={1233} y={1196} width={22} height={32} rx={4} seatState={seatStates[54]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={55} x={1260} y={1196} width={22} height={32} rx={4} seatState={seatStates[55]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={56} x={1287} y={1196} width={22} height={32} rx={4} seatState={seatStates[56]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={57} x={1117} y={1240} width={22} height={32} rx={4} seatState={seatStates[57]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={58} x={1144} y={1240} width={22} height={32} rx={4} seatState={seatStates[58]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={59} x={1171} y={1240} width={22} height={32} rx={4} seatState={seatStates[59]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1261} rowText="12" />
          <Seat id={60} x={1233} y={1240} width={22} height={32} rx={4} seatState={seatStates[60]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={61} x={1260} y={1240} width={22} height={32} rx={4} seatState={seatStates[61]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={62} x={1287} y={1240} width={22} height={32} rx={4} seatState={seatStates[62]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          
          <Seat id={63} x={1117} y={1284} width={22} height={32} rx={4} seatState={seatStates[63]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={64} x={1144} y={1284} width={22} height={32} rx={4} seatState={seatStates[64]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={65} x={1171} y={1284} width={22} height={32} rx={4} seatState={seatStates[65]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1305} rowText="13" />
          <Seat id={66} x={1233} y={1284} width={22} height={32} rx={4} seatState={seatStates[66]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={67} x={1260} y={1284} width={22} height={32} rx={4} seatState={seatStates[67]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={68} x={1287} y={1284} width={22} height={32} rx={4} seatState={seatStates[68]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          
          <Information cx={1126} cy={1333} r={6} />

          <Seat id={69} x={1117} y={1350} width={22} height={32} rx={4} seatState={seatStates[69]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={70} x={1144} y={1350} width={22} height={32} rx={4} seatState={seatStates[70]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={71} x={1171} y={1350} width={22} height={32} rx={4} seatState={seatStates[71]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1371} rowText="14" />
          <Seat id={72} x={1233} y={1350} width={22} height={32} rx={4} seatState={seatStates[72]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={73} x={1260} y={1350} width={22} height={32} rx={4} seatState={seatStates[73]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={74} x={1287} y={1350} width={22} height={32} rx={4} seatState={seatStates[74]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          
          <Seat id={75} x={1117} y={1394} width={22} height={32} rx={4} seatState={seatStates[75]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={76} x={1144} y={1394} width={22} height={32} rx={4} seatState={seatStates[76]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={77} x={1171} y={1394} width={22} height={32} rx={4} seatState={seatStates[77]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1415} rowText="15" />
          <Seat id={78} x={1233} y={1394} width={22} height={32} rx={4} seatState={seatStates[78]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={79} x={1260} y={1394} width={22} height={32} rx={4} seatState={seatStates[79]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={80} x={1287} y={1394} width={22} height={32} rx={4} seatState={seatStates[80]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={81} x={1117} y={1438} width={22} height={32} rx={4} seatState={seatStates[81]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={82} x={1144} y={1438} width={22} height={32} rx={4} seatState={seatStates[82]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={83} x={1171} y={1438} width={22} height={32} rx={4} seatState={seatStates[83]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1459} rowText="16" />
          <Seat id={84} x={1233} y={1438} width={22} height={32} rx={4} seatState={seatStates[84]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={85} x={1260} y={1438} width={22} height={32} rx={4} seatState={seatStates[85]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={86} x={1287} y={1438} width={22} height={32} rx={4} seatState={seatStates[86]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          
          <Seat id={87} x={1117} y={1482} width={22} height={32} rx={4} seatState={seatStates[87]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={88} x={1144} y={1482} width={22} height={32} rx={4} seatState={seatStates[88]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={89} x={1171} y={1482} width={22} height={32} rx={4} seatState={seatStates[89]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1503} rowText="17" />
          <Seat id={90} x={1233} y={1482} width={22} height={32} rx={4} seatState={seatStates[90]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={91} x={1260} y={1482} width={22} height={32} rx={4} seatState={seatStates[91]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={92} x={1287} y={1482} width={22} height={32} rx={4} seatState={seatStates[92]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={93} x={1117} y={1526} width={22} height={32} rx={4} seatState={seatStates[93]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={94} x={1144} y={1526} width={22} height={32} rx={4} seatState={seatStates[94]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={95} x={1171} y={1526} width={22} height={32} rx={4} seatState={seatStates[95]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1547} rowText="18" />
          <Seat id={96} x={1233} y={1526} width={22} height={32} rx={4} seatState={seatStates[96]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={97} x={1260} y={1526} width={22} height={32} rx={4} seatState={seatStates[97]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={98} x={1287} y={1526} width={22} height={32} rx={4} seatState={seatStates[98]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Information cx={1126} cy={1575} r={6} />

          <Seat id={99} x={1117} y={1592} width={22} height={32} rx={4} seatState={seatStates[99]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={100} x={1144} y={1592} width={22} height={32} rx={4} seatState={seatStates[100]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={101} x={1171} y={1592} width={22} height={32} rx={4} seatState={seatStates[101]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1613} rowText="19" />
          <Seat id={102} x={1233} y={1592} width={22} height={32} rx={4} seatState={seatStates[102]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={103} x={1260} y={1592} width={22} height={32} rx={4} seatState={seatStates[103]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={104} x={1287} y={1592} width={22} height={32} rx={4} seatState={seatStates[104]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={105} x={1117} y={1636} width={22} height={32} rx={4} seatState={seatStates[105]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={106} x={1144} y={1636} width={22} height={32} rx={4} seatState={seatStates[106]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={107} x={1171} y={1636} width={22} height={32} rx={4} seatState={seatStates[107]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1657} rowText="20" />
          <Seat id={108} x={1233} y={1636} width={22} height={32} rx={4} seatState={seatStates[108]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={109} x={1260} y={1636} width={22} height={32} rx={4} seatState={seatStates[109]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={110} x={1287} y={1636} width={22} height={32} rx={4} seatState={seatStates[110]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={111} x={1117} y={1680} width={22} height={32} rx={4} seatState={seatStates[111]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={112} x={1144} y={1680} width={22} height={32} rx={4} seatState={seatStates[112]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={113} x={1171} y={1680} width={22} height={32} rx={4} seatState={seatStates[113]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1701} rowText="21" />
          <Seat id={114} x={1233} y={1680} width={22} height={32} rx={4} seatState={seatStates[114]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={115} x={1260} y={1680} width={22} height={32} rx={4} seatState={seatStates[115]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={116} x={1287} y={1680} width={22} height={32} rx={4} seatState={seatStates[116]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={117} x={1117} y={1724} width={22} height={32} rx={4} seatState={seatStates[117]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={118} x={1144} y={1724} width={22} height={32} rx={4} seatState={seatStates[118]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={119} x={1171} y={1724} width={22} height={32} rx={4} seatState={seatStates[119]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1745} rowText="22" />
          <Seat id={120} x={1233} y={1724} width={22} height={32} rx={4} seatState={seatStates[120]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={121} x={1260} y={1724} width={22} height={32} rx={4} seatState={seatStates[121]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={122} x={1287} y={1724} width={22} height={32} rx={4} seatState={seatStates[122]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={123} x={1117} y={1768} width={22} height={32} rx={4} seatState={seatStates[123]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={124} x={1144} y={1768} width={22} height={32} rx={4} seatState={seatStates[124]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={125} x={1171} y={1768} width={22} height={32} rx={4} seatState={seatStates[125]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1789} rowText="23" />
          <Seat id={126} x={1233} y={1768} width={22} height={32} rx={4} seatState={seatStates[126]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={127} x={1260} y={1768} width={22} height={32} rx={4} seatState={seatStates[127]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={128} x={1287} y={1768} width={22} height={32} rx={4} seatState={seatStates[128]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={129} x={1117} y={1812} width={22} height={32} rx={4} seatState={seatStates[129]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={130} x={1144} y={1812} width={22} height={32} rx={4} seatState={seatStates[130]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={131} x={1171} y={1812} width={22} height={32} rx={4} seatState={seatStates[131]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1833} rowText="24" />
          <Seat id={132} x={1233} y={1812} width={22} height={32} rx={4} seatState={seatStates[132]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={133} x={1260} y={1812} width={22} height={32} rx={4} seatState={seatStates[133]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={134} x={1287} y={1812} width={22} height={32} rx={4} seatState={seatStates[134]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={135} x={1117} y={1856} width={22} height={32} rx={4} seatState={seatStates[135]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={136} x={1144} y={1856} width={22} height={32} rx={4} seatState={seatStates[136]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={137} x={1171} y={1856} width={22} height={32} rx={4} seatState={seatStates[137]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1877} rowText="25" />
          <Seat id={138} x={1233} y={1856} width={22} height={32} rx={4} seatState={seatStates[138]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={139} x={1260} y={1856} width={22} height={32} rx={4} seatState={seatStates[139]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={140} x={1287} y={1856} width={22} height={32} rx={4} seatState={seatStates[140]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={141} x={1117} y={1900} width={22} height={32} rx={4} seatState={seatStates[141]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={142} x={1144} y={1900} width={22} height={32} rx={4} seatState={seatStates[142]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={143} x={1171} y={1900} width={22} height={32} rx={4} seatState={seatStates[143]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1921} rowText="26" />
          <Seat id={144} x={1233} y={1900} width={22} height={32} rx={4} seatState={seatStates[144]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={145} x={1260} y={1900} width={22} height={32} rx={4} seatState={seatStates[145]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={146} x={1287} y={1900} width={22} height={32} rx={4} seatState={seatStates[146]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={147} x={1117} y={1944} width={22} height={32} rx={4} seatState={seatStates[147]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={148} x={1144} y={1944} width={22} height={32} rx={4} seatState={seatStates[148]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={149} x={1171} y={1944} width={22} height={32} rx={4} seatState={seatStates[149]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={1965} rowText="27" />
          <Seat id={150} x={1233} y={1944} width={22} height={32} rx={4} seatState={seatStates[150]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={151} x={1260} y={1944} width={22} height={32} rx={4} seatState={seatStates[151]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={152} x={1287} y={1944} width={22} height={32} rx={4} seatState={seatStates[152]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={153} x={1117} y={1988} width={22} height={32} rx={4} seatState={seatStates[153]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={154} x={1144} y={1988} width={22} height={32} rx={4} seatState={seatStates[154]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={155} x={1171} y={1988} width={22} height={32} rx={4} seatState={seatStates[155]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={2009} rowText="28" />
          <Seat id={156} x={1233} y={1988} width={22} height={32} rx={4} seatState={seatStates[156]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={157} x={1260} y={1988} width={22} height={32} rx={4} seatState={seatStates[157]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={158} x={1287} y={1988} width={22} height={32} rx={4} seatState={seatStates[158]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Information cx={1126} cy={1575} r={6} />

          <Seat id={159} x={1117} y={2054} width={22} height={32} rx={4} seatState={seatStates[159]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={160} x={1144} y={2054} width={22} height={32} rx={4} seatState={seatStates[160]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={161} x={1171} y={2054} width={22} height={32} rx={4} seatState={seatStates[161]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={2075} rowText="29" />
          <Seat id={162} x={1233} y={2054} width={22} height={32} rx={4} seatState={seatStates[162]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={163} x={1260} y={2054} width={22} height={32} rx={4} seatState={seatStates[163]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={164} x={1287} y={2054} width={22} height={32} rx={4} seatState={seatStates[164]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={165} x={1117} y={2098} width={22} height={32} rx={4} seatState={seatStates[165]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={166} x={1144} y={2098} width={22} height={32} rx={4} seatState={seatStates[166]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={167} x={1171} y={2098} width={22} height={32} rx={4} seatState={seatStates[167]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={2119} rowText="30" />
          <Seat id={168} x={1233} y={2098} width={22} height={32} rx={4} seatState={seatStates[168]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={169} x={1260} y={2098} width={22} height={32} rx={4} seatState={seatStates[169]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={170} x={1287} y={2098} width={22} height={32} rx={4} seatState={seatStates[170]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={171} x={1117} y={2142} width={22} height={32} rx={4} seatState={seatStates[171]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={172} x={1144} y={2142} width={22} height={32} rx={4} seatState={seatStates[172]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={173} x={1171} y={2142} width={22} height={32} rx={4} seatState={seatStates[173]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={2163} rowText="31" />
          <Seat id={174} x={1233} y={2142} width={22} height={32} rx={4} seatState={seatStates[174]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={175} x={1260} y={2142} width={22} height={32} rx={4} seatState={seatStates[175]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={176} x={1287} y={2142} width={22} height={32} rx={4} seatState={seatStates[176]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={177} x={1117} y={2186} width={22} height={32} rx={4} seatState={seatStates[177]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={178} x={1144} y={2186} width={22} height={32} rx={4} seatState={seatStates[178]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={179} x={1171} y={2186} width={22} height={32} rx={4} seatState={seatStates[179]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={2207} rowText="32" />
          <Seat id={180} x={1233} y={2186} width={22} height={32} rx={4} seatState={seatStates[180]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={181} x={1260} y={2186} width={22} height={32} rx={4} seatState={seatStates[181]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={182} x={1287} y={2186} width={22} height={32} rx={4} seatState={seatStates[182]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

          <Seat id={183} x={1117} y={2230} width={22} height={32} rx={4} seatState={seatStates[183]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={184} x={1144} y={2230} width={22} height={32} rx={4} seatState={seatStates[184]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={185} x={1171} y={2230} width={22} height={32} rx={4} seatState={seatStates[185]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <RowNumber x={1213} y={2251} rowText="33" />
          <Seat id={186} x={1233} y={2230} width={22} height={32} rx={4} seatState={seatStates[186]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={187} x={1260} y={2230} width={22} height={32} rx={4} seatState={seatStates[187]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />
          <Seat id={188} x={1287} y={2230} width={22} height={32} rx={4} seatState={seatStates[188]} seatType="economy" onSeatClick={toggleSeatState} areSeatsInitialized={areSeatsInitialized} />

      </g>

        {/* Information components */}
        <Information cx={1126} cy={2037} r={6} />

        <defs>
          <linearGradient id="paint0_linear_2261_2619" x1="151" y1="1312" x2="2275" y2="1312" gradientUnits="userSpaceOnUse">
            <stop offset="0.28" stopColor="#FF8600" />
            <stop offset="0.489583" stopColor="#FFAB4D" />
            <stop offset="0.72" stopColor="#FFDAB1" />
          </linearGradient>
        </defs>
      </svg>
    </Draggable>
  );
};

export default Airplane;
