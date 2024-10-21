"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import SearchResultBox from "@/components/SearchResultBox";
import FilterBox from "@/components/FilterBox";
import SearchScroll from "@/components/SearchScroll";

// Define the FilterOptions type
type FilterOptions = {
  maxPrice: string | null;
  stops: string | null;
  arrivalTime: string | null;
  departureTime: string | null;
  airline: string | null;
};

export default function SearchResultsPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    maxPrice: null,
    stops: null,
    arrivalTime: null,
    departureTime: null,
    airline: null,
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="relative min-h-screen items-start">
      <Header
        headerSize={"small"}
        backgroundImage={true}
        logoColour={"black"}
        displayProfilePicture={false}
      />

      <main className="z-10 flex flex-col mt-[-95px] items-start pl-4">
        <div className="relative w-full max-w-screen-xl z-10 py-6" style={{ transform: "scale(0.75)", transformOrigin: "left", paddingTop: "40px" }}>
          <SearchResultBox />
        </div>
        <div className="relative w-full z-10" style={{ transform: "scale(0.75)", transformOrigin: "left", marginTop: "-50px" }}>
          <FilterBox onFilterChange={handleFilterChange} />
        </div>
        <div className="relative w-full h-full z-2" style={{ marginTop: "10px" }}>
          <SearchScroll filters={filters} />
        </div>
      </main>
    </div>
  );
}