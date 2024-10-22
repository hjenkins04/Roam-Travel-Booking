import flightData from "@/public/data/flightData";
import { getTimeCategory } from "@/components/HelperFunctions/timeFilter"

export const filterFlights = (flightData, filters) => {
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