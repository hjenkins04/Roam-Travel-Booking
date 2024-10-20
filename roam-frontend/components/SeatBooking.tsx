'use client';
import React, { useState, useRef } from "react";
import Airplane from "@/components/SeatSelection/Airplane";
import BookingForm from "@/components/SeatBookingForm";
import SeatBookingFormFooter from "@/components/SeatBookingFormFooter";


export default function SeatBooking() {

  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const [passengerName, setPassengerName] = useState<string>("");
  const [groupSize] = useState<number>(1);
  const [isRoundTrip] = useState<boolean>(true);
  const [isFirstFlight, setIsFirstFlight] = useState<boolean>(true);
  const [passengerIndex, setPassengerIndex] = useState<number>(0)

  // Reference to the form element
  const formRef = useRef<HTMLFormElement | null>(null);


  const handleSeatClick = (seatNumber: number) => {
    if (seatNumber === selectedSeat) {
      setSelectedSeat(null);
      return;
    }
    setSelectedSeat(seatNumber);
  };

  // Handle form submission from the footer
  const handleFormSubmit = () => {
    // First Flight Completed
    if( passengerIndex == groupSize - 1 && isRoundTrip && isFirstFlight){
      setPassengerIndex(0)
      setIsFirstFlight(false)
      setPassengerName("")
    }
    // Passange Completed
    if ( passengerIndex != groupSize - 1){
      setPassengerIndex(passengerIndex + 1)
      setPassengerName("")
    }

    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
      <div className="relative flex overflow-hidden z-20 bg-neutral-50" style={{ height: 'calc(100vh - 150px)'}}>
        {/* Airplane Component */}
        <div
          className={`relative transition-all duration-300 ease-in-out overflow-hidden ${
            selectedSeat ? "w-2/4" : "w-full"
          }`}
          style={{ height: "100%", overflow: "hidden" }}
          data-testid={"airplane-column"}
        >
          <div className="relative w-full h-full cursor-grab active:cursor-grabbing" data-testid={"airplane-svg"}>
            <Airplane onSeatClick={handleSeatClick} />
          </div>
        </div>

        {/* Booking Form */}
        {selectedSeat && (
          <div className="absolute right-0 w-4/7 h-full bg-white shadow-lg transition-opacity duration-300 ease-in-out opacity-100 flex flex-col justify-between" data-testid={"booking-form-column"}>
            <div className="p-8 flex-1 overflow-auto" data-testid={"booking-form"}>
              <BookingForm
                groupSize={groupSize}
                namePlaceHolder={passengerName}
                seatNumber={selectedSeat}
                setPassengerName={setPassengerName}
                formRef={formRef}
              />
            </div>

            {/* Booking Form Footer */}
            <div className="bg-gray-200 p-4" data-testid={"booking-form-footer"}>
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
          </div>
        )}
      </div>
  );
}
