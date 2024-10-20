"use client";

import React from "react";
import Checkout from "@/components/Checkout";
import Header from "@/components/Header";

export default function CheckoutPage() {
  return (
    <div className="relative min-h-screen">
      <Header
          headerSize={"small"}
          backgroundImage={true}
          logoColour={"black"}
          displayProfilePicture={false}
      />
      <Checkout />
    </div>
  );
}
