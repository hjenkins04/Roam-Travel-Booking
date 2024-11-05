import React, { useState } from "react";
import SearchItem from "@/components/SearchItem";
import SearchResultExpansion from "@/components/SearchResultExpansion";
import { getTimeCategory } from "@/components/HelperFunctions/timeFilter";
import { useSearchStore } from "@/context/SearchContext";
import { Flight, FilterOptions, getPriceByPassengerType } from "@/models"



interface SearchScrollProps {
  filters: FilterOptions;
  flights: Flight[];
}

const SearchScroll: React.FC<SearchScrollProps> = ({ filters, flights }) => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const { searchData, setSearchData } = useSearchStore();

  const filterFlights = () => {
    return flights.filter((flight) => {
      const priceCheck =
        !filters.max_price || getPriceByPassengerType(searchData.seatTypeMapping, flight) <= parseInt(filters.max_price.replace("$", ""));
      const stopsCheck =
        !filters.stops || String(flight.num_stops) === filters.stops;
      const arrivalCheck =
        !filters.arrival_time ||
        getTimeCategory(flight.arrival_time) === filters.arrival_time;
      const departureCheck =
        !filters.departure_time ||
        getTimeCategory(flight.departure_time) === filters.departure_time;
      // const airlineCheck =
      //   !filters.airline || flight.airline === filters.airline; //TODO

      return (
        priceCheck &&
        stopsCheck &&
        arrivalCheck &&
        departureCheck //&&
        //airlineCheck //TODO
      );
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
              flight={flight}
              onClick={() => setSelectedFlight(flight)}
            />
          ))
        )}
      </div>
      {selectedFlight &&(
        <div className="ml-20 w-[500px] h-full mr-10 mb-20">
          <SearchResultExpansion flight={selectedFlight} />
        </div>
      )}
    </div>
  );
};

export default SearchScroll;
