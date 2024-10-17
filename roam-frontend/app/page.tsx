"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import LandingHeader from "@/components/LandingHeader";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import Underline from "@/components/Effects/TextUnderline";
import LandingPageBackground from "@/components/Backgrounds/LandingPageBackground";
import LandingPageText from "@/components/Text/LandingPageText";

const TrendingLocationsHomeGrid = dynamic(
  () => import("@/components/TrendingLocationsHomeGrid"),
  { ssr: false }
);
const LoginSignupPopout = dynamic(
  () => import("@/components/LoginSignupPopout"),
  { ssr: false }
);
const ProfilePage = dynamic(() => import("@/components/ProfilePage"), {
  ssr: false,
});

export default function Home() {
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);
  const [popoutMode, setPopoutMode] = useState<"login" | "signup">("login");

  const openLoginDrawer = () => {
    setIsPopoutOpen(true);
    setPopoutMode("login");
  };

  const openSignupDrawer = () => {
    setIsPopoutOpen(true);
    setPopoutMode("signup");
  };

  const closeDrawer = () => {
    setIsPopoutOpen(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background SVG */}
      <div className="absolute inset-0">
        <LandingPageBackground />
      </div>

      <LandingHeader
        openLoginDrawer={openLoginDrawer}
        openSignupDrawer={openSignupDrawer}
        logoColour={"black"}        
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

      {/* Footer */}

      <LoginSignupPopout
        isOpen={isPopoutOpen}
        mode={popoutMode}
        closeDrawer={closeDrawer}
        setPopoutMode={setPopoutMode}
      />
    </div>
  );
}
