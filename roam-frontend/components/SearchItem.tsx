"use client";

import React, { FC } from "react";
import Image from "next/image";
import { Flight, formatTimeMinutes, getLayoverSummary, getStopSummary, getPriceByPassengerType, getSeatTypeByPassengerType } from "@/models"
import { useSearchStore } from "@/context/SearchContext";

interface SearchItemProps {
  flight: Flight;
  onClick: () => void;
}

const SearchItem: FC<SearchItemProps> = ({ flight, onClick }) => {
  const { searchData, setSearchData } = useSearchStore();

  return (
    <button
      className="flex items-center justify-between w-[700px] p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition-all"
      onClick={onClick}
    >
      {/* Box for Left Icon and Airline */}
      <div className="flex items-center w-[200px]">
        <Image
          src={flight.airline.logo_path || '/images/default.png'}
          alt="Left Icon"
          width={36}
          height={36}
          className="mr-2"
        />
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500">{formatTimeMinutes(flight.flight_time_minutes)}</span>
          <span className="text-sm text-gray-500">{flight.airline.name}</span>
        </div>
      </div>

      {/* Box for Departure and Arrival Times */}
      <div className="flex flex-col items-center w-[200px]">
        <div className="flex items-center">
          <span className="text-md text-gray-500 font-semibold mr-2">
            {flight.departure_time}
          </span>
          <span className="mx-2"> - </span>
          <span className="text-md text-gray-500 font-semibold">
            {flight.arrival_time}
          </span>
        </div>
      </div>

      {/* Box for Number of Stops and Stop Info */}
      <div className="flex flex-col ml-4 items-center w-[200px]">
        <span className="text-sm text-gray-500">{getStopSummary(flight)}</span>
        <span className="text-sm text-gray-500 whitespace-normal">{getLayoverSummary(flight)}</span>
      </div>

      {/* Box for Price and Trip Type */}
      <div className="flex flex-col items-end w-[200px]">
        <span className="text-lg text-gray-500 font-semibold">${getPriceByPassengerType(searchData.seatTypeMapping, flight)}</span>
        <span className="text-sm text-gray-500">{getSeatTypeByPassengerType(searchData.seatTypeMapping)}</span>
      </div>
    </button>
  );
};

export default SearchItem;

