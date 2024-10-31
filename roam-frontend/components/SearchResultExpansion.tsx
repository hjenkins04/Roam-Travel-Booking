import React, { useState } from "react";
import { Plane, Calendar, Briefcase, ArrowRight } from "lucide-react";
import BookFlightButton from "@/components/SearchButton";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Trip, Passenger, FlightSearch, Flight, formatTimeMinutes, getPriceByPassengerType } from "@/models";
import { SearchProvider, useSearchContext } from "@/context/SearchContext";
import { useTripContext } from "@/context/TripContext";
import LoaderPopup from "@/components/LoaderPopup";
import { fetchRandomReturnFlight } from "@/api/FetchRandomReturnFlight";

interface SearchResultExpansionProps {
    flight?: Flight;
  }

const SearchResultExpansion: React.FC<SearchResultExpansionProps> = ({ flight }) => {
    const { searchData, setSearchData } = useSearchContext();
    const { tripData, setTripData } = useTripContext();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const sleep = (milliseconds: any) => new Promise(resolve => setTimeout(resolve, milliseconds));

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

    async function setTripContextData() {
        setLoading(true);
        try {
            // Set trip data
            const tripName = `${searchData.isRoundTrip ? "Round Trip" : "One Way"} - ${flight?.departure_airport.municipality_name} to ${flight?.arrival_airport.municipality_name} ${format(
                searchData.departureDate || new Date(),
                "MMMM yyyy"
            )}`;
        
            // Create empty passengers for each in `searchData.passengers`
            const passengers: Passenger[] = Array.from({ length: searchData.passengers }).map((_, index) => ({
                guid: `passenger-${index}`,
                tripId: "",
                name: "",
                departingSeatId: 0,
                returningSeatId: undefined,
                middle: undefined,
                last: undefined,
                prefix: undefined,
                dob: undefined,
                passportNumber: undefined,
                knownTravellerNumber: undefined,
                email: undefined,
                phone: undefined,
                streetAddress: undefined,
                aptNumber: undefined,
                province: undefined,
                zipCode: undefined,
                emergName: undefined,
                emergLast: undefined,
                emergEmail: undefined,
                emergPhone: undefined,

            }));
        
            const trip: Trip = {
                guid: "null",
                name: tripName,
                isRoundTrip: searchData.isRoundTrip,
                departingFlight: flight || null,
                returningFlight: null,
                passengers,
            };
        
            // Fetch a random return flight if it's a round trip
            if (searchData.isRoundTrip && searchData.arrivalAirport && searchData.departureAirport) {
                const searchQuery: FlightSearch = {
                    departure_airport_id: searchData.arrivalAirport.guid,
                    arival_airport_id: searchData.departureAirport.guid,
                  };
                const returnFlight = await fetchRandomReturnFlight(searchQuery);
                trip.returningFlight = returnFlight;
            }
        
            // Set trip data in trip context
            setTripData((prev) => ({...prev, trip: trip,
                departureDate: searchData.departureDate,
                returnDate: searchData.returnDate, 
                currentFlight: flight ? flight : prev.currentFlight,
                currentFlightDepartureDate: searchData.departureDate}));

            router.push("/seat-booking");
            await sleep(2000);
        } catch (error) {
            console.error("Error creating trip data", error);
        }
    }
      

    if (!flight) return null; // Render nothing if no flight is selected

    return (
        <div className="bg-gray-100 p-4 rounded-2xl w-full h-full shadow-md flex flex-col justify-between border-2 border-[#FF9A2A]">
            {/* Loader Popup */}
            <LoaderPopup isOpen={loading} />
            
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
                        Price: ${getPriceByPassengerType(searchData.seatTypeMapping, flight)}
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
                        {searchData.departureDate ? formatDate(searchData.departureDate) : "No date selected"}
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
                    onClick={setTripContextData}
                    className="bg-[#FF9A2A] border-[#FF9A2A]"
                    customTextColour="text-white"
                />
            </div>
        </div>

    );
};

export default SearchResultExpansion;