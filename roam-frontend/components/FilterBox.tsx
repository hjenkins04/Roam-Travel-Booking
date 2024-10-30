import React, { useState } from "react";
import { FilterOptions } from "@/models";
import FilterButton from "@/components/FilterButton";
import SearchButton from "@/components/SearchButton";
import FilterButtonGroup from "@/components/FilterButtonGroup";

interface FilterBoxProps {
    onFilterChange: (newFilters: FilterOptions) => void;
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
        <div className="flex flex-col justify-start relative">
            <div className="relative bg-white rounded-md p-2 max-w-[97%] w-2/3 z-1">
                {/* Filter Form */}
                <FilterButtonGroup className="w-full justify-between">
                    {/* Max Price */}
                    <FilterButton
                        dataTestId="filter-button-1"
                        mainTextRight="Max Price"
                        options={["$200", "$300", "$400", "$500", "$600", "$700"]}
                        selectedOption={maxPrice}
                        onOptionSelect={setMaxPrice}
                    />

                    {/* Stops */}
                    <FilterButton
                        dataTestId="filter-button-2"
                        mainTextRight="Stops"
                        options={["0", "1", "2", "2+"]}
                        selectedOption={stops}
                        onOptionSelect={setStops}
                    />

                    {/* Departure Time */}
                    <FilterButton
                        dataTestId="filter-button-3"
                        mainTextRight="Departure Time"
                        options={["Morning", "Afternoon", "Evening"]}
                        selectedOption={departureTime}
                        onOptionSelect={setDepartureTime}
                    />

                    {/* Arrival Time */}
                    <FilterButton
                        dataTestId="filter-button-4"
                        mainTextRight="Arrival Time"
                        options={["Morning", "Afternoon", "Evening"]}
                        selectedOption={arrivalTime}
                        onOptionSelect={setArrivalTime}
                    />

                    {/* Airline */}
                    <FilterButton
                        dataTestId="filter-button-5"
                        mainTextRight="Airline"
                        options={["Airline A", "Airline B", "Airline C"]}
                        selectedOption={airline}
                        onOptionSelect={setAirline}
                    />

                    {/* Search Button */}
                    <SearchButton
                        mainText="Search"
                        onClick={applyFilters}
                        className="bg-[#FF9A2A] border-[#FF9A2A] text-white"
                    />
                </FilterButtonGroup>
            </div>
        </div>
    );
};

export default FilterBox;
