"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchResultBox from "@/components/SearchResultBox";
import LandingPageBackground from "@/components/Backgrounds/TallHeaderBackground";
import FilterBox from "@/components/FilterBox";
import SearchScroll from "@/components/SearchScroll";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLoginDrawer = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const openSignupDrawer = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const closeDrawer = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  return (
    <div className="relative min-h-screen items-start">
      {/* Background SVG */}
      <div className="absolute inset-0 mt-[-80px]">
        <LandingPageBackground />
      </div>

      <Header
        headerSize={"small"}
        backgroundImage={true}
        logoColour={"orange"}
        displayProfilePicture={false}
      />

      <main className=" z-10 flex flex-col mt-[-70px] items-start pl-4">
        <div
          className=" relative w-full max-w-screen-xl z-10 py-6"
          style={{
            transform: "scale(0.75)",
            transformOrigin: "left",
            paddingTop: "60px",
          }}
        >
          <SearchResultBox />
        </div>
        <div
          className="relative w-full z-10"
          style={{
            transform: "scale(0.75)",
            transformOrigin: "left",
            marginTop: "-50px",
          }}
        >
          <FilterBox />
        </div>
        <div
          className="relative w-full h-full z-2"
          style={{ marginTop: "10px" }}
        >
          <SearchScroll />
        </div>
      </main>
    </div>
  );
}
