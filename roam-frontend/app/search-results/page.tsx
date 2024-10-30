"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import Header from "@/components/Header";
import SearchResultBox from "@/components/SearchResultBox";
import FilterBox from "@/components/FilterBox";
import SearchScroll from "@/components/SearchScroll";
import SearchResultBoxSkeletonLoader from "@/components/SearchResultBoxSkeletonLoader";
import SearchScrollSkeletonLoader from "@/components/SearchScrollSkeletonLoader";

import { SearchProvider, useSearchContext } from "@/context/SearchContext";

import { Airport, Flight, FlightSearch, FilterOptions} from "@/models";
import { fetchAirports } from "@/api/FetchAirports";
import { fetchFlightsBySearchQuery } from "@/api/FetchFlightsBySearchQuery";

function SearchResultsContent() {
  const [filters, setFilters] = useState<FilterOptions>({
    maxPrice: null,
    stops: null,
    arrivalTime: null,
    departureTime: null,
    airline: null,
  });

  const [loading, setLoading] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(true);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const { searchData, setSearchData } = useSearchContext();

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Used only by child SearchResultBox
  const UpdatedFlightsSearch = useCallback(
    async (departureAirportId: string, arrivalAirportId: string) => {
      try {
        setResultsLoading(true);
        const searchQuery: FlightSearch = {
          departure_airport_id: departureAirportId,
          arival_airport_id: arrivalAirportId,
        };
        const flightsData = await fetchFlightsBySearchQuery(searchQuery);
        setFlights(flightsData);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setResultsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const fetchAirportsAndFlights = async () => {
      setLoading(true);
  
      try {
        const [airportsData, flightsData] = await Promise.all([
          fetchAirports(),
          searchData.departureAirport && searchData.arrivalAirport
            ? fetchFlightsBySearchQuery({
                departure_airport_id: searchData.departureAirport.guid,
                arival_airport_id: searchData.arrivalAirport.guid,
              })
            : Promise.resolve([]),
        ]);

        setAirports(airportsData);
        setFlights(flightsData);
      } catch (error) {
        console.error("Error fetching airport and flight data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAirportsAndFlights();
  }, [searchData]);
  

  return (
    <SearchProvider>
      <div className="relative min-h-screen items-start">
        <Header
          headerSize={"small"}
          backgroundImage={true}
          logoColour={"black"}
          displayProfilePicture={false}
        />

        <main className="z-10 flex flex-col mt-[-95px] items-start pl-4">
          <div className="relative w-full max-w-screen-xl z-10 py-6" style={{ transform: "scale(0.75)", transformOrigin: "left", paddingTop: "40px" }}>
            <Suspense fallback={<SearchResultBoxSkeletonLoader/>}>
              {!loading ? (
                <SearchResultBox airports={airports} UpdatedFlightsSearch={UpdatedFlightsSearch} />
              ) : (
                <SearchResultBoxSkeletonLoader />
              )}
            </Suspense>
          </div>
          <div className="relative w-full z-10" style={{ transform: "scale(0.75)", transformOrigin: "left", marginTop: "-50px" }}>
            <FilterBox onFilterChange={handleFilterChange} />
          </div>
          <div className="relative w-full h-full z-2" style={{ marginTop: "10px" }}>
            <Suspense fallback={<SearchScrollSkeletonLoader/>}>
              {!loading || !resultsLoading ? (
                <SearchScroll filters={filters} flights={flights}/>
              ) : (
                <SearchScrollSkeletonLoader />
              )}
            </Suspense>
          </div>
        </main>
      </div>
    </SearchProvider>
  );
}

export default function SearchResultsPage() {
  return (
    <SearchProvider>
      <SearchResultsContent />
    </SearchProvider>
  );
}