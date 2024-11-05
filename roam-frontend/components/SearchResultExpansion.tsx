import React from "react";
import { Plane, Calendar, Briefcase, ArrowRight } from "lucide-react";
import BookFlightButton from "@/components/SearchButton";
import { format } from "date-fns";
import { Flight, formatTimeMinutes, getPriceByPassengerType } from "@/models";
import { useSearchStore } from "@/context/SearchContext";

interface SearchResultExpansionProps {
  flight?: Flight;
  onClick: () => void;
}

const SearchResultExpansion: React.FC<SearchResultExpansionProps> = ({
  flight, onClick }) => {
  const { searchData } = useSearchStore();

  const formatDate = (date: Date): string => {
    return format(date, "EEEE, MMMM do yyyy");
  };

  function splitName(name: string): JSX.Element {
    const words = name.split(" ");
    const splitIndex = Math.min(2, words.length);
    const firstLine = words.slice(0, splitIndex).join(" ");
    const secondLine = words.slice(splitIndex).join(" ");

    return (
      <>
        {firstLine}
        <br />
        {secondLine}
      </>
    );
  }

  if (!flight) return null; // Render nothing if no flight is selected

  return (
    <>
      <div className="bg-gray-100 p-4 rounded-2xl w-full h-full shadow-md flex flex-col justify-between border-2 border-[#FF9A2A]">
        {/* Outgoing airport and incoming airport */}
        <div>
          <div className="flex justify-between items-center">
            <div className="text-5xl  text-gray-600  font-bold">
              {flight.departure_airport.iata_code}
            </div>
            <ArrowRight className="mx-2" size={40} />
            <div className="text-5xl  text-gray-600 font-bold text-right">
              {flight.arrival_airport.iata_code}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{splitName(flight.departure_airport.full_name)}</span>
            <span>{splitName(flight.arrival_airport.full_name)}</span>
          </div>

          {/* Flight length and price */}
          <div className="flex justify-between text-base mt-2">
            <span className="text-gray-600">
              Duration: {formatTimeMinutes(flight.flight_time_minutes)}
            </span>
            <span className="font-semibold text-gray-700">
              Price: $
              {getPriceByPassengerType(searchData.seatTypeMapping, flight)}
            </span>
          </div>
          <hr className="my-4 border-t-2 border-gray-500" />

          {/* Bullet points with icons */}
          <ul className="list-none p-0  text-gray-500">
            <li className="flex items-center my-6">
              <Plane className="mr-2" /> {flight.airline.name}
            </li>
            <li className="flex items-center my-6">
              <Calendar className="mr-2" />
              {searchData.departureDate
                ? formatDate(searchData.departureDate)
                : "No date selected"}
              <br />
              {formatTimeMinutes(flight.flight_time_minutes)}
            </li>
            {flight.baggage_allowance && (
              <li className="flex items-center my-6">
                <Briefcase className="mr-2" />
                <span>Baggage: {flight.baggage_allowance}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Right-aligned button at the bottom */}
        <div className="flex justify-end mt-4">
          <BookFlightButton
            mainText="Book My Ticket Now"
            onClick={onClick}
            className="bg-[#FF9A2A] border-[#FF9A2A]"
            customTextColour="text-white"
          />
        </div>
      </div>
    </>
  );
};

export default SearchResultExpansion;
