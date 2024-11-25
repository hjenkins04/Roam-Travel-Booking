"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Airplane from "@/components/SeatSelection/Airplane";
import BookingForm from "@/components/SeatBookingForm";
import Header from "@/components/Header";
import SeatBookingFormFooter from "@/components/SeatBookingFormFooter";
import { useTripStore, TripData } from "@/context/TripContext";
import { useLoaderStore } from "@/context/LoaderContext";
import { PossibleSeatStates } from "@/components/SeatSelection/Seat";
import { fetchFlightSeats } from "@/api/FetchFlightSeats";
import { PassengerFormData, transformToPassenger, Passenger, Seat, Flight } from "@/models";

export default function SeatBookingPage() {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [passengerName, setPassengerName] = useState<string>("");
  const [isRoundTrip] = useState<boolean>(true);
  const [isFirstFlight, setIsFirstFlight] = useState<boolean>(true);
  const [areSeatsInitialized, setAreSeatsInitialized] = useState<boolean>(false);
  const [passengerIndex, setPassengerIndex] = useState<number>(0);
  const { tripData, setTripData } = useTripStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const [groupSize] = useState<number>(tripData?.trip?.passengers?.length || 5);
  const [seatStates, setSeatStates] = useState<{[id: number]: PossibleSeatStates;}>({});

  const router = useRouter();

  const cancel = () => {
    router.back();
  };

  const [formData, setFormData] = useState<PassengerFormData>({
    name: tripData?.trip?.passengers?.[passengerIndex]?.name ?? "",
  });
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadPassengerData = useCallback((index: number) => {
    const passenger = (tripData?.trip?.passengers?.[index] ?? {}) as Passenger;
    setFormData({
      name: passenger.name ?? "",
      last: passenger.last ?? "",
      middle: passenger.middle ?? "",
      prefix: passenger.prefix ?? "",
      dob: passenger.dob ?? undefined,
      passport_number: passenger.passport_number ?? "",
      known_traveller_number: passenger.known_traveller_number ?? "",
      email: passenger.email ?? "",
      phone: passenger.phone ?? "",
      street_address: passenger.street_address ?? "",
      apt_number: passenger.apt_number ?? "",
      zip_code: passenger.zip_code ?? "",
      province: passenger.province ?? "",
      emerg_name: passenger.emerg_name ?? "",
      emerg_last: passenger.emerg_last ?? "",
      emerg_email: passenger.emerg_email ?? "",
      emerg_phone: passenger.emerg_phone ?? "",
    });
  }, [tripData, setFormData]);

  const initializeSeatStates = (seats: Seat[]) => {
    const newSeatStates: { [id: number]: PossibleSeatStates } = {};
    seats.forEach((seat) => {
      newSeatStates[seat.seat_id] = seat.available ? "available" : "taken";
    });
    setSeatStates(newSeatStates);
    hideLoader();
    setAreSeatsInitialized(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadFlightSeats = useCallback(async (flight: Flight) => {
    try {
      const flightConfig = await fetchFlightSeats(flight.guid);
      initializeSeatStates(flightConfig.seat_configuration);
      flight.seat_configuration = flightConfig;
    } catch (error) {
      console.error("Error fetching seat data:", error);
    }
  }, []);

  const toggleSeatState = (id: number) => {
    setSeatStates((prevState) => {
      const newSeatStates: { [id: number]: PossibleSeatStates } = {};

      Object.keys(prevState).forEach((seatId) => {
        const seatIdNumber = Number(seatId);
        if (seatIdNumber === id && prevState[seatIdNumber] === "available") {
          newSeatStates[seatIdNumber] = "selected";
          handleSeatClick(id);
        } else if (prevState[seatIdNumber] === "selected") {
          newSeatStates[seatIdNumber] = "available";
          handleSeatClick(id);
        } else {
          newSeatStates[seatIdNumber] = prevState[seatIdNumber];
        }
      });

      return newSeatStates;
    });
  };

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeat(seatNumber === selectedSeat ? null : seatNumber);
  };

  const updateFormData = (newData: Partial<PassengerFormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleFormSubmit = async () => {
    if (!tripData.trip) return; // Ensure tripData.trip exists

    showLoader();

    // Retrieve the current passenger data
    const existingPassenger = tripData.trip.passengers[passengerIndex] ?? {};
    const passengerData: Passenger = {
      ...transformToPassenger(formData, existingPassenger),
      ...(isFirstFlight
        ? { departing_seat_id: selectedSeat ?? 0 }
        : { returning_seat_id: selectedSeat ?? 0 }),
    };

    // Prepare the updated passengers array
    const updatedPassengers = [
      ...tripData.trip.passengers.slice(0, passengerIndex),
      passengerData,
      ...tripData.trip.passengers.slice(passengerIndex + 1),
    ];

    // Prepare the new trip data
    const updatedTrip: TripData = {
      ...tripData,
      trip: {
        ...tripData.trip,
        passengers: updatedPassengers,
      },
    };

    // Update Zustand state with the modified trip data
    setTripData(updatedTrip);

    if (selectedSeat !== null) {
      setSeatStates((prev) => ({
        ...prev,
        [selectedSeat]: "reserved",
      }));
    }

    // Handle next steps based on the current flight stage
    if (isFirstFlight) {
      if (passengerIndex < groupSize - 1) {
        setPassengerIndex(passengerIndex + 1);
        loadPassengerData(passengerIndex + 1);
        setPassengerIndex(passengerIndex + 1);
        setSelectedSeat(null);
        hideLoader();
      } else {
        setPassengerIndex(0);
        setIsFirstFlight(false);
        loadPassengerData(0);
        setSelectedSeat(null);

        // Prepare next flight information if round trip
        const nextFlight =
          tripData.trip.returning_flight ?? tripData.current_flight;
        setTripData({
          ...updatedTrip,
          current_flight: nextFlight,
          current_flight_departure_date: tripData.return_date,
        });

        if (nextFlight) loadFlightSeats(nextFlight);
      }
    } else if (passengerIndex < groupSize - 1) {
      setPassengerIndex(passengerIndex + 1);
      loadPassengerData(passengerIndex + 1);
      setPassengerIndex(passengerIndex + 1);
      setSelectedSeat(null);
      hideLoader();
    } else {
      const nextFlight =
        tripData.trip.departing_flight ?? tripData.current_flight;
      setTripData({
        ...updatedTrip,
        current_flight: nextFlight,
        current_flight_departure_date: tripData.departure_date,
      });
      hideLoader();
      router.push("/checkout");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if(!areSeatsInitialized){
      if (tripData?.current_flight) {
        loadFlightSeats(tripData.current_flight);
      }
      loadPassengerData(passengerIndex);
    }
    if (tripData?.trip?.passengers) {
      loadPassengerData(passengerIndex);
    }
  }, [tripData, passengerIndex, areSeatsInitialized]);

  return (
    <>
      <div className="relative">
        <Header
          headerSize="small"
          backgroundImage
          logoColour="black"
          displayProfilePicture
        />

        {/* MetaData Hidden */}
        <div className="flex flex-col" style={{ display: "none" }}>
            <span className="text-sm font-medium text-gray-500" data-testid="passenger-index">{`Passenger Index: ${passengerIndex}`}</span>
            <span className="text-sm font-medium text-gray-500" data-testid="group-size">{`Group Size: ${groupSize}`}</span>
            <span className="text-sm font-medium text-gray-500" data-testid="is-round-trip">{`Round Trip: ${isRoundTrip}`}</span>
            <span className="text-sm font-medium text-gray-500" data-testid="is-first-flight">{`First Flight: ${isFirstFlight}`}</span>
        </div>

        <div className="relative flex overflow-hidden z-20 bg-neutral-50" style={{ height: "calc(100vh - 150px)" }} data-testid="seat-booking">
          <div className={`relative transition-all duration-300 ease-in-out overflow-hidden
            ${ selectedSeat ? "w-2/4" : "w-full" }`}
            style={{ height: "100%" }}
            data-testid={"airplane-column"}
          >
            <div className="relative w-full h-full cursor-grab active:cursor-grabbing" data-testid="airplane-svg">
              <Airplane
                onSeatClick={toggleSeatState}
                seatStates={seatStates}
                areSeatsInitialized={areSeatsInitialized}
              />
            </div>
          </div>
          {selectedSeat && (
            <div className="absolute right-0 w-4/7 h-full bg-white shadow-lg transition-opacity duration-300 ease-in-out opacity-100 flex flex-col justify-between" data-testid={"booking-form-column"}>
              <div className="p-8 flex-1 overflow-auto">
                {tripData.trip && (
                  <BookingForm
                    currentPassengerIndex={passengerIndex}
                    firstPassengerData={tripData.trip.passengers[0]}
                    setPassengerName={setPassengerName}
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
              </div>
              <div className="bg-gray-200 p-4" data-testid={"booking-form-footer"}>
                <SeatBookingFormFooter
                  passengerName={passengerName}
                  seatNumber={selectedSeat}
                  groupSize={groupSize}
                  passengerIndex={passengerIndex}
                  isRoundTrip={isRoundTrip}
                  isFirstFlight={isFirstFlight}
                  onCancel={cancel}
                  onNextPassenger={handleFormSubmit}
                  onNextFlight={handleFormSubmit}
                  onContinue={handleFormSubmit}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
