'use client';
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Airplane from "@/components/SeatSelection/Airplane";
import BookingForm from "@/components/SeatBookingForm";
import Header from "@/components/Header";
import SeatBookingFormFooter from "@/components/SeatBookingFormFooter";

const LoginSignupPopout = dynamic(() => import("@/components/LoginSignupPopout"), { ssr: false });
const ProfilePage = dynamic(() => import("@/components/ProfilePage"), { ssr: false });

export default function SeatBookingPage() {
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);
  const [popoutMode, setPopoutMode] = useState<"login" | "signup">("login");

  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const [passengerName, setPassengerName] = useState<string>("");
  const [groupSize, setGroupSize] = useState<number>(1);
  const [isRoundTrip, setRoundTrip] = useState<boolean>(true);
  const [isFirstFlight, setIsFirstFlight] = useState<boolean>(true);
  const [passengerIndex, setPassengerIndex] = useState<number>(0)

  // Reference to the form element
  const formRef = useRef<HTMLFormElement | null>(null);

  const openLoginDrawer = () => {
    setIsPopoutOpen(true);
    setPopoutMode("login");
  };

  const openSignupDrawer = () => {
    setIsPopoutOpen(true);
    setPopoutMode("signup");
  };

  const closeDrawer = () => {
    setIsPopoutOpen(false);
  };

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
    <div className="relative">
      {/* Header */}
      <Header
        openLoginDrawer={openLoginDrawer}
        openSignupDrawer={openSignupDrawer}
        headerSize="small"
        backgroundImage={true}
        logoColour={"black"}
      />

      <div className="relative flex overflow-hidden z-20 bg-neutral-50" style={{ height: 'calc(100vh - 150px)'}}>
        {/* Airplane Component */}
        <div
          className={`relative transition-all duration-300 ease-in-out overflow-hidden ${
            selectedSeat ? "w-2/4" : "w-full"
          }`}
          style={{ height: "100%", overflow: "hidden" }}
        >
          <div className="relative w-full h-full cursor-grab active:cursor-grabbing">
            <Airplane onSeatClick={handleSeatClick} />
          </div>
        </div>

        {/* Booking Form */}
        {selectedSeat && (
          <div className="absolute right-0 w-2/4 h-full bg-white shadow-lg transition-opacity duration-300 ease-in-out opacity-100 flex flex-col justify-between">
            <div className="p-8 flex-1 overflow-auto">
              <BookingForm
                groupSize={groupSize}
                namePlaceHolder={passengerName}
                seatNumber={selectedSeat}
                setPassengerName={setPassengerName}
                formRef={formRef}
              />
            </div>

            {/* Booking Form Footer */}
            <div className="bg-gray-200 p-4">
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

      <LoginSignupPopout
        isOpen={isPopoutOpen}
        mode={popoutMode}
        closeDrawer={closeDrawer}
        setPopoutMode={setPopoutMode}
      />
    </div>
  );
}
