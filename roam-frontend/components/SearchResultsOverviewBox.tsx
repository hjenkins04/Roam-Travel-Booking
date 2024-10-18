import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, UserIcon, Users, PlusIcon, MinusIcon, ChevronDown, Search, ArrowLeftRight } from "lucide-react";
import SearchBoxButtonList from "@/components/SearchBoxButtonGroup";
import SearchBoxButton from "@/components/SearchBoxButton";
import SearchBoxButtonOneSide from "@/components/SearchBoxButtonOneSide";
import HumpButton from "@/components/Buttons/HumpButton";
import Link from "next/link";

const SearchResultsOverviewBox = () => {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState([{ class: "Economy" }]);
  const [isRoundTrip, setIsRoundTrip] = useState(true);

  const addPassenger = () => {
    setPassengers([...passengers, { class: "Economy" }]);
  };

  const removePassenger = () => {
    if (passengers.length > 1) {
      setPassengers(passengers.slice(0, -1));
    }
  };

  const updatePassengerClass = (index: number, newClass: "Business" | "Economy") => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index].class = newClass;
    setPassengers(updatedPassengers);
  };

  const getPassengerTypesButton = () => {
    const allBusiness = passengers.every((p) => p.class === "Business");
    const allEconomy = passengers.every((p) => p.class === "Economy");

    if (allBusiness) return `Business`;
    if (allEconomy) return `Economy`;
    return `Varying`;
  };

  const getNumberOfPassengersButton = () => {
    const count = passengers.length;
    return `${count}`;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center relative">
          {/* Search Form (Button List) */}
          <SearchBoxButtonList className="w-full justify-center space-y-4 sm:space-y-6 space-x-3">
            {/* Departure City Button */}
            <SearchBoxButton
              headerText="DEPARTURE CITY"
              mainTextLeft="YYZ"
              subTextLeft=""
              mainTextRight="Toronto"
              subTextRight="Pearson International"
              size="w-[200px]"
              className="-bottom-2.5"
              onClickMainButton={() => console.log("Departure City Clicked")}
            />

            {/* Arrival City Button */}
            <SearchBoxButton
              headerText="ARRIVAL CITY"
              mainTextLeft="HNL"
              subTextLeft=""
              mainTextRight="Honolulu"
              subTextRight="Daniel K. Inouye International"
              size="w-[200px]"
              onClickMainButton={() => console.log("Arrival City Clicked")}
            />

            {isRoundTrip && (
              <>
                <SearchBoxButton
                  leftIcon={<CalendarIcon className="text-gray-500 h-4 w-4" />}
                  headerText="DEPARTURE DATE"
                  mainTextLeft={departureDate ? format(departureDate, "dd") : "DD"}
                  subTextLeft=""
                  mainTextRight={departureDate ? format(departureDate, "EEE") : "Day"}
                  subTextRight={departureDate ? format(departureDate, "MMMM") : "Month"}
                  size="w-[160px]"
                  onClickMainButton={() => { }}
                />
                <SearchBoxButton
                  leftIcon={<CalendarIcon className="text-gray-500 h-4 w-4" />}
                  headerText="RETURN DATE"
                  mainTextLeft={returnDate ? format(returnDate, "dd") : "DD"}
                  subTextLeft=""
                  mainTextRight={returnDate ? format(returnDate, "EEE") : "Day"}
                  subTextRight={returnDate ? format(returnDate, "MMMM") : "Month"}
                  size="w-[160px]"
                  onClickMainButton={() => { }}
                />
              </>
            )}

            {!isRoundTrip && (
              <SearchBoxButton
                leftIcon={<CalendarIcon className="text-gray-500 h-4 w-4" />}
                headerText="DEPARTURE DATE"
                mainTextLeft={departureDate ? format(departureDate, "dd") : "DD"}
                subTextLeft=""
                mainTextRight={departureDate ? format(departureDate, "EEEE") : "Day"}
                subTextRight={departureDate ? format(departureDate, "MMMM") : "Month"}
                size="w-[230px]"
                onClickMainButton={() => { }}
              />
            )}

            {/* Traveler & Class Button */}
            <SearchBoxButtonOneSide
              leftIcon={
                getNumberOfPassengersButton() != "1" ?
                  (<Users className="text-gray-500 h-4 w-4" />)
                  :
                  (<UserIcon className="text-gray-500 h-4 w-4" />)
              }
              headerText="TRAVELERS"
              mainText={getNumberOfPassengersButton()}
              subText=""
              size="w-[100px]"
              onClickMainButton={() => { }}
            />
          </SearchBoxButtonList>
      </div>
    </>
  );
};

export default SearchResultsOverviewBox;
