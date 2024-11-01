import React, { useState } from "react";
import { format } from "date-fns";
import SearchBoxButtonList from "@/components/SearchBoxButtonList";
import SearchBoxButton from "@/components/SearchBoxButton";
import SearchBoxButtonOneSide from "@/components/SearchBoxButtonOneSide";
import { CalendarIcon, UserIcon, Users, PlusIcon, MinusIcon, ChevronDown, Search, ArrowLeftRight, PlaneTakeoff, PlaneLanding } from "lucide-react";

import { useTripContext } from "@/context/TripContext";

const SearchResultsOverviewBox = () => {
  const [departureDate] = useState<Date>();
  const [returnDate] = useState<Date>();
  const [passengers] = useState([{ class: "Economy" }]);
  const [isRoundTrip] = useState(true);

  const { tripData, setTripData } = useTripContext();

  return (
    <>
      <div className="flex flex-col items-center justify-center relative">
        {/* Search Form (Button List) */}
        <SearchBoxButtonList className="w-full justify-center space-y-4 sm:space-y-6 space-x-3">
          
          {/* Departure City Button */}
          <SearchBoxButton
            leftIcon={
              <PlaneTakeoff className="text-gray-500 h-4 w-4" />
            }
            headerText="DEPARTURE CITY"
            mainTextLeft={
              tripData.current_flight.departure_airport?.iata_code || "Select City"
            }
            mainTextRight={
              tripData.current_flight.departure_airport?.municipality_name || ""
            }
            subTextRight={tripData.current_flight.departure_airport?.short_name || ""}
            size="w-[230px]"
            className="-bottom-2.5"
          />

          {/* Arrival City Button */}
          <SearchBoxButton
            leftIcon={
              <PlaneLanding className="text-gray-500 h-4 w-4" />
            }
            headerText="ARRIVAL CITY"
            mainTextLeft={
              tripData.current_flight.arrival_airport?.iata_code || "Select City"
            }
            mainTextRight={
              tripData.current_flight.arrival_airport?.municipality_name || ""
            }
            subTextRight={tripData.current_flight.arrival_airport?.short_name || ""}
            size="w-[230px]"
          />

          {isRoundTrip && (
            <>
            {/* Departure Date Button */}
              <SearchBoxButton
                leftIcon={
                  <CalendarIcon className="text-gray-500 h-4 w-4" />
                }
                headerText="DEPARTURE DATE"
                mainTextLeft={
                  tripData.current_flight_departure_date
                    ? format(tripData.current_flight_departure_date, "dd")
                    : "DD"
                }
                subTextLeft=""
                mainTextRight={
                  tripData.current_flight_departure_date
                    ? format(tripData.current_flight_departure_date, "EEE")
                    : "Day"
                }
                subTextRight={
                  tripData.current_flight_departure_date
                    ? format(tripData.current_flight_departure_date, "MMMM")
                    : "Month"
                }
                size="w-[175px]"
                onClickMainButton={() => { }}
              />
            </>
          )}
          {/* Traveler & Class Button */}
          <SearchBoxButtonOneSide
            leftIcon={
              tripData.trip.passengers.length > 1 ? (
                  <Users className="text-gray-500 h-4 w-4" />
                ) : (
                  <UserIcon className="text-gray-500 h-4 w-4" />
                )
            }
            headerText="TRAVELERS"
            mainText={`${tripData.trip.passengers.length}`}
            subText=""
            size="w-[120px]"
            onClickMainButton={() => {}}
          />
        </SearchBoxButtonList>
      </div>
    </>
  );
};

export default SearchResultsOverviewBox;
