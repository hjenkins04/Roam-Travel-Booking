import React, {useState} from "react";
import { Check } from 'lucide-react';

// Define seat types
export type SeatState = "loading" | "taken" | "available" | "selected";
export type SeatType = "business" | "economy";

// Interface for seat properties
export interface SeatProps {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    rx: number;
    seatType: SeatType;
    seatState: SeatState;
    onSeatClick: (id: number) => void;
    areSeatsInitialized: boolean; // Add this as a prop to manage initialization state
}

// Color determination function
const getFillColor = (seatType: "business" | "economy", seatState: SeatState, areSeatsInitialized: boolean) => {
    if (seatState === "loading" || !areSeatsInitialized) {
        return "#cccccc"; // Default gray if seats aren't initialized
    }
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
const Seat: React.FC<SeatProps> = ({ id, x, y, width, height, rx, seatType, seatState, onSeatClick, areSeatsInitialized }) => {
    const seatFillColor = getFillColor(seatType, seatState, areSeatsInitialized);

    // Add pointer cursor for available or selected seats, default cursor for taken or loading
    const cursorClass = seatState === "available" || seatState === "selected" ? "cursor-pointer" : "cursor-not-allowed";

    // Find the center of the rectangle for the checkmark
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    // Check if the seat is interactive (available or selected)
    const isInteractive = seatState === "available" || seatState === "selected";

    return (
        <g
            id={`seat_${id}`}
            onClick={() => onSeatClick(id)}
            role="button"
            aria-pressed={seatState === "selected"}
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
            />
            {/* Render checkmark if seat is selected */}
            {seatState === "selected" && (
                <g id="checkmark" transform={`translate(${centerX - 12}, ${centerY - 12})`}>
                    <Check size={24} color="#ffffff" />
                </g>
            )}
        </g>
    );
};

export default Seat;
