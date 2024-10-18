"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import LandingHeader from "@/components/Header";
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
        <div className="relative min-h-screen items-start">
            {/* Background SVG */}
            <div className="absolute inset-0 mt-[-80px]">
                <LandingPageBackground />
            </div>

            <LandingHeader
                openLoginDrawer={openLoginDrawer}
                openSignupDrawer={openSignupDrawer}
                logoColour="orange"
            />

            <main className=" z-10 flex flex-col mt-[-70px] items-start pl-4">
                <div
                    className=" relative w-full max-w-screen-xl z-10 py-6"
                    style={{ transform: 'scale(0.75)', transformOrigin: 'left', paddingTop: "60px" }}
                >
                    <SearchResultBox />
                </div>
                <div
                    className="relative w-full z-10"
                    style={{ transform: 'scale(0.75)', transformOrigin: 'left', marginTop: "-50px" }}
                >
                    <FilterBox />
                </div>
                <div className="relative w-full h-full z-2"
                    style={{ marginTop: "10px" }} >
                    <SearchScroll />
                </div>
            </main>
            <LoginSignupPopout
                isLoginOpen={isLoginOpen}
                isSignupOpen={isSignupOpen}
                closeDrawer={closeDrawer}
            />
        </div >
    );
}
