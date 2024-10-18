'use client'

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PurchaseItemSmall from "@/components/PurchaseItemSmall"

interface PurchaseItem {
    outboundFlight: FlightInfo;
    returnFlight?: FlightInfo | null;
}

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


interface PaymentSummaryCardProps {
    purchase: PurchaseItem;
    subtotal: number;
    taxes: number;
    total: number;
    onSubmit: (event: React.FormEvent) => void;
}

const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
    purchase,
    subtotal,
    taxes,
    total,
    onSubmit,
}) => {
    return (
        <Card className="p-6 mt-6 lg:mt-0 lg:sticky top-20 w-full max-w-xl">
            <PurchaseItemSmall
                outboundFlight={purchase.outboundFlight}
                returnFlight={purchase.returnFlight}
            />

            <CardContent>
                <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>

                <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span>${subtotal}</span>
                </div>

                <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Taxes and Fees</span>
                    <span>${taxes}</span>
                </div>

                <div className="flex justify-between mb-2 font-bold">
                    <span className="text-gray-800">Total</span>
                    <span>${total}</span>
                </div>
            </CardContent>

            <CardFooter>
                <Button onClick={onSubmit} className="w-full bg-orange-400 hover:bg-orange-500">
                    Confirm and Pay
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PaymentSummaryCard;
