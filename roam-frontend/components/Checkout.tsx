"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PurchaseItem from "@/components/PurchaseItem";
import PaymentForm from "@/components/PaymentForm";
import PaymentSummaryCard from "@/components/PaymentSummaryCard";
import LoaderPopup from "@/components/LoaderPopup";
import LoaderSuccessFailPopup from "@/components/LoaderSuccessFailPopup";
import { DisplayPurchase, mapTripToPurchase } from "@/models";
import { FetchBookingCheckout } from "@/api/FetchBookingCheckout";


import { useTripContext } from "@/context/TripContext";

const Checkout: React.FC = () => {
  const { tripData } = useTripContext();
  const [purchase, setPurchase] = useState<DisplayPurchase | null>(null);
  const [loading, setLoading] = useState(true);


  const [successLoader, setSuccessLoading] = useState(false);
  const [successLoaderState, setSuccessLoaderState] = useState<"loading" | "success" | "fail">("loading");
  const [successLoaderShowButton, setSuccessLoaderShowButton] = useState(false);
  const [successLoaderButtonLabel, setSuccessLoaderButtonLabel] = useState("Home");

  const router = useRouter();


  useEffect(() => {
    if (tripData.trip) {
        setLoading(true);
        setPurchase(mapTripToPurchase(tripData.trip));
        setLoading(false);
    }
  }, [tripData.trip]);

  const redirectToHome =() => {
    router.push("/home");
  }


  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessLoading(true);
    setSuccessLoaderState("loading");
  
    try {
      await FetchBookingCheckout(tripData.trip);
      setSuccessLoaderShowButton(true);
      setSuccessLoaderState("success");
      setSuccessLoaderShowButton(true)
    } catch (error) {
      console.error("Submission failed:", error);
      setSuccessLoaderShowButton(true);
      setSuccessLoaderState("fail");
      setSuccessLoaderShowButton(true)
    }
  };

  return (
    <>
      <LoaderPopup isOpen={loading} />
      <LoaderSuccessFailPopup
        isOpen={successLoader}
        status={successLoaderState}
        showButton={successLoaderShowButton}
        buttonLabel={successLoaderButtonLabel}
        onButtonClick={() => redirectToHome()}
      />
      <div className="relative min-h-screen">
        {purchase && (
          <main className="mt-10 w-full">
            <div className="flex flex-row gap-6 justify-center">
              {/* Left column: Passenger and flight details */}
              <section className="flex-1 flex flex-col space-y-4">
                <div className="bg-white p-6 mx-auto w-full max-w-4xl">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    {purchase.title}
                  </h2>
                  <div className="overflow-y-auto max-h-96 hide-scrollbar">
                    {purchase.passengers.map((passenger, index) => (
                      <div key={index} className="mb-6">
                        <h3 className="text-lg font-medium text-gray-600 mb-2">{passenger.name}</h3>
                        <PurchaseItem
                          ban={false}
                          purchasePassenger={passenger}
                          onCancelClick={() => {}}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 mx-auto w-full max-w-4xl">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Complete Booking Payment
                  </h2>
                  <PaymentForm onSubmit={handleFormSubmit} />
                </div>
              </section>
              {/* Right column: Payment summary */}
              <section className="w-1/3 sticky top-24">
                <PaymentSummaryCard
                  purchase={purchase}
                  subtotal={purchase.subtotal}
                  taxes={purchase.taxes}
                  total={purchase.total_cost}
                  onSubmit={handleFormSubmit}
                />
              </section>
            </div>
          </main>
        )}
      </div>
    </>
  );
};

export default Checkout;
