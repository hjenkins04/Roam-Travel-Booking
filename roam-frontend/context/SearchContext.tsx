import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Airport } from "@/models"

interface SearchData {
  departureAirport: Airport | null;
  arrivalAirport: Airport | null;
  departureDate: Date | null;
  returnDate: Date | null;
  seatTypeMapping: { [index: number]: "Economy" | "Business" };
  passengers: number;
  isRoundTrip: boolean;
}

interface SearchContextType {
  searchData: SearchData;
  setSearchData: React.Dispatch<React.SetStateAction<SearchData>>;
}

// Create context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

// Provider component
interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  // Initialize with defaults or load from localStorage if in the browser
  const [searchData, setSearchData] = useState<SearchData>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("searchData");
      return storedData ? JSON.parse(storedData) : {
        departureAirport: null,
        arrivalAirport: null,
        departureDate: null,
        returnDate: null,
        passengers: 1,
        seatTypeMapping: { 1: "Business" },
        isRoundTrip: true,
      };
    }
    return {
      departureAirport: null,
      arrivalAirport: null,
      departureDate: null,
      returnDate: null,
      passengers: 1,
      seatTypeMapping: { 1: "Business" },
      isRoundTrip: true,
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("searchData", JSON.stringify(searchData));
    }
  }, [searchData]);

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};
