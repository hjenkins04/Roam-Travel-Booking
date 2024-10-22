import React, { useState } from "react";
import SearchItem from "@/components/SearchItem";
import SearchResultExpansion from "@/components/SearchResultExpansion";
import flightData from "@/public/data/flightData";
import { FlightDetailsProps } from "@/public/data/flightDetails";
import { getTimeCategory } from "@/components/HelperFunctions/timeFilter";
import { getNumStops } from "@/components/HelperFunctions/numStopsFilter";

// Define the FilterOptions type
type FilterOptions = {
    maxPrice: string | null;
    stops: string | null;
    arrivalTime: string | null;
    departureTime: string | null;
    airline: string | null;
};


const SearchScroll: React.FC<{ filters: FilterOptions }> = ({ filters }) => {
    const [selectedFlight, setSelectedFlight] = useState<FlightDetailsProps['flight'] | null>(null);

    const filterFlights = () => {
        return flightData.filter(flight => {
            const priceCheck = !filters.maxPrice || parseInt(flight.price.replace('$', '')) <= parseInt(filters.maxPrice.replace('$', ''));
            const stopsCheck = !filters.stops || getNumStops(flight.numStops) === filters.stops;
            const arrivalCheck = !filters.arrivalTime || getTimeCategory(flight.arrivalTime) === filters.arrivalTime;
            const departureCheck = !filters.departureTime || getTimeCategory(flight.departureTime) === filters.departureTime;
            const airlineCheck = !filters.airline || flight.airline === filters.airline;

            return priceCheck && stopsCheck && arrivalCheck && departureCheck && airlineCheck;
        });
    };

    const filteredFlights = filterFlights();

    return (
        <div className="flex mb-10 h-[500px] justify-between">
            <div className="hide-scrollbar h-[500px] overflow-y-auto w-[800px] bg-white p-4 rounded-lg overflow-hidden">
                {filteredFlights.length === 0 ? (
                    <div className="no-results">
                        <p>No results found for your search criteria.</p>
                    </div>
                ) : (
                    filteredFlights.map((flight, index) => (
                        <SearchItem
                            key={index}
                            {...flight}
                            onClick={() => setSelectedFlight({
                                outgoingAirport: flight.outgoingAirport,
                                incomingAirport: flight.incomingAirport,
                                outgoingAirportName: flight.outgoingAirportName,
                                incomingAirportName: flight.incomingAirportName,
                                tripLength: flight.tripLength,
                                price: flight.price,
                                airline: flight.airline,
                                flightDate: flight.flightDate,
                                time: `${flight.departureTime} - ${flight.arrivalTime}`,
                                baggageAllowance: flight.baggageAllowance,
                            })}
                        />
                    ))
                )}
            </div>

            <div className="ml-20 w-[500px] h-full mr-10 mb-20">
                <SearchResultExpansion flight={selectedFlight} />
            </div>
        </div>
    );
};

export default SearchScroll;