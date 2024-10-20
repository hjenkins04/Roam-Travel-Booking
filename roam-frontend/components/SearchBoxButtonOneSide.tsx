"use client";

import React, { FC, ReactNode } from "react";

interface SearchBoxButtonOneSideProps {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    headerText: string;
    mainText: string;
    subText: string;
    size?: string;
    className?: string;
    onClickLeftIcon?: () => void;
    onClickRightIcon?: () => void;
    onClickMainButton?: () => void;
}

const SearchBoxButtonOneSide: FC<SearchBoxButtonOneSideProps> = ({
    leftIcon,
    rightIcon,
    headerText,
    mainText,
    subText,
    size = "w-[200px]",
    className = "",
    onClickLeftIcon,
    onClickRightIcon,
    onClickMainButton,
}) => {
    return (
        <div
            className={`relative flex items-center justify-between bg-white rounded-2xl shadow-lg p-3 border-2 border-gray-300 ${size} ${className}`}
            style={{ minHeight: "75px" }}
        >
            {/* Header Text */}
            <div className="absolute -top-3 left-4 bg-white px-2 text-xs text-gray-600">
                {headerText}
            </div>

            {/* Content */}
            <div className="flex items-center justify-between w-full">
                {/* Left Icon */}
                {leftIcon && (
                    <div onClick={onClickLeftIcon} className="cursor-pointer">
                        {leftIcon}
                    </div>
                )}

                {/* Main Text and Sub Text */}
                <div className="flex flex-col items-center text-center w-full">
                    <span className="text-lg font-medium text-gray-800">{mainText}</span>
                    <span className="text-xs text-gray-500">{subText}</span>
                </div>

                {/* Right Icon */}
                {rightIcon && (
                    <div onClick={onClickRightIcon} className="cursor-pointer">
                        {rightIcon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBoxButtonOneSide;
