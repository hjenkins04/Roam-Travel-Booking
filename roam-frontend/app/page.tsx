"use client";

import React, { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import LandingPageBackground from "@/components/Backgrounds/LandingPageBackground";
import LandingPageText from "@/components/Text/LandingPageText";
import Footer from "@/components/Footer";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useDestinationsStore } from "@/context/DestinationContext";
import { useAuthStore } from "@/context/AuthContext";
import { useLoaderStore } from "@/context/LoaderContext";
import SearchBoxSkeletonLoader from "@/components/SearchBoxSkeletonLoader";
import { fetchAirports } from "@/api/FetchAirports";
import { Airport } from "@/models";

const TrendingLocationsHomeGrid = dynamic(
  () => import("@/components/TrendingLocationsHomeGrid"),
  { ssr: false }
);

export default function HomePage() {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const { authData, setShowPleaseSignInPopup, setBadAccessPopup } =
    useAuthStore();
  const { hideLoader } = useLoaderStore();
  const { popularDestinations, refreshDestinations } = useDestinationsStore();

  const [fieldPopupOpen, setFieldPopupOpen] = useState(false);
  const [fieldName, setFieldName] = useState("Field Name");

  const closeSignInPopup = () => {
    setShowPleaseSignInPopup(false);
  };

  const showRequiredFieldPopup = (name: string) => {
    setFieldName(name);
    setFieldPopupOpen(true);
  };

  useEffect(() => {
    hideLoader();
    // Fetch airports on load
    fetchAirports()
      .then((data: Airport[]) => {
        setAirports(data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error("Error fetching airports:", error);
        setLoading(false);
      });

    refreshDestinations();
  }, [refreshDestinations, hideLoader]);

  return (
    <>
      <div className="relative min-h-screen">
        {/* Background SVG */}
        <div className="absolute inset-0">
          <LandingPageBackground />
        </div>

        <Header
          headerSize="small"
          backgroundImage={false}
          logoColour={"black"}
          displayProfilePicture={true}
        />

        <main className="relative z-10 px-4 py-8 flex flex-col items-center">
          <div className="grid grid-cols-5 gap-4 items-center">
            {/* Left 2 Columns: Text */}
            <div className="col-span-2 whitespace-nowrap xl:ml-24">
              <LandingPageText />
            </div>
          </div>

          {/* Search Box (Center Overlap with Background) */}
          <div
            className="relative w-full max-w-6xl z-10 -top-14 py-10"
            style={{ paddingTop: "calc(50vh - 150px)" }}
          >
            <Suspense fallback={<SearchBoxSkeletonLoader />}>
              {!loading ? (
                <SearchBox
                  airports={airports}
                  showRequiredFieldPopup={showRequiredFieldPopup}
                />
              ) : (
                <SearchBoxSkeletonLoader />
              )}
            </Suspense>
          </div>
        </main>

        {/* Trending Locations Grid wrapped with DestinationsProvider */}
        <TrendingLocationsHomeGrid destinations={popularDestinations} />
      </div>

      {/* Footer */}
      <Footer />

      {/* Login or Signup Popup */}
      <Dialog open={authData.showPleaseSignInPopup} onOpenChange={closeSignInPopup}>
        <DialogContent>
          <div className="flex justify-center mb-4" data-testid="please-sign-in-popup">
            <AlertTriangle size={48} className="text-orange-500" />
          </div>
          <DialogTitle>Please Login or Signup</DialogTitle>
          <DialogDescription>
            You need to log in or sign up to access this feature.
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={closeSignInPopup}
              className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Field Required Popup */}
      <Dialog open={fieldPopupOpen} onOpenChange={setFieldPopupOpen}>
        <DialogContent>
          <div className="flex justify-center mb-4"  data-testid="required-fields-popup">
            <AlertTriangle size={48} className="text-orange-500" />
          </div>
          <DialogTitle>Complete Required Field</DialogTitle>
          <DialogDescription>
            Please complete the &quot;{fieldName}&quot; field before continuing.
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={() => setFieldPopupOpen(false)}
              className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unable to Access Popup */}
      <Dialog open={authData.showBadAccessPopup} onOpenChange={() => setBadAccessPopup(false)}>
        <DialogContent>
          <div className="flex justify-center mb-4" data-testid="bad-access-popup">
            <AlertTriangle size={48} className="text-orange-500" />
          </div>
          <DialogTitle>Unable to Access</DialogTitle>
          <DialogDescription>
            Unable to access this feature right now...
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={() => setBadAccessPopup(false)}
              className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
