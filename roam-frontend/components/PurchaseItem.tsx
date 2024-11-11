"use client";

import React from "react";
import { Ban } from "lucide-react";
import AirlinePhoto from "@/components/Images/AirlinePhoto";
import { format } from "date-fns";

import {
  DisplayPurchasePassenger,
  getFlightIdString,
  getLayoverSummary,
  formatTimeMinutes,
} from "@/models";

interface PurchaseItemProps {
  ban?: boolean;
  purchasePassenger: DisplayPurchasePassenger | null;
  onCancelClick: () => void;
}

// Main component for displaying a purchased trip item
const PurchaseItem: React.FC<PurchaseItemProps> = ({
  ban = true,
  purchasePassenger,
  onCancelClick,
}) => {
  return (
    <section className="relative flex flex-col justify-center p-6 mt-4 bg-white rounded-lg border border-gray-200 max-md:mt-2 max-md:max-w-full">
      {/* Render cancel icon if ban prop is true */}
      {ban && (
        <Ban
          data-testid="cancel-icon"
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer"
          onClick={onCancelClick}
        />
      )}
      {/* Container for outbound and return flight details */}
      <div className="flex gap-6 mt-4 max-md:flex-col">
        {purchasePassenger && (
          <DepartureFlightDetails purchasePassenger={purchasePassenger} />
        )}

        {/* Only show return flight if returningFlight is not null */}
        {purchasePassenger?.returning_flight && (
          <ReturnFlightDetails purchasePassenger={purchasePassenger} />
        )}
      </div>
    </section>
  );
};

// Component for displaying departure flight details
const DepartureFlightDetails: React.FC<{
  purchasePassenger?: DisplayPurchasePassenger;
}> = ({ purchasePassenger }) => {
  const {
    departing_flight: departingFlight = null,
    departure_date: departureDate = null,
    departure_seat: departureSeat = null,
  } = purchasePassenger || {};
  const formattedDepartureDate = departureDate
    ? format(new Date(departureDate), "MMMM do, yyyy")
    : "Date not available";

  if (!departingFlight) return null;

  return (
    <div className="flex flex-col max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow max-md:max-w-full">
        <div className="flex flex-col items-start pr-6 pl-6 w-full max-md:px-5 max-md:max-w-full">
          {/* Flight date and departure information */}
          <time className="text-lg font-semibold text-slate-500">
            {formattedDepartureDate}
          </time>
          <p className="text-base text-black">
            Departing {departingFlight.departure_airport.iata_code}
          </p>
          {/* Flight details container */}
          <div className="flex gap-2 items-start self-stretch mt-2 max-md:ml-2">
            <AirlinePhoto
              imagePath={departingFlight.airline.logo_path}
              testid="departure-flight-airline-logo"
            />
            {/* Airline, flight number, and seat information */}
            <div className="flex flex-col self-stretch text-xs">
              <div className="flex flex-col text-base min-h-[48px]">
                <p className="text-slate-800">{departingFlight.airline.name}</p>
                <p className="mt-1 text-black">
                  {getFlightIdString(departingFlight)}
                </p>
              </div>
              <p className="text-black max-md:mr-2.5">
                {departureSeat ? departureSeat : "No seat assigned"}
              </p>
              <p className="self-start text-black">
                {departingFlight.baggage_allowance}
              </p>
            </div>
            {/* Flight duration, times, and layover information */}
            <div className="flex flex-col text-base text-right min-h-[74px] text-slate-800">
              <p>{formatTimeMinutes(departingFlight.flight_time_minutes)}</p>
              <p className="mt-1">
                {departingFlight.departure_time} -{" "}
                {departingFlight.arrival_time}
              </p>
              {departingFlight.layover && (
                <p className="mt-1 text-black">
                  {getLayoverSummary(departingFlight)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for displaying return flight details
const ReturnFlightDetails: React.FC<{
  purchasePassenger?: DisplayPurchasePassenger;
}> = ({ purchasePassenger }) => {
  const {
    returning_flight: returningFlight = null,
    return_date: returnDate = null,
    return_seat: returnSeat = null,
  } = purchasePassenger || {};
  const formattedReturnDate = returnDate
    ? format(new Date(returnDate), "MMMM do, yyyy")
    : "Date not available";

  if (!returningFlight) return null;

  return (
    <div className="flex flex-col max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow max-md:max-w-full">
        <div className="flex flex-col items-start pr-6 pl-6 w-full max-md:px-5 max-md:max-w-full">
          {/* Flight date and departure information */}
          <time className="text-lg font-semibold text-slate-500">
            {formattedReturnDate}
          </time>
          <p
            className="text-base text-black"
            data-testid="return-flight-departure"
          >
            Departing {returningFlight.departure_airport.iata_code}
          </p>
          {/* Flight details container */}
          <div className="flex gap-2 items-start self-stretch mt-2 max-md:ml-2">
            <AirlinePhoto
              imagePath={returningFlight.airline.logo_path}
              testid="return-flight-airline-logo"
            />
            {/* Airline, flight number, and seat information */}
            <div className="flex flex-col self-stretch text-xs">
              <div className="flex flex-col text-base min-h-[48px]">
                <p className="text-slate-800">{returningFlight.airline.name}</p>
                <p className="mt-1 text-black">
                  {getFlightIdString(returningFlight)}
                </p>
              </div>
              <p className="text-black max-md:mr-2.5">
                {returnSeat ? returnSeat : "No seat assigned"}
              </p>
              <p className="self-start text-black">
                {returningFlight.baggage_allowance}
              </p>
            </div>
            {/* Flight duration, times, and layover information */}
            <div className="flex flex-col text-base text-right min-h-[74px] text-slate-800">
              <p>{formatTimeMinutes(returningFlight.flight_time_minutes)}</p>
              <p className="mt-1">
                {returningFlight.departure_time} -{" "}
                {returningFlight.arrival_time}
              </p>
              {returningFlight.layover && (
                <p className="mt-1 text-black">
                  {getLayoverSummary(returningFlight)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseItem;
