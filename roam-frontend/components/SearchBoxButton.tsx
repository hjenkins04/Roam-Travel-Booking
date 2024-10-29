"use client";

import React, { forwardRef, ReactNode } from "react";

interface SearchBoxButtonProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  headerText: string;
  mainTextLeft?: string;
  subTextLeft?: string;
  mainTextRight?: string;
  subTextRight?: string;
  size?: string;
  className?: string;
  onClickLeftIcon?: () => void;
  onClickRightIcon?: () => void;
  onClickMainButton?: () => void;
}

const SearchBoxButton = forwardRef<HTMLDivElement, SearchBoxButtonProps>(
  (
    {
      leftIcon,
      rightIcon,
      headerText,
      mainTextLeft,
      subTextLeft,
      mainTextRight,
      subTextRight,
      size = "w-[200px]",
      className = "",
      onClickLeftIcon,
      onClickRightIcon,
    },
    ref // Add the ref parameter here
  ) => {
    return (
      <div
        ref={ref} // Attach ref here
        className={`relative flex items-center justify-between bg-white rounded-2xl shadow-lg p-3 border-2 border-gray-300 ${size} ${className}`}
        style={{ minHeight: "75px" }}
      >
        {/* Header Text */}
        <div className="absolute -top-3 left-4 bg-white px-2 text-xs text-gray-600">
          {headerText}
        </div>

        {/* Left Side */}
        <div className="flex items-center space-x-2">
          <div onClick={onClickLeftIcon} className="cursor-pointer">
            {leftIcon}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-lg font-medium text-gray-800 text-left">
              {mainTextLeft}
            </span>
            <span className="text-xs text-gray-500 text-left">
              {subTextLeft}
            </span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-8 border-l border-dotted border-gray-300 mx-2"></div>

        {/* Right Side */}
        <div className="flex items-center space-x-2">
          <div
            className="flex flex-col text-right"
            style={{ maxWidth: "100px" }}
          >
            {" "}
            {/* Add maxWidth */}
            <span className="text-lg font-medium text-gray-800 text-left">
              {mainTextRight}
            </span>
            <span
              className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ maxWidth: "100px" }}
            >
              {" "}
              {/* Set maxWidth for truncation */}
              {subTextRight}
            </span>
          </div>
          <div onClick={onClickRightIcon} className="cursor-pointer">
            {rightIcon}
          </div>
        </div>
      </div>
    );
  }
);

SearchBoxButton.displayName = "SearchBoxButton";

export default SearchBoxButton;
