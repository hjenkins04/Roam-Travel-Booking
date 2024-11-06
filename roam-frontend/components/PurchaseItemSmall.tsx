"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import AirlinePhoto from "./Images/AirlinePhoto";
import { Flight, getFlightIdString, formatTimeMinutes, getLayoverSummary } from "@/models";

interface PurchaseItemSmallProps {
  departingFlight: Flight | null;
  returnFlight?: Flight | null;
}

const PurchaseItemSmall: React.FC<PurchaseItemSmallProps> = ({
  departingFlight,
  returnFlight = null,
}) => {
  return (
    <div className="p-4 mb-6">
      {/* Departing Flight */}
      {departingFlight && (
        <div className="flex flex-col items-start">
          <div className="flex gap-8 items-start mt-2">
            <AirlinePhoto imagePath={departingFlight.airline.logo_path} />
            <div className="flex flex-col text-xs">
              <p className="text-slate-800 text-base">{departingFlight.airline.name}</p>
              <p className="mt-1 text-black">{getFlightIdString(departingFlight)}</p>
            </div>
            <div className="ml-auto text-right text-slate-800">
              <p>{formatTimeMinutes(departingFlight.flight_time_minutes)}</p>
              <p>
                {departingFlight.departure_time} - {departingFlight.arrival_time}
              </p>
              {departingFlight.layover && (
                <p className="mt-1 text-gray-500">{getLayoverSummary(departingFlight)}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Return Flight */}
      {returnFlight && (
        <>
          <Separator className="my-4 w-2/3" />
          <div className="mt-6">
            <div className="flex flex-col items-start">
              <div className="flex gap-8 items-start mt-2">
                <AirlinePhoto imagePath={returnFlight.airline.logo_path} />
                <div className="flex flex-col text-xs">
                  <p className="text-slate-800 text-base">{returnFlight.airline.name}</p>
                  <p className="mt-1 text-black">{getFlightIdString(returnFlight)}</p>
                </div>
                <div className="ml-auto text-right text-slate-800">
                  <p>{formatTimeMinutes(returnFlight.flight_time_minutes)}</p>
                  <p>
                    {returnFlight.departure_time} - {returnFlight.arrival_time}
                  </p>
                  {returnFlight.layover && (
                    <p className="mt-1 text-gray-500">{getLayoverSummary(returnFlight)}</p>
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
