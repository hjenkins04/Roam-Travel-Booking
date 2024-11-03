import React, { useState } from "react";
import { Plane, Calendar, Briefcase, ArrowRight } from "lucide-react";
import BookFlightButton from "@/components/SearchButton";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Trip,
  Passenger,
  FlightSearch,
  Flight,
  formatTimeMinutes,
  getPriceByPassengerType,
} from "@/models";
import { useSearchStore } from "@/context/SearchContext";
import { useTripStore } from "@/context/TripContext";
import { useLoaderStore } from "@/context/LoaderContext";
import { useAuthStore } from "@/context/AuthContext";
import { fetchRandomReturnFlight } from "@/api/FetchRandomReturnFlight";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SearchResultExpansionProps {
  flight?: Flight;
}

const SearchResultExpansion: React.FC<SearchResultExpansionProps> = ({
  flight,
}) => {
  const { searchData } = useSearchStore();
  const { tripData, setTripData } = useTripStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const [fieldPopupOpen, setFieldPopupOpen] = useState(false);
  const [fieldName, setFieldName] = useState("Field Name");
  const { authData, setShowPleaseSignInPopup } = useAuthStore();
  const router = useRouter();

  //   const sleep = (milliseconds: any) =>
  //     new Promise((resolve) => setTimeout(resolve, milliseconds));

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

  const showRequiredFieldPopup = (name: string) => {
    setFieldName(name);
    setFieldPopupOpen(true);
  };

  const EnsureAllSearchFields = (): boolean => {
    // Check if all required fields are selected
    if (!searchData.departureAirport) {
      showRequiredFieldPopup("Departure City");
      hideLoader();
      return false;
    } else if (!searchData.arrivalAirport) {
      showRequiredFieldPopup("Arrival City");
      hideLoader();
      return false;
    } else if (!searchData.departureDate) {
      showRequiredFieldPopup("Departure Date");
      hideLoader();
      return false;
    } else if (searchData.isRoundTrip && !searchData.returnDate) {
      showRequiredFieldPopup("Return Date");
      hideLoader();
      return false;
    } else if (!searchData.passengers || searchData.passengers < 1) {
      showRequiredFieldPopup("Passengers");
      hideLoader();
      return false;
    }
    return true;
  };

  async function setTripContextData() {
    showLoader();
    try {
      if (authData.isSignedIn === false) {
        setShowPleaseSignInPopup(true);
        router.replace("/home");
        return;
      }

      if (!EnsureAllSearchFields()) {
        hideLoader();
        return;
      }

      // Set trip data
      const tripName = `${
        searchData.isRoundTrip ? "Round Trip" : "One Way"
      } - ${flight?.departure_airport.municipality_name} to ${
        flight?.arrival_airport.municipality_name
      } ${format(searchData.departureDate || new Date(), "MMMM yyyy")}`;

      // Create empty passengers for each in `searchData.passengers`
      const passengers: Passenger[] = Array.from({
        length: searchData.passengers,
      }).map((_, index) => ({
        guid: `passenger-${index}`,
        trip_id: "",
        name: "",
        departing_seat_id: 1,
        returning_seat_id: -1,
        middle: "",
        last: "",
        prefix: "",
        dob: new Date(),
        passport_number: "",
        known_traveller_number: "",
        email: "",
        phone: "",
        street_address: "",
        apt_number: "",
        province: "",
        zip_code: "",
        emerg_name: "",
        emerg_last: "",
        emerg_email: "",
        emerg_phone: "",
      }));

      const trip: Trip = {
        guid: "null",
        name: tripName,
        is_round_trip: searchData.isRoundTrip,
        departing_flight: flight || null,
        returning_flight: null,
        passengers,
        departure_date: searchData.departureDate,
        return_date: searchData.returnDate,
      };

      // Fetch a random return flight if it's a round trip
      if (
        searchData.isRoundTrip &&
        searchData.arrivalAirport &&
        searchData.departureAirport
      ) {
        const searchQuery: FlightSearch = {
          departure_airport_id: searchData.arrivalAirport.guid,
          arival_airport_id: searchData.departureAirport.guid,
        };
        const returnFlight = await fetchRandomReturnFlight(searchQuery);
        trip.returning_flight = returnFlight;
      }

      // Set trip data in trip context
      setTripData({
        ...tripData,
        trip: trip,
        departure_date: searchData.departureDate,
        return_date: searchData.returnDate,
        current_flight: flight || tripData.current_flight,
        current_flight_departure_date: searchData.departureDate,
        trip_booking_active: true,
        trip_purchased: false,
      });
      router.push("/seat-booking");
    } catch (error) {
      console.error("Error creating trip data", error);
    }
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
            onClick={setTripContextData}
            className="bg-[#FF9A2A] border-[#FF9A2A]"
            customTextColour="text-white"
          />
        </div>
      </div>

      {/* Field Required Popup */}
      <Dialog open={fieldPopupOpen} onOpenChange={setFieldPopupOpen}>
        <DialogContent>
          <div className="flex justify-center mb-4">
            <AlertTriangle size={48} className="text-orange-500" />
          </div>
          <DialogTitle>Complete Required Field</DialogTitle>
          <DialogDescription>
            Please complete the "{fieldName}" field before continuing.
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={() => setFieldPopupOpen(false)}
              className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchResultExpansion;
