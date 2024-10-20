
import React, { useState } from "react";
import SearchItem from "@/components/SearchItem";
import SearchResultExpansion from "@/components/SearchResultExpansion";
import flightData from "@/public/data/flightData";
import { FlightDetailsProps } from "@/public/data/flightDetails";

const SearchScroll = () => {
    const [selectedFlight, setSelectedFlight] = useState<FlightDetailsProps['flight'] | null>(null);

    return (
        <div className="flex mb-10 h-[500px] justify-between">
            <div className="hide-scrollbar h-[500px] overflow-y-auto w-[700px] bg-white p-4 rounded-lg overflow-hidden">
                {flightData.map((flight, index) => (
                    <SearchItem
                        key={index}
                        departureTime={flight.departureTime}
                        arrivalTime={flight.arrivalTime}
                        airline={flight.airline}
                        tripLength={flight.tripLength}
                        numStops={flight.numStops}
                        stopInfo={flight.stopInfo}
                        price={flight.price}
                        tripType={flight.tripType}
                        leftIcon={flight.leftIcon}
                        onClick={() => setSelectedFlight({
                            outgoingAirport: flight.outgoingAirport,
                            incomingAirport: flight.incomingAirport,
                            outgoingAirportName: flight.outgoingAirportName,
                            incomingAirportName: flight.incomingAirportName,
                            tripLength: flight.tripLength,
                            price: flight.price,
                            airline: flight.airline,
                            flightDate: flight.flightDate,
                            time: "\n" + flight.departureTime + " - " + flight.arrivalTime,
                            baggageAllowance: flight.baggageAllowance,
                        })}
                    />
                ))}
            </div>

            {/* Render FlightDetails on the right side */}
            <div className="ml-20 w-[500px] h-full mr-10 mb-20">
                <SearchResultExpansion flight={selectedFlight} /> {/* Pass selected flight to FlightDetails */}
            </div>
        </div>
    );
};

export default SearchScroll;