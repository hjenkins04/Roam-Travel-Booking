"use client";

import React, { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import LandingPageBackground from "@/components/Backgrounds/LandingPageBackground";
import LandingPageText from "@/components/Text/LandingPageText";
import Footer from "@/components/Footer";

import { useDestinationsStore } from "@/context/DestinationContext";

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

  const { popularDestinations, refreshDestinations } = useDestinationsStore();

  useEffect(() => {
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
  }, [refreshDestinations]);

  return (
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
              <SearchBox airports={airports} />
            ) : (
              <SearchBoxSkeletonLoader />
            )}
          </Suspense>
        </div>
      </main>

      {/* Trending Locations Grid wrapped with DestinationsProvider */}
      <TrendingLocationsHomeGrid destinations={popularDestinations} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
