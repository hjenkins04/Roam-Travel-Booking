"use client";

import { FC, ReactNode } from "react";
import Image from 'next/image';

interface SearchItemProps {
    leftIcon: string;
    airline: string;
    tripLength: string;
    departureTime: string;
    arrivalTime: string;
    numStops: string;
    stopInfo: string;
    price: string;
    tripType: string;
    size?: string;
    className?: string;
    onClick: () => void;
}

const SearchItem: FC<SearchItemProps> = ({
    leftIcon,
    airline,
    tripLength,
    departureTime,
    arrivalTime,
    numStops,
    stopInfo,
    price,
    tripType,
    size = "w-[200px]",
    className = "",
    onClick,

}) => {
    return (
        <button
            className="flex items-center justify-between w-[1000px] p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition-all"
            onClick={onClick}
        >
            {/* Left Side */}
            <div className="flex items-center">
                <Image src={leftIcon} alt="Left Icon" width={36} height={36} className="mr-2" />
                <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500">{tripLength}</span>
                    <span className="text-sm text-gray-500">{airline}</span>
                </div>
            </div>

            {/* Left Middle Section */}
            <div className="flex flex-col items-start">
                <div className="flex items-center">
                    <span className="text-md  text-gray-500 font-semibold">{departureTime}</span>
                    <span className="mx-2"> - </span>
                    <span className="text-md  text-gray-500 font-semibold">{arrivalTime}</span>
                </div>
            </div>

            {/* Right Middle Section */}
            <div className="flex flex-col items-start">
                <div className="flex items-center">
                    <span className="text-sm text-gray-500">{numStops}</span>
                </div>
                <span className="text-sm text-gray-500">{stopInfo}</span>
            </div>
            {/* Right Side */}
            <div className="flex flex-col items-end">
                <span className="text-lg  text-gray-500 font-semibold">{price}</span>
                <span className="text-sm text-gray-500">{tripType}</span>
            </div>
        </button >
    );
};

export default SearchItem;