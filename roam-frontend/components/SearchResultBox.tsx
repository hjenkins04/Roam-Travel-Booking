import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  UserIcon,
  Users,
  PlusIcon,
  MinusIcon,
  ChevronDown,
  ArrowLeftRight,
  PlaneTakeoff,
  PlaneLanding,
} from "lucide-react";
import SearchBoxButtonList from "@/components/SearchBoxButtonList";
import SearchBoxButton from "@/components/SearchBoxButton";
import HumpButton from "@/components/Buttons/HumpButton";

import { useSearchStore } from "@/context/SearchContext";
import { Airport } from "@/models";

interface SearchResultBoxProps {
  airports: Airport[];
  UpdatedFlightsSearch: (
    departureAirportId: string,
    arrivalAirportId: string
  ) => Promise<void>;
}

const SearchResultBox: React.FC<SearchResultBoxProps> = ({ airports }) => {
  const { searchData, setSearchData } = useSearchStore();

  const handleDepartureChange = (value: Airport) => {
    setSearchData({
      ...searchData,
      departureAirport: value,
      arrivalAirport:
        searchData.arrivalAirport?.iata_code === value.iata_code
          ? null
          : searchData.arrivalAirport,
    });
  };

  const handleArrivalChange = (value: Airport) => {
    setSearchData({
      ...searchData,
      arrivalAirport: value,
      departureAirport:
        searchData.departureAirport?.iata_code === value.iata_code
          ? null
          : searchData.departureAirport,
    });
  };

  const swapAirports = () => {
    setSearchData({
      ...searchData,
      departureAirport: searchData.arrivalAirport,
      arrivalAirport: searchData.departureAirport,
    });
  };

  const addPassenger = () => {
    setSearchData({
      ...searchData,
      passengers: searchData.passengers + 1,
      seatTypeMapping: {
        ...searchData.seatTypeMapping,
        [searchData.passengers]: "Economy",
      },
    });
  };

  const removePassenger = () => {
    const updatedSeatTypeMapping = { ...searchData.seatTypeMapping };
    delete updatedSeatTypeMapping[searchData.passengers - 1];

    setSearchData({
      ...searchData,
      passengers: searchData.passengers > 1 ? searchData.passengers - 1 : 1,
      seatTypeMapping: updatedSeatTypeMapping,
    });
  };

  const updatePassengerClass = (
    index: number,
    newClass: "Business" | "Economy"
  ) => {
    setSearchData({
      ...searchData,
      seatTypeMapping: { ...searchData.seatTypeMapping, [index]: newClass },
    });
  };

  const getPassengerTypeSummary = () => {
    const seatTypes = Object.values(searchData.seatTypeMapping);
    const allBusiness = seatTypes.every((type) => type === "Business");
    const allEconomy = seatTypes.every((type) => type === "Economy");

    if (allBusiness) return "Business";
    if (allEconomy) return "Economy";
    return "Mixed";
  };

  return (
    <>
      <div className=" flex flex-col items-start relative">
        {/* Toggle Button Container */}
        <div className="relative flex ml-3 -mb-0.5 justify-center items-center">
          <HumpButton
            primaryColor="#FF9A2A"
            secondaryColor="#FFFFFF"
            primaryText="Round Trip"
            secondaryText="One Way"
            isPrimaryActive={searchData.isRoundTrip}
            onPrimaryClick={() =>
              setSearchData({ ...searchData, isRoundTrip: true })
            }
            onSecondaryClick={() =>
              setSearchData({ ...searchData, isRoundTrip: false })
            }
          />
        </div>

        {/* Main search container */}
        <div className="relative bg-white rounded-2xl shadow-lg p-4 max-w-[97%] w-full z-2">
          {/* Search Form (Button List) */}
          <SearchBoxButtonList data-testid='search-box' className="w-full justify-center space-y-4 sm:space-y-6">
            {/* Departure City Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <div>
                  <SearchBoxButton
                    data-testid="departure-city-button"
                    leftIcon={
                      <PlaneTakeoff className="text-gray-500 h-4 w-4" />
                    }
                    rightIcon={
                      <ChevronDown className="text-gray-500 h-4 w-4" />
                    }
                    headerText="DEPARTURE CITY"
                    mainTextLeft={
                      searchData.departureAirport?.iata_code || "Select City"
                    }
                    mainTextRight={
                      searchData.departureAirport?.municipality_name || ""
                    }
                    subTextRight={searchData.departureAirport?.short_name || ""}
                    size="w-[230px]"
                    className="-bottom-2.5"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[230px] p-4">
                <div className="space-y-2">
                  {airports
                    ?.filter(
                      (airport) =>
                        airport.iata_code !==
                        searchData.arrivalAirport?.iata_code
                    )
                    .map((airport) => (
                      <div
                        key={airport.guid}
                        onClick={() => handleDepartureChange(airport)}
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
                        data-testid={`airport-item-${airport.iata_code}`}
                      >
                        {airport.short_name} ({airport.iata_code})
                      </div>
                    ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Swap Icon between Departure and Arrival */}
            <div
              className="bg-orange-500 rounded-full p-2 z-10 cursor-pointer"
              onClick={swapAirports}
              style={{
                position: "relative",
                transform: "translateX(25%)",
                margin: "-18px",
              }}
            >
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </div>

            {/* Arrival City Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <div>
                  <SearchBoxButton
                    data-testid="arrival-city-button"
                    leftIcon={
                      <PlaneLanding className="text-gray-500 h-4 w-4" />
                    }
                    rightIcon={
                      <ChevronDown className="text-gray-500 h-4 w-4" />
                    }
                    headerText="ARRIVAL CITY"
                    mainTextLeft={
                      searchData.arrivalAirport?.iata_code || "Select City"
                    }
                    mainTextRight={
                      searchData.arrivalAirport?.municipality_name || ""
                    }
                    subTextRight={searchData.arrivalAirport?.short_name || ""}
                    size="w-[230px]"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[230px] p-4">
                <div className="space-y-2">
                  {airports
                    ?.filter(
                      (airport) =>
                        airport.iata_code !==
                        searchData.departureAirport?.iata_code
                    )
                    .map((airport) => (
                      <div
                        key={airport.guid}
                        onClick={() => handleArrivalChange(airport)}
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
                        data-testid={`airport-item-${airport.iata_code}`}
                      >
                        {airport.short_name} ({airport.iata_code})
                      </div>
                    ))}
                </div>
              </PopoverContent>
            </Popover>

            {searchData.isRoundTrip && (
              <>
                <Popover>
                  {/* Departure Date Button */}
                  <PopoverTrigger asChild>
                    <div>
                      <SearchBoxButton
                        data-testid="departure-date-button"
                        leftIcon={
                          <CalendarIcon className="text-gray-500 h-4 w-4" />
                        }
                        rightIcon={
                          <ChevronDown className="text-gray-500 h-4 w-4" />
                        }
                        headerText="DEPARTURE DATE"
                        mainTextLeft={
                          searchData.departureDate
                            ? format(searchData.departureDate, "dd")
                            : "DD"
                        }
                        subTextLeft=""
                        mainTextRight={
                          searchData.departureDate
                            ? format(searchData.departureDate, "EEE")
                            : "Day"
                        }
                        subTextRight={
                          searchData.departureDate
                            ? format(searchData.departureDate, "MMMM")
                            : "Month"
                        }
                        size="w-[175px]"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={searchData.departureDate || undefined}
                      onSelect={(date) =>
                        setSearchData({
                          ...searchData,
                          departureDate: date || null,
                        })
                      }
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  {/* Return Date Button */}
                  <PopoverTrigger asChild>
                    <div>
                      <SearchBoxButton
                        data-testid="return-date-button"
                        leftIcon={
                          <CalendarIcon className="text-gray-500 h-4 w-4" />
                        }
                        rightIcon={
                          <ChevronDown className="text-gray-500 h-4 w-4" />
                        }
                        headerText="RETURN DATE"
                        mainTextLeft={
                          searchData.returnDate
                            ? format(searchData.returnDate, "dd")
                            : "DD"
                        }
                        subTextLeft=""
                        mainTextRight={
                          searchData.returnDate
                            ? format(searchData.returnDate, "EEE")
                            : "Day"
                        }
                        subTextRight={
                          searchData.returnDate
                            ? format(searchData.returnDate, "MMMM")
                            : "Month"
                        }
                        size="w-[175px]"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={searchData.returnDate || undefined}
                      onSelect={(date) =>
                        setSearchData({
                          ...searchData,
                          returnDate: date || null,
                        })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </>
            )}

            {!searchData.isRoundTrip && (
              <Popover>
                {/* Departure Date Button */}
                <PopoverTrigger asChild>
                  <div>
                    <SearchBoxButton
                      leftIcon={
                        <CalendarIcon className="text-gray-500 h-4 w-4" />
                      }
                      rightIcon={
                        <ChevronDown className="text-gray-500 h-4 w-4" />
                      }
                      headerText="DEPARTURE DATE"
                      mainTextLeft={
                        searchData.departureDate
                          ? format(searchData.departureDate, "dd")
                          : "DD"
                      }
                      subTextLeft=""
                      mainTextRight={
                        searchData.departureDate
                          ? format(searchData.departureDate, "EEEE")
                          : "Day"
                      }
                      subTextRight={
                        searchData.departureDate
                          ? format(searchData.departureDate, "MMMM")
                          : "Month"
                      }
                      size="w-[230px]"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={searchData.departureDate || undefined}
                    onSelect={(date) =>
                      setSearchData({
                        ...searchData,
                        departureDate: date || null,
                      })
                    }
                  />
                </PopoverContent>
              </Popover>
            )}

            {/* Traveler & Class Button */}
            <Popover>
              <PopoverTrigger asChild>
                <div>
                  <SearchBoxButton
                    data-testid="travellers-button"
                    leftIcon={
                      searchData.passengers > 1 ? (
                        <Users className="text-gray-500 h-4 w-4" />
                      ) : (
                        <UserIcon className="text-gray-500 h-4 w-4" />
                      )
                    }
                    rightIcon={
                      <ChevronDown className="text-gray-500 h-4 w-4" />
                    }
                    headerText="TRAVELER & CLASS"
                    mainTextLeft={`${searchData.passengers}`} // Number of passengers
                    subTextLeft=""
                    mainTextRight={getPassengerTypeSummary()} // Summary of passenger types
                    subTextRight=""
                    size="w-[195px]"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Passengers</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={removePassenger}
                        disabled={searchData.passengers === 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span>{searchData.passengers}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={addPassenger}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {Array.from({ length: searchData.passengers }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span>Passenger {index + 1}</span>
                        <Select
                          value={searchData.seatTypeMapping[index] || "Economy"}
                          onValueChange={(value: "Business" | "Economy") =>
                            updatePassengerClass(index, value)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Economy">Economy</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </SearchBoxButtonList>
        </div>
      </div >
    </>
  );
};

export default SearchResultBox;
