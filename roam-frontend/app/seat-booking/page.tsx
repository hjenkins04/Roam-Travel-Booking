"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SeatBooking from "@/components/SeatBooking";
import { useAuthStore } from "@/context/AuthContext";
import { useTripStore } from "@/context/TripContext";

export default function SeatBookingPage() {
  const delay = 800;
  const { tripData } = useTripStore();
  const { setBadAccessPopup } = useAuthStore();
  const [showSeatBooking, setShowSeatBooking] = useState(false);
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const delayTimer = setTimeout(() => setShowSeatBooking(true), delay);

    if (tripData?.trip_booking_active === false) {
      setBadAccessPopup(true);
      router.replace("/");
      clearTimeout(delayTimer);
    }

    return () => clearTimeout(delayTimer);
  }, []);

  return <>{showSeatBooking && <SeatBooking />}</>;
}
