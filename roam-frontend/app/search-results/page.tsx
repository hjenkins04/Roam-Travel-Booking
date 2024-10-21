"use client";

import React from "react";
import Header from "@/components/Header";
import SearchResultBox from "@/components/SearchResultBox";
import TallHeaderBackground from "@/components/Backgrounds/TallHeaderBackground";
import FilterBox from "@/components/FilterBox";
import SearchScroll from "@/components/SearchScroll";

export default function SearchResultsPage() {
  return (
    <div className="relative min-h-screen items-start">

      <Header
        headerSize={"small"}
        backgroundImage={true}
        logoColour={"black"}
        displayProfilePicture={false}
      />

      <main className=" z-10 flex flex-col mt-[-95px] items-start pl-4">
        <div
          className=" relative w-full max-w-screen-xl z-10 py-6"
          style={{
            transform: "scale(0.75)",
            transformOrigin: "left",
            paddingTop: "40px",
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
