import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, UserIcon, Users, PlusIcon, MinusIcon, ChevronDown, Search, ArrowLeftRight, PlaneTakeoff, PlaneLanding } from "lucide-react";
import SearchBoxButtonList from "@/components/SearchBoxButtonList";
import SearchBoxButton from "@/components/SearchBoxButton";
import HumpButton from "@/components/Buttons/HumpButton";
import { useRouter } from "next/navigation";

import { useSearchStore } from "@/context/SearchContext";
import { Airport } from "@/models";


interface SearchBoxProps {
  airports: Airport[];
  showRequiredFieldPopup: (name: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ airports, showRequiredFieldPopup }) => {
  const { searchData, setSearchData } = useSearchStore();
  const router = useRouter();

  console.log("searchData:", searchData);  // Log the searchData object
  console.log("airports:", airports);  // Log airports prop
  console.log("showRequiredFieldPopup:", showRequiredFieldPopup);  // Log the mock function


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

  const updatePassengerClass = (index: number, newClass: "Business" | "Economy") => {
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

  const handleButtonClick = () => {
    // Check if all required fields are selected
    if (!searchData.departureAirport) {
      showRequiredFieldPopup("Departure City");
    } else if (!searchData.arrivalAirport) {
      showRequiredFieldPopup("Arrival City");
    } else if (!searchData.departureDate) {
      showRequiredFieldPopup("Departure Date");
    } else if (searchData.isRoundTrip && !searchData.returnDate) {
      showRequiredFieldPopup("Return Date");
    } else if (!searchData.passengers || searchData.passengers < 1) {
      showRequiredFieldPopup("Passengers");
    } else {
      router.push("/search-results");
    }
  };

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
          <SearchBoxButtonList className="w-full justify-center space-y-4 sm:space-y-6">
            {/* Departure City Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <div>
                  <SearchBoxButton
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
              data-testid="swap-button"
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
                        onClickMainButton={() => { }}
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
                        onClickMainButton={() => { }}
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
                      onClickMainButton={() => { }}
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
                    onClickMainButton={() => { }}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Passengers</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        data-testid='remove-passenger'
                        size="sm"
                        variant="outline"
                        onClick={removePassenger}
                        disabled={searchData.passengers === 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span>{searchData.passengers}</span>
                      <Button
                        data-testid='add-passenger'
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
                          <SelectTrigger data-testid={`passenger-class-${index}`} className="w-[120px]">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem data-testid={`economy-class-choice-${index}`} value="Economy">Economy</SelectItem>
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

          {/* Search Button */}
          <div className="flex justify-center pt-6 relative">
            <Button
              onClick={handleButtonClick}
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

export default SearchBox;
