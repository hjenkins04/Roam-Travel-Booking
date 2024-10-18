import React from "react";

const FlightDetails = ({ flight }) => {
    if (!flight) return null; // Render nothing if no flight is selected

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{flight.airline}</h2>
            <p><strong>Departure Time:</strong> {flight.departureTime}</p>
            <p><strong>Arrival Time:</strong> {flight.arrivalTime}</p>
            <p><strong>Trip Length:</strong> {flight.tripLength}</p>
            <p><strong>Number of Stops:</strong> {flight.numStops}</p>
            <p><strong>Stop Info:</strong> {flight.stopInfo}</p>
            <p><strong>Price:</strong> {flight.price}</p>
            <p><strong>Trip Type:</strong> {flight.tripType}</p>
        </div>
    );
};

export default FlightDetails;