import React, { useEffect, useState } from 'react';
import { getTimeCategory } from "@/components/HelperFunctions/TimeFilter";

interface Flight {
  id: string;
  price: string;
  numStops: string;
  arrivalTime: string;
  departureTime: string;
  airline: string;
}

interface Filters {
  maxPrice?: string;
  stops?: string;
  arrivalTime?: string;
  departureTime?: string;
  airline?: string;
}

interface FlightSearchResultsProps {
  flightData: Flight[];
  filters: Filters;
}

const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({ flightData, filters }) => {
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const filterFlights = () => {
      return flightData.filter(flight => {
        // Filter by max price
        if (filters.maxPrice && parseInt(flight.price.replace('$', '')) > parseInt(filters.maxPrice.replace('$', ''))) {
          return false;
        }

        // Filter by number of stops
        if (filters.stops && flight.numStops !== filters.stops) {
          return false;
        }

        // Filter by arrival time category
        const flightArrivalCategory = getTimeCategory(flight.arrivalTime);
        if (filters.arrivalTime && flightArrivalCategory !== filters.arrivalTime) {
          return false;
        }

        // Filter by departure time category
        const flightDepartureCategory = getTimeCategory(flight.departureTime);
        if (filters.departureTime && flightDepartureCategory !== filters.departureTime) {
          return false;
        }

        // Filter by airline
        if (filters.airline && flight.airline !== filters.airline) {
          return false;
        }

        return true;
      });
    };

    setFilteredFlights(filterFlights());
  }, [flightData, filters]);

  return (
    <div>
      {filteredFlights.length > 0 ? (
        filteredFlights.map(flight => (
          <div key={flight.id}>
            <p>Airline: {flight.airline}</p>
            <p>Price: {flight.price}</p>
            <p>Stops: {flight.numStops}</p>
            <p>Departure: {flight.departureTime}</p>
            <p>Arrival: {flight.arrivalTime}</p>
          </div>
        ))
      ) : (
        <p>No flights match your search criteria.</p>
      )}
    </div>
  );
};

export default FlightSearchResults;
