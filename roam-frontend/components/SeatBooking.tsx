"use client";
import React, { useState, useRef } from "react";
import Airplane from "@/components/SeatSelection/Airplane";
import BookingForm from "@/components/SeatBookingForm";
import Header from "@/components/Header";
import SeatBookingFormFooter from "@/components/SeatBookingFormFooter";
import { useTripContext, TripProvider } from "@/context/TripContext";

export default function SeatBookingPage() {
  const { setTripData } = useTripContext();
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [passengerName, setPassengerName] = useState<string>("");
  const [groupSize] = useState<number>(1);
  const [isRoundTrip] = useState<boolean>(true);
  const [isFirstFlight, setIsFirstFlight] = useState<boolean>(true);
  const [passengerIndex, setPassengerIndex] = useState<number>(0);
  const [formData, setFormData] = useState({ /* initial state */ });
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeat(seatNumber === selectedSeat ? null : seatNumber);
  };

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleFormSubmit = () => {
    setTripData((prev) => {
      const updatedPassengers = [...prev.trip.passengers];
      updatedPassengers[passengerIndex] = { ...updatedPassengers[passengerIndex], ...formData };
      return { ...prev, trip: { ...prev.trip, passengers: updatedPassengers } };
    });

    if (passengerIndex === groupSize - 1 && isRoundTrip && isFirstFlight) {
      setPassengerIndex(0);
      setIsFirstFlight(false);
      setPassengerName("");
    } else if (passengerIndex < groupSize - 1) {
      setPassengerIndex(passengerIndex + 1);
      setPassengerName("");
    }

    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <TripProvider>
      <div className="relative">
        <Header headerSize={"small"} backgroundImage logoColour={"black"} displayProfilePicture />
        <div className="relative flex overflow-hidden z-20 bg-neutral-50" style={{ height: "calc(100vh - 150px)" }}>
          <div className={`relative ${selectedSeat ? "w-2/4" : "w-full"}`} style={{ height: "100%" }}>
            <Airplane onSeatClick={handleSeatClick} />
          </div>

          {selectedSeat && (
            <div className="absolute right-0 w-4/7 h-full bg-white shadow-lg flex flex-col justify-between">
              <div className="p-8 flex-1 overflow-auto">
                <BookingForm
                  currentPassengerIndex={passengerIndex}
                  setPassengerName={setPassengerName}
                  formData={formData}
                  updateFormData={updateFormData}
                />
              </div>
              <SeatBookingFormFooter
                passengerName={passengerName}
                seatNumber={selectedSeat}
                groupSize={groupSize}
                passengerIndex={passengerIndex}
                isRoundTrip={isRoundTrip}
                isFirstFlight={isFirstFlight}
                onSave={handleFormSubmit}
                onNextPassenger={handleFormSubmit}
                onNextFlight={handleFormSubmit}
                onContinue={handleFormSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </TripProvider>
  );
}
