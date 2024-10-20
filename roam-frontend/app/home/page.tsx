"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import LandingPageBackground from "@/components/Backgrounds/LandingPageBackground";
import LandingPageText from "@/components/Text/LandingPageText";

const TrendingLocationsHomeGrid = dynamic(
  () => import("@/components/TrendingLocationsHomeGrid"),
  { ssr: false }
);

export default function HomePage() {
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
          <SearchBox />
        </div>
      </main>

      {/* Trending Locations Grid */}
      <TrendingLocationsHomeGrid />
    </div>
  );
}
