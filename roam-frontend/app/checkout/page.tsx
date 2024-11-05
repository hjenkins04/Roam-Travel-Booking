"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Checkout from "@/components/Checkout";
import Header from "@/components/Header";
import LoaderPopup from "@/components/LoaderPopup";
import { useAuthStore } from "@/context/AuthContext";
import { useTripStore } from "@/context/TripContext";

export default function CheckoutPage() {
  const { tripData } = useTripStore();
  const { setBadAccessPopup } = useAuthStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delayTimer = setTimeout(() => setShowCheckout(true), 800);

    if (tripData && tripData.trip_booking_active === false) {
      setBadAccessPopup(true);
      router.replace("/home");
      clearTimeout(delayTimer);
    }

    return () => clearTimeout(delayTimer);
  }, [tripData, router, setBadAccessPopup]);

  if (!showCheckout) {
    return <LoaderPopup isOpen={true} />;
  }

  return (
    <div className="relative min-h-screen">
      <Header
        headerSize="small"
        backgroundImage
        logoColour="black"
        displayProfilePicture
      />
      <Checkout />
    </div>
  );
}
