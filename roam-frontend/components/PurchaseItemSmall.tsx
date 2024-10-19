"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import AirlinePhoto from "./Images/AirlinePhoto";

interface FlightInfo {
  date: string;
  departure: string;
  airline: string;
  flightNumber: string;
  seat: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
  layover?: string;
}

interface PurchaseItemSmallProps {
  outboundFlight: FlightInfo;
  returnFlight?: FlightInfo | null; // Return flight can be null for one-way trips
}

const PurchaseItemSmall: React.FC<PurchaseItemSmallProps> = ({
  outboundFlight,
  returnFlight = null,
}) => {
  return (
    <div className=" p-4 mb-6">
      {/* Outbound Flight */}
      <div className="flex flex-col items-start">
        <div className="flex gap-8 items-start mt-2">
          <AirlinePhoto />
          <div className="flex flex-col text-xs">
            <p className="text-slate-800 text-base">{outboundFlight.airline}</p>
            <p className="mt-1 text-black">{outboundFlight.flightNumber}</p>
          </div>
          <div className="ml-auto text-right text-slate-800">
            <p>{outboundFlight.duration}</p>
            <p>
              {outboundFlight.departureTime} - {outboundFlight.arrivalTime}
            </p>
            {outboundFlight.layover && (
              <p className="mt-1 text-gray-500">{outboundFlight.layover}</p>
            )}
          </div>
        </div>
      </div>

      {/* Return Flight (conditional) */}
      {returnFlight && (
        <>
          <Separator className="my-4 w-2/3" />
          <div className="mt-6">
            <div className="flex flex-col items-start">
              <div className="flex gap-8 items-start mt-2">
                <AirlinePhoto />
                <div className="flex flex-col text-xs">
                  <p className="text-slate-800 text-base">
                    {outboundFlight.airline}
                  </p>
                  <p className="mt-1 text-black">
                    {outboundFlight.flightNumber}
                  </p>
                </div>
                <div className="ml-auto text-right text-slate-800">
                  <p>{outboundFlight.duration}</p>
                  <p>
                    {outboundFlight.departureTime} -{" "}
                    {outboundFlight.arrivalTime}
                  </p>
                  {outboundFlight.layover && (
                    <p className="mt-1 text-gray-500">
                      {outboundFlight.layover}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseItemSmall;
