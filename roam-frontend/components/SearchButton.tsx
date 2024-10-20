"use client";

import React, { FC } from "react";

interface SearchButtonProps {
    mainText: string;
    className?: string;
    customTextColour?: string;
    onClick?: () => void;
}

const SearchButton: FC<SearchButtonProps> = ({
    mainText,
    className = "",
    customTextColour = 'text-white',
    onClick,

}) => {
    return (
        <div
            className={`relative flex items-center justify-center bg-[#FF9A2A] rounded-md shadow-md p-3 border border-[#FF9A2A] ${className}`}
            style={{ minHeight: "40px", cursor: "pointer" }}
            onClick={onClick}
        >
            {/* Main Text */}
            <span className={`text-md font-medium ${customTextColour}`}>
                {mainText}
            </span>
        </div>
    );
};

export default SearchButton;