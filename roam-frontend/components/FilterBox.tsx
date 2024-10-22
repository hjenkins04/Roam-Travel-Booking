import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import FilterButtonGroup from "@/components/FilterButtonGroup";
import FilterButton from "@/components/FilterButton";
import SearchButton from "@/components/SearchButton";

interface FilterBoxProps {
    onFilterChange: (newFilters: FilterOptions) => void;
}
export interface FilterOptions {
    maxPrice: string | null;
    stops: string | null;
    arrivalTime: string | null;
    departureTime: string | null;
    airline: string | null;
}
const FilterBox: React.FC<FilterBoxProps> = ({ onFilterChange }) => {
    const [maxPrice, setMaxPrice] = useState<string | null>(null);
    const [stops, setStops] = useState<string | null>(null);
    const [arrivalTime, setArrivalTime] = useState<string | null>(null);
    const [departureTime, setDepartureTime] = useState<string | null>(null);
    const [airline, setAirline] = useState<string | null>(null);

    const applyFilters = () => {
        onFilterChange({
            maxPrice,
            stops,
            arrivalTime,
            departureTime,
            airline,
        });
    };
    return (
        <div className="flex flex-col items-center justify-start relative">
            {/* Main search container */}
            <div className="relative bg-white rounded-md p-2 max-w-[97%] w-full z-1">
                {/* Filter Form */}
                <FilterButtonGroup className="w-full justify-start space-y-2 sm:space-y-1">
                    {/* Max Price Button */}
                    <FilterButton
                        dataTestId="filter-button-1"
                        rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                        mainTextRight="Max Price"
                        options={["$200", "$300", "$400", "$500", "$600", "$700"]}
                        selectedOption={maxPrice}
                        onOptionSelect={setMaxPrice}
                    />
                    {/* Stops */}
                    <FilterButton
                        dataTestId="filter-button-2"
                        rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                        mainTextRight="Stops"
                        options={["0", "1", "2", "2+"]}
                        selectedOption={stops}
                        onOptionSelect={setStops}
                    />

                    {/* Arrival Time */}
                    <FilterButton
                        dataTestId="filter-button-3"
                        rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                        mainTextRight="Departure Time"
                        options={["Morning", "Afternoon", "Evening"]}
                        selectedOption={departureTime}
                        onOptionSelect={setDepartureTime}
                    />
                    {/* Departure Time */}
                    <FilterButton
                        dataTestId="filter-button-4"
                        rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                        mainTextRight="Arrival Time"
                        options={["Morning", "Afternoon", "Evening"]}
                        selectedOption={arrivalTime}
                        onOptionSelect={setArrivalTime}
                    />
                    {/* Airline */}
                    <FilterButton
                        dataTestId="filter-button-5"
                        rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                        mainTextRight="Airline"
                        options={["Airline A", "Airline B", "Airline C"]}
                        selectedOption={airline}
                        onOptionSelect={setAirline}
                    />
                    {/* Search Button */}
                    <SearchButton
                        mainText="Search"
                        onClick={applyFilters}
                        className="bg-[#FF9A2A] border-[#FF9A2A]"
                        customTextColour="text-white"
                    />
                </FilterButtonGroup>
            </div>
        </div>
    );
};

export default FilterBox;
