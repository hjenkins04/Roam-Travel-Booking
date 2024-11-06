import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";
import SearchBoxButtonList from "@/components/SearchBoxButtonList";
import HumpButton from "@/components/Buttons/HumpButton";

import SearchBoxButtonSkeleton from "@/components/SearchBoxButtonSkeleton";

const SearchBoxSkeletonLoader: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center relative">
        {/* Toggle Button Container */}
        <div className="relative flex -mb-0.5 justify-center items-center">
          <HumpButton
            primaryColor="#FF9A2A"
            secondaryColor="#FFFFFF"
            primaryText="Round Trip"
            secondaryText="One Way"
            onPrimaryClick={() => {}}
            onSecondaryClick={() => {}}
          />
        </div>

        {/* Main search container */}
        <div className="relative bg-white rounded-2xl shadow-lg p-4 max-w-[97%] w-full z-2">
          {/* Search Form (Button List) */}
          <SearchBoxButtonList className="w-full justify-center space-y-4 sm:space-y-6">
            {/* Departure City Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <SearchBoxButtonSkeleton
                  size="w-[230px]"
                  className="-bottom-2.5"
                />
              </PopoverTrigger>
            </Popover>

            {/* Swap Icon between Departure and Arrival */}
            <div
              className="bg-orange-500 rounded-full p-5 z-10 cursor-pointer"
              onClick={() => {}}
              style={{
                position: "relative",
                transform: "translateX(25%)",
                margin: "-18px",
              }}
            ></div>

            {/* Arrival City Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <SearchBoxButtonSkeleton size="w-[230px]" />
              </PopoverTrigger>
            </Popover>

            <Popover>
              {/* Departure Date Button */}
              <PopoverTrigger asChild>
                <SearchBoxButtonSkeleton size="w-[175px]" />
              </PopoverTrigger>
            </Popover>

            <Popover>
              {/* Return Date Button */}
              <PopoverTrigger asChild>
                <SearchBoxButtonSkeleton size="w-[175px]" />
              </PopoverTrigger>
            </Popover>

            {/* Traveler & Class Button */}
            <Popover>
              <PopoverTrigger asChild>
                <SearchBoxButtonSkeleton size="w-[195px]" />
              </PopoverTrigger>
            </Popover>
          </SearchBoxButtonList>

          {/* Search Button */}
          <div className="flex justify-center pt-6 relative">
            <Button
              onClick={() => {}}
              className="bg-orange-500 text-white px-10 py-7 rounded-2xl hover:bg-orange-600 absolute left-1/2 transform -translate-x-1/2 shadow-[0_5px_15px_rgba(255,165,0,0.3)] text-lg flex items-center space-x-2"
            >
              <span>Search Flights</span>
              <Search className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBoxSkeletonLoader;
