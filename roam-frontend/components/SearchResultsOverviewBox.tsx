import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, UserIcon, Users } from "lucide-react";
import SearchBoxButtonList from "@/components/SearchBoxButtonList";
import SearchBoxButton from "@/components/SearchBoxButton";
import SearchBoxButtonOneSide from "@/components/SearchBoxButtonOneSide";

const SearchResultsOverviewBox = () => {
  const [departureDate] = useState<Date>();
  const [returnDate] = useState<Date>();
  const [passengers] = useState([{ class: "Economy" }]);
  const [isRoundTrip] = useState(true);

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
                mainTextLeft={
                  departureDate ? format(departureDate, "dd") : "DD"
                }
                subTextLeft=""
                mainTextRight={
                  departureDate ? format(departureDate, "EEE") : "Day"
                }
                subTextRight={
                  departureDate ? format(departureDate, "MMMM") : "Month"
                }
                size="w-[160px]"
                onClickMainButton={() => {}}
              />
              <SearchBoxButton
                leftIcon={<CalendarIcon className="text-gray-500 h-4 w-4" />}
                headerText="RETURN DATE"
                mainTextLeft={returnDate ? format(returnDate, "dd") : "DD"}
                subTextLeft=""
                mainTextRight={returnDate ? format(returnDate, "EEE") : "Day"}
                subTextRight={returnDate ? format(returnDate, "MMMM") : "Month"}
                size="w-[160px]"
                onClickMainButton={() => {}}
              />
            </>
          )}

          {!isRoundTrip && (
            <SearchBoxButton
              leftIcon={<CalendarIcon className="text-gray-500 h-4 w-4" />}
              headerText="DEPARTURE DATE"
              mainTextLeft={departureDate ? format(departureDate, "dd") : "DD"}
              subTextLeft=""
              mainTextRight={
                departureDate ? format(departureDate, "EEEE") : "Day"
              }
              subTextRight={
                departureDate ? format(departureDate, "MMMM") : "Month"
              }
              size="w-[230px]"
              onClickMainButton={() => {}}
            />
          )}

          {/* Traveler & Class Button */}
          <SearchBoxButtonOneSide
            leftIcon={
              getNumberOfPassengersButton() != "1" ? (
                <Users className="text-gray-500 h-4 w-4" />
              ) : (
                <UserIcon className="text-gray-500 h-4 w-4" />
              )
            }
            headerText="TRAVELERS"
            mainText={getNumberOfPassengersButton()}
            subText=""
            size="w-[100px]"
            onClickMainButton={() => {}}
          />
        </SearchBoxButtonList>
      </div>
    </>
  );
};

export default SearchResultsOverviewBox;
