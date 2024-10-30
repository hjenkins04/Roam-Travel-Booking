import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming Skeleton component is similar to the example

const SearchItemSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-[700px] p-4 bg-white rounded-lg shadow-lg mb-4 animate-pulse">
      {/* Left Icon and Airline Section */}
      <div className="flex items-center w-[200px]">
        <Skeleton className="h-9 w-9 bg-gray-300 rounded-full mr-2" /> {/* Icon Placeholder */}
        <div className="flex flex-col">
          <Skeleton className="h-5 w-20 bg-gray-200 rounded mb-1" /> {/* Trip Length */}
          <Skeleton className="h-4 w-16 bg-gray-200 rounded" /> {/* Airline */}
        </div>
      </div>

      {/* Departure and Arrival Times Section */}
      <div className="flex flex-col items-center w-[200px]">
        <div className="flex items-center">
          <Skeleton className="h-5 w-12 bg-gray-200 rounded mr-2" /> {/* Departure Time */}
          <span className="mx-2"> - </span>
          <Skeleton className="h-5 w-12 bg-gray-200 rounded" /> {/* Arrival Time */}
        </div>
      </div>

      {/* Number of Stops and Stop Info Section */}
      <div className="flex flex-col ml-4 items-center w-[200px]">
        <Skeleton className="h-4 w-10 bg-gray-200 rounded mb-1" /> {/* Number of Stops */}
        <Skeleton className="h-4 w-24 bg-gray-200 rounded" /> {/* Stop Info */}
      </div>

      {/* Price and Trip Type Section */}
      <div className="flex flex-col items-end w-[200px]">
        <Skeleton className="h-6 w-16 bg-gray-200 rounded mb-1" /> {/* Price */}
        <Skeleton className="h-4 w-12 bg-gray-200 rounded" /> {/* Trip Type */}
      </div>
    </div>
  );
};

export default SearchItemSkeleton;
