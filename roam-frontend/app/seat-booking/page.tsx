"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SeatBooking from "@/components/SeatBooking";
import { useAuthStore } from "@/context/AuthContext";
import { useTripStore } from "@/context/TripContext";
import { useLoaderStore } from "@/context/LoaderContext";

export default function CheckoutPage() {
  const { tripData } = useTripStore();
  const { setBadAccessPopup } = useAuthStore();
  const [showSeatBooking, setShowSeatBooking] = useState(false);
  const { showLoader, hideLoader } = useLoaderStore();
  const router = useRouter();

  useEffect(() => {
    const delayTimer = setTimeout(() => setShowSeatBooking(true), 800);

    if (tripData && tripData.trip_booking_active === false) {
      setBadAccessPopup(true);
      router.replace("/home");
      clearTimeout(delayTimer);
    }

    return () => clearTimeout(delayTimer);
  }, [tripData, router]);

  return <>{showSeatBooking && <SeatBooking />}</>;
}
