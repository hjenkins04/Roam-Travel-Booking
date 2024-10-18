'use client'
import React from "react";
import PurchaseItemSmall from "@/components/PurchaseItemSmall";
import PurchaseItem from "@/components/PurchaseItem";
import Header from "./Header";
import PaymentForm from "@/components/PaymentForm";
import PaymentSummaryCard from "@/components/PaymentSummaryCard";

const Checkout: React.FC = () => {
    const purchase = {
        title: "Round Trip - Toronto to Honolulu February 2024",
        outboundFlight: {
            date: "February 25th, 2021",
            departure: "YYZ",
            airline: "Hawaiian Airlines",
            flightNumber: "FIG4305",
            seat: "Seat 4F (business, window)",
            duration: "13h 45m (+1d)",
            departureTime: "7:00 AM",
            arrivalTime: "4:15 PM",
            layover: "2h 45m in LAX",
        },
        returnFlight: {
            date: "March 21st, 2021",
            departure: "HNL",
            airline: "Hawaiian Airlines",
            flightNumber: "FIG4312",
            seat: "Seat 9F (economy, window)",
            duration: "13h 45m (+1d)",
            departureTime: "7:00 AM",
            arrivalTime: "4:15 PM",
            layover: "2h 45m in LAX",
        },
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Form submitted");
        // Add your form submission logic here
    };

    return (
        <>
            <div className="relative min-h-screen">
                <Header
                    headerSize={"small"}
                    backgroundImage={true}
                    logoColour={"black"}
                    displayProfilePicture={false}
                />
                <main className="mt-10 w-full">
                    <div className="flex flex-row gap-6 justify-center">
                        {/* Left column: Booking details and form */}
                        <section className="flex-1 flex flex-col space-y-4">
                            <div className="bg-white p-6 mx-auto w-full max-w-4xl">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                    {purchase.title}
                                </h2>
                                <PurchaseItem {...purchase} onCancelClick={() => console.log("click")} />
                            </div>

                            <div className="bg-white p-6 mx-auto w-full max-w-4xl">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">Complete Booking Payment</h2>
                                <PaymentForm onSubmit={handleFormSubmit} />
                            </div>
                        </section>

                        {/* Right column: Checkout summary */}
                        <section className="w-1/3 sticky top-24 ">
                            <PaymentSummaryCard purchase={purchase} subtotal={702} taxes={66} total={768} onSubmit={handleFormSubmit} />
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Checkout;
