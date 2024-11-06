"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchBoxButtonSkeletonProps {
  size?: string;
  className?: string;
}

const SearchBoxButtonSkeleton: React.FC<SearchBoxButtonSkeletonProps> = ({ size = "w-[230px]", className = "", ...props }) => {
  return (
    <div
      className={`relative flex items-center justify-between bg-white rounded-2xl shadow-lg p-3 border-2 border-gray-300 ${size} ${className}`}
      style={{ minHeight: "75px" }}
      {...props}
    >
      {/* Header Text Skeleton */}
      <Skeleton className="absolute -top-3 left-4 h-4 w-16 bg-gray-200 rounded" />

      {/* Left Side Skeleton */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-4 bg-gray-300 rounded-full" /> {/* Icon */}
        <div className="flex flex-col text-left space-y-1">
          <Skeleton className="h-5 w-20 bg-gray-200 rounded" /> {/* Main Text */}
          <Skeleton className="h-4 w-16 bg-gray-200 rounded" /> {/* Sub Text */}
        </div>
      </div>
    </div>
  );
};

export default SearchBoxButtonSkeleton;
