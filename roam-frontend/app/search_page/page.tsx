"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import LandingHeader from "@/components/LandingHeader";
import SearchResultBox from "@/components/SearchResultBox";
import LandingPageBackground from "@/components/Backgrounds/TallHeaderBackground";
import FilterBox from "@/components/FilterBox";
import SearchItem from "@/components/SearchItem";
import SearchScroll from "@/components/SearchScroll";
import { ChevronDown } from "lucide-react";

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
        <div className="relative min-h-screen">
            {/* Background SVG */}
            <div className="absolute inset-0 mt-[-50px]">
                <LandingPageBackground />
            </div>

            <LandingHeader
                openLoginDrawer={openLoginDrawer}
                openSignupDrawer={openSignupDrawer}
                logoColour="orange"
            />

            <main className="transform scale-75 translate-x-[-10%] z-10 flex flex-col mt-[-70px]">
                <div
                    className=" relative w-full z-10 py-6"
                >
                    <SearchResultBox />
                </div>
                <div
                    className="relative w-full z-10"
                    style={{ marginTop: "-10px" }}
                >
                    <FilterBox />
                </div>
                <div className="relative w-full z-2"
                    style={{ marginTop: "10px" }} >
                    <SearchScroll />
                </div>
            </main>
            <LoginSignupPopout
                isLoginOpen={isLoginOpen}
                isSignupOpen={isSignupOpen}
                closeDrawer={closeDrawer}
            />
        </div>
    );
}
