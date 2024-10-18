'use client'


import React from "react";
import { Separator } from "@/components/ui/separator"

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
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/47154ef659dd968075223e67363fb44c6d051fe030370f4062cd21cc5bd1ef89?placeholderIfAbsent=true&apiKey=7a7173da98bb425ca4236bb2160d9309"
                        className="object-contain w-10"
                        alt="Airline logo"
                    />
                    <div className="flex flex-col text-xs">
                        <p className="text-slate-800 text-base">{outboundFlight.airline}</p>
                        <p className="mt-1 text-black">{outboundFlight.flightNumber}</p>
                    </div>
                    <div className="ml-auto text-right text-slate-800">
                        <p>{outboundFlight.duration}</p>
                        <p>{outboundFlight.departureTime} - {outboundFlight.arrivalTime}</p>
                        {outboundFlight.layover && <p className="mt-1 text-gray-500">{outboundFlight.layover}</p>}
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
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/47154ef659dd968075223e67363fb44c6d051fe030370f4062cd21cc5bd1ef89?placeholderIfAbsent=true&apiKey=7a7173da98bb425ca4236bb2160d9309"
                                    className="object-contain w-10"
                                    alt="Airline logo"
                                />
                                <div className="flex flex-col text-xs">
                                    <p className="text-slate-800 text-base">{outboundFlight.airline}</p>
                                    <p className="mt-1 text-black">{outboundFlight.flightNumber}</p>
                                </div>
                                <div className="ml-auto text-right text-slate-800">
                                    <p>{outboundFlight.duration}</p>
                                    <p>{outboundFlight.departureTime} - {outboundFlight.arrivalTime}</p>
                                    {outboundFlight.layover && <p className="mt-1 text-gray-500">{outboundFlight.layover}</p>}
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
