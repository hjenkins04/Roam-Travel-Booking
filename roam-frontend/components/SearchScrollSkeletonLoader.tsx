import React from "react";
import SearchItemSkeletonLoader from "@/components/SearchItemSkeletonLoader";

const SearchScrollSkeletonLoader: React.FC = () => {
  return (
    <div className="flex mb-10 h-[500px] justify-between">
      <div className="hide-scrollbar h-[500px] overflow-y-auto w-[800px] bg-white p-4 rounded-lg overflow-hidden">
        {/* Render 6 skeleton items to mimic loading state */}
        {[...Array(6)].map((_, index) => (
          <SearchItemSkeletonLoader key={index} />
        ))}
      </div>
    </div>
  );
};

export default SearchScrollSkeletonLoader;
