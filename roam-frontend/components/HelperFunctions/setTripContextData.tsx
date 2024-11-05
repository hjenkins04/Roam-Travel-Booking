import { Trip, Passenger, FlightSearch, Flight } from "@/models";
import { fetchRandomReturnFlight } from "@/api/FetchRandomReturnFlight";
import { SearchData } from "@/context/SearchContext";
import { TripData } from "@/context/TripContext";
import { format } from "date-fns";

export async function setTripContextData(
  selectedFlight: Flight | null,
  searchData: SearchData,
  tripData: TripData,
  setTripData: (data: TripData) => void,
  authData: { isSignedIn: boolean },
  setShowPleaseSignInPopup: (show: boolean) => void,
  router: { push: (path: string) => void; replace: (path: string) => void },
  showLoader: () => void,
  hideLoader: () => void,
  EnsureAllSearchFields: () => boolean
) {
  showLoader();

  try {
    if (authData.isSignedIn === false) {
      setShowPleaseSignInPopup(true);
      router.replace("/");
      return;
    }
    if (!EnsureAllSearchFields()) {
      hideLoader();
      return;
    }
    const tripName = `${searchData.isRoundTrip ? "Round Trip" : "One Way"} - ${
      selectedFlight?.departure_airport.municipality_name
    } to ${selectedFlight?.arrival_airport.municipality_name} ${format(
      searchData.departureDate || new Date(),
      "MMMM yyyy"
    )}`;

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
      departing_flight: selectedFlight || null,
      returning_flight: null,
      passengers,
      departure_date: searchData.departureDate,
      return_date: searchData.returnDate,
    };

    if (searchData.isRoundTrip && searchData.arrivalAirport && searchData.departureAirport) {
      const searchQuery: FlightSearch = {
        departure_airport_id: searchData.arrivalAirport.guid,
        arival_airport_id: searchData.departureAirport.guid,
      };
      const returnFlight = await fetchRandomReturnFlight(searchQuery);
      trip.returning_flight = returnFlight;
    }
    setTripData({
      ...tripData,
      trip,
      departure_date: searchData.departureDate,
      return_date: searchData.returnDate,
      current_flight: selectedFlight || tripData.current_flight,
      current_flight_departure_date: searchData.departureDate,
      trip_booking_active: true,
      trip_purchased: false,
    });
    router.push("/seat-booking");
  } catch (error) {
    console.error("Error creating trip data", error);
  }
}

  