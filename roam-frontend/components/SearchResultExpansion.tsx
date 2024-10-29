import React from "react";
import { Plane, Calendar, Briefcase, ArrowRight } from "lucide-react";
import BookFlightButton from "@/components/SearchButton";
import { FlightDetailsProps } from "@/public/data/flightDetails"
import { useRouter } from "next/navigation";

const SearchResultExpansion: React.FC<FlightDetailsProps> = ({ flight }) => {
    const router = useRouter();

    if (!flight) return null; // Render nothing if no flight is selected

    return (
        <div className="bg-gray-100 p-4 rounded-2xl w-full h-full shadow-md flex flex-col justify-between border-2 border-[#FF9A2A]">
            {/* Outgoing airport and incoming airport */}
            <div>
                <div className="flex justify-between items-center">
                    <div className="text-5xl  text-gray-600  font-bold">
                        {flight.outgoingAirport}
                    </div>
                    <ArrowRight className="mx-2" size={40} />
                    <div className="text-5xl  text-gray-600 font-bold text-right">
                        {flight.incomingAirport}
                    </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{flight.outgoingAirportName}</span>
                    <span>{flight.incomingAirportName}</span>
                </div>

                {/* Flight length and price */}
                <div className="flex justify-between text-sm mt-2">
                    <span>{flight.tripLength}</span>
                    <span>Price: {flight.price}</span>
                </div>
                <hr className="my-4 border-t-2 border-gray-500" />

                {/* Bullet points with icons */}
                <ul className="list-none p-0  text-gray-500">
                    <li className="flex items-center my-6"> 
                        <Plane className="mr-2" /> {flight.airline}
                    </li>
                    <li className="flex items-center my-6">
                        <Calendar className="mr-2" />
                        {flight.flightDate}
                        <br />
                        {flight.time}
                    </li>
                    <li className="flex items-center my-6"> 
                        <Briefcase className="mr-2" /> Baggage: {flight.baggageAllowance}
                    </li>
                </ul>
            </div>
            
            {/* Right-aligned button at the bottom */}
            <div className="flex justify-end mt-4">
                <BookFlightButton
                    mainText="Book My Ticket Now"
                    onClick={() => router.push("/checkout")}
                    className="bg-[#FF9A2A] border-[#FF9A2A]"
                    customTextColour="text-white"
                />
            </div>
        </div>

    );
};

export default SearchResultExpansion;