'use client'

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PurchaseItemSmall from "@/components/PurchaseItemSmall"
import { DisplayPurchase } from "@/models"
import { useTripStore } from "@/context/TripContext";

interface PaymentSummaryCardProps {
    purchase: DisplayPurchase;
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
    const { tripData } = useTripStore();

    return (
        <Card className="p-6 mt-6 lg:mt-0 lg:sticky top-20 w-full max-w-xl">
            <PurchaseItemSmall
                departingFlight={purchase.passengers[0].departing_flight}
                returnFlight={purchase.passengers[0].returning_flight}
            />

            <CardContent>
                <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>

                <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Taxes and Fees</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-2 font-bold">
                    <span className="text-gray-800">Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </CardContent>

            <CardFooter>
                <Button onClick={onSubmit} disabled={tripData.trip_purchased}
                    className={`w-full ${
                        tripData.trip_purchased
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-400 hover:bg-orange-500" 
                    }`}>
                    Confirm and Pay
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PaymentSummaryCard;
