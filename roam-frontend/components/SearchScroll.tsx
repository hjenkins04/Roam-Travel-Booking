
import React, { useState } from "react"; // Import useState here
import SearchItem from "@/components/SearchItem";
import FlightDetails from "@/components/SearchResultExpansion"; // Import the FlightDetails component
import flightData from "@/public/data/flightData";

const SearchScroll = () => {
    const [selectedFlight, setSelectedFlight] = useState(null); // State to store the selected flight

    return (
        <div className="flex mb-10 h-[500px] justify-between">
            <div className="hide-scrollbar h-[500px] overflow-y-auto w-[700px] bg-white p-4 rounded-lg overflow-hidden">
                {flightData.map((flight, index) => (
                    <SearchItem
                        key={index} // Use a unique key for each item
                        departureTime={flight.departureTime}
                        arrivalTime={flight.arrivalTime}
                        airline={flight.airline}
                        tripLength={flight.tripLength}
                        numStops={flight.numStops}
                        stopInfo={flight.stopInfo}
                        price={flight.price}
                        tripType={flight.tripType}
                        leftIcon={flight.leftIcon}
                        onClick={() => setSelectedFlight(flight)} // Set selected flight on button click
                    />
                ))}
            </div>

            {/* Render FlightDetails on the right side */}
            <div className="ml-20 w-[500px] h-full mr-10 mb-20">
                <FlightDetails flight={selectedFlight} /> {/* Pass selected flight to FlightDetails */}
            </div>
        </div >
    );
};

export default SearchScroll;

