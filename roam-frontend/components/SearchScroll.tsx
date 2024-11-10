import React, { useState } from "react";
import SearchItem from "@/components/SearchItem";
import SearchResultExpansion from "@/components/SearchResultExpansion";
import { getTimeCategory } from "@/components/HelperFunctions/timeFilter";
import { useSearchStore } from "@/context/SearchContext";
import { useTripStore } from "@/context/TripContext";
import { useLoaderStore } from "@/context/LoaderContext";
import { useAuthStore } from "@/context/AuthContext";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Flight, getPriceByPassengerType, FilterOptions } from "@/models";
import { useRouter } from "next/navigation";
import { setTripContextData } from "@/components/HelperFunctions/setTripContextData"

interface SearchScrollProps {
  filters: FilterOptions;
  flights: Flight[];
}

const SearchScroll: React.FC<SearchScrollProps> = ({ filters, flights }) => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const { searchData } = useSearchStore();
  const { tripData, setTripData } = useTripStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const [fieldPopupOpen, setFieldPopupOpen] = useState(false);
  const [fieldName, setFieldName] = useState("Field Name");
  const { authData, setShowPleaseSignInPopup } = useAuthStore();
  const router = useRouter();

  const filterFlights = () => {
    return flights.filter((flight) => {
      const priceCheck =
        !filters.max_price ||
        getPriceByPassengerType(searchData.seatTypeMapping, flight) <=
        parseInt(filters.max_price.replace("$", ""));
      const stopsCheck =
        !filters.stops || String(flight.num_stops) === filters.stops;
      const arrivalCheck =
        !filters.arrival_time ||
        getTimeCategory(flight.arrival_time) === filters.arrival_time;
      const departureCheck =
        !filters.departure_time ||
        getTimeCategory(flight.departure_time) === filters.departure_time;
      // const airlineCheck =
      //   !filters.airline || flight.airline === filters.airline; //TODO

      return (
        priceCheck && stopsCheck && arrivalCheck && departureCheck //&&
        //airlineCheck //TODO
      );
    });
  };

  const filteredFlights = filterFlights();

  const showRequiredFieldPopup = (name: string, setFieldName: React.Dispatch<React.SetStateAction<string>>, setFieldPopupOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setFieldName(name);
    setFieldPopupOpen(true);
  };


  const EnsureAllSearchFields = (): boolean => {
    // Check if all required fields are selected
    if (!searchData.departureAirport) {
      showRequiredFieldPopup("Departure City", setFieldName, setFieldPopupOpen);
      hideLoader();
      return false;
    } else if (!searchData.arrivalAirport) {
      showRequiredFieldPopup("Arrival City", setFieldName, setFieldPopupOpen);
      hideLoader();
      return false;
    } else if (!searchData.departureDate) {
      showRequiredFieldPopup("Departure Date", setFieldName, setFieldPopupOpen);
      hideLoader();
      return false;
    } else if (searchData.isRoundTrip && !searchData.returnDate) {
      showRequiredFieldPopup("Return Date", setFieldName, setFieldPopupOpen);
      hideLoader();
      return false;
    } else if (!searchData.passengers || searchData.passengers < 1) {
      showRequiredFieldPopup("Passengers", setFieldName, setFieldPopupOpen);
      hideLoader();
      return false;
    }
    return true;
  };


  const handleSetTripData = () => {
    setTripContextData(
      selectedFlight,
      searchData,
      tripData,
      setTripData,
      authData,
      setShowPleaseSignInPopup,
      router,
      showLoader,
      hideLoader,
      EnsureAllSearchFields
    );
  };

  return (
    <>
      <div className="flex mb-10 h-[500px] justify-between">
        <div className="hide-scrollbar h-[500px] overflow-y-auto w-[800px] bg-white p-4 rounded-lg overflow-hidden">
          {filteredFlights.length === 0 ? (
            <div className="no-results">
              <p>No results found for your search criteria.</p>
            </div>
          ) : (
            filteredFlights.map((flight, index) => (
              <SearchItem
                key={index}
                index={index}
                flight={flight}
                onClick={() => setSelectedFlight(flight)}
              />
            ))
          )}
        </div>
        {selectedFlight && (
          <div className="ml-20 w-[500px] h-full mr-10 mb-20">
            <SearchResultExpansion flight={selectedFlight} onClick={handleSetTripData} />
          </div>
        )}
      </div>

      {/* Field Required Popup */}
      <Dialog open={fieldPopupOpen} onOpenChange={setFieldPopupOpen}>
        <DialogContent>
          <div className="flex justify-center mb-4">
            <AlertTriangle size={48} className="text-orange-500" />
          </div>
          <DialogTitle>Complete Required Field</DialogTitle>
          <DialogDescription>
            Please complete the &quot;{fieldName}&quot; field before continuing.
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

export default SearchScroll;
