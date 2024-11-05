import React from "react";
import { Check } from "lucide-react";

// Define seat types
export type PossibleSeatStates = "loading" | "taken" | "available" | "selected" | "reserved";
export type PossibleSeatTypes = "business" | "economy";

// Interface for seat properties
export interface SeatProps {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  seatType: PossibleSeatTypes;
  seatState: PossibleSeatStates;
  onSeatClick: (id: number) => void;
  areSeatsInitialized: boolean;
}

// Color determination function
const getFillColor = (
  seatType: "business" | "economy",
  seatState: PossibleSeatStates,
  areSeatsInitialized: boolean
) => {
  if (seatState === "loading" || !areSeatsInitialized) {
    return "#cccccc"; // Default gray if seats aren't initialized
  }
  if (seatState === "reserved") return "#007bff";
  if (seatType === "business") {
    return seatState === "available"
      ? "#E15454" // available (red) for business
      : seatState === "taken"
      ? "#FFDAD9" // taken (light pink) for business
      : "#2E9881"; // selected (green) for business
  } else if (seatType === "economy") {
    return seatState === "available"
      ? "#F76641" // available (orange-red) for economy
      : seatState === "taken"
      ? "#FFE8D9" // taken (light beige) for economy
      : "#2E9881"; // selected (green) for economy
  }
  return "#cccccc"; // Default gray if state is loading
};

// Seat component
const Seat: React.FC<SeatProps> = ({
  id,
  x,
  y,
  width,
  height,
  rx,
  seatType,
  seatState,
  onSeatClick,
  areSeatsInitialized,
}) => {
  const seatFillColor = getFillColor(seatType, seatState, areSeatsInitialized);
  const isInteractive = seatState === "available" || seatState === "selected";

  // Add pointer cursor for available or selected seats, default cursor for taken or loading
  const cursorClass =
    seatState === "available" || seatState === "selected"
      ? "cursor-pointer"
      : "cursor-not-allowed";

  const handleClick = () => {
    if (isInteractive) {
      onSeatClick(id);
    }
  };

  // Find the center of the rectangle for the checkmark
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  return (
    <svg>
      <g
        id={`${id}`}
        onClick={handleClick}
        role="button"
        aria-pressed={seatState === "selected"}
        data-testid={`seat-${id}-${seatState}`}
      >
        {/* Seat Rectangle */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={rx}
          fill={seatFillColor}
          className={cursorClass}
          data-testid={`seat-rect-${id}`}
        />
        {/* Render checkmark if seat is selected */}
        {seatState === "selected" && (
          <g
            id="checkmark"
            data-testid={`seat-checkmark-${id}`}
            transform={`translate(${centerX - 12}, ${centerY - 12})`}
          >
            <Check size={24} color="#ffffff" />
          </g>
        )}
      </g>
    </svg>
  );
};

export default Seat;
