import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, UserIcon, Users, PlusIcon, MinusIcon, ChevronDown, Search, ArrowLeftRight } from "lucide-react";
import FilterButtonGroup from "@/components/FilterButtonGroup";
import SearchBoxButton from "@/components/SearchBoxButton";
import FilterButton from "@/components/FilterButton";
import SearchButton from "@/components/SearchButton";
import Link from "next/link";

const FilterBox = () => {
    const [maxPrice, setMaxPrice] = useState<string | null>(null);
    const [stops, setStops] = useState<string | null>(null);
    const [arrivalTime, setArrivalTime] = useState<string | null>(null);
    const [departureTime, setDepartureTime] = useState<string | null>(null);
    const [airline, setAirline] = useState<string | null>(null);

    return (
        <div className="flex flex-col items-center justify-start relative">
            {/* Main search container */}
            <div className="relative bg-white rounded-md p-2 max-w-[97%] w-full z-1">
                {/* Filter Form */}
                <FilterButtonGroup className="w-full justify-start space-y-2 sm:space-y-1">
                    {/* Max Price Button */}
                    <FilterButton
                        rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                        mainTextRight="Max Price"
                        options={["$400", "$500", "$600", "$700"]}
                        selectedOption={maxPrice}
                        onOptionSelect={(option) => {
                            setMaxPrice(option);
                            // Close the dropdown (handled inside FilterButton)
                        }}
                    />

                    {/* Stops */}
                    <FilterButton
                        rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                        mainTextRight="Stops"
                        options={["0", "1", "2", "2+"]}
                        selectedOption={stops}
                        onOptionSelect={(option) => {
                            setStops(option);
                            // Close the dropdown (handled inside FilterButton)
                        }}
                    />

                    {/* Arrival Time */}
                    <FilterButton
                        rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                        mainTextRight="Arrival Time"
                        options={["Morning", "Afternoon", "Evening"]}
                        selectedOption={arrivalTime}
                        onOptionSelect={(option) => {
                            setArrivalTime(option);
                        }}
                    />

                    {/* Departure Time */}
                    <FilterButton
                        rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                        mainTextRight="Departure Time"
                        options={["Morning", "Afternoon", "Evening"]}
                        selectedOption={departureTime}
                        onOptionSelect={(option) => {
                            setDepartureTime(option);
                        }}
                    />

                    {/* Airline */}
                    <FilterButton
                        rightIcon={<ChevronDown className="text-gray-500 h-4 w-4" />}
                        mainTextRight="Airline"
                        options={["Airline A", "Airline B", "Airline C"]}
                        selectedOption={airline}
                        onOptionSelect={(option) => {
                            setAirline(option);
                        }}
                    />

                    {/* Search Button */}
                    <SearchButton
                        mainText="Search"
                        onClickRightIcon={() => console.log("Search Clicked")}
                        className="bg-[#FF9A2A] border-[#FF9A2A]"
                        customTextColour="text-white"
                    />
                </FilterButtonGroup>
            </div>
        </div>
    );
};

export default FilterBox;