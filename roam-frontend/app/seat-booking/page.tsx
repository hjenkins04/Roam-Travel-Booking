'use client';
import React, { useState, useRef } from "react";
import SeatBooking from "@/components/SeatBooking";
import Header from "@/components/Header";


export default function SeatBookingPage() {
  return (
    <div className="relative">
      {/* Header */}
      <Header
        headerSize="small"
        backgroundImage={true}
        logoColour={"black"}
      />
    <SeatBooking />
    </div>
  );
}
