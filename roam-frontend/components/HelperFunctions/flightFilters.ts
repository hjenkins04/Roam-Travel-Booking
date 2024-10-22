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

// Function to filter flights based on filters provided
export const filterFlights = (flightData: Flight[], filters: Filters): Flight[] => {
  return flightData.filter((flight) => {
    const flightPrice = parseInt(flight.price.replace('$', ''));
    const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice.replace('$', '')) : null;

    // Filter by max price
    if (maxPrice !== null && flightPrice > maxPrice) {
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
