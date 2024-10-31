import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Trip, Flight } from "@/models"

interface TripData {
  trip: Trip;
  currentFlight: Flight;
  currentFlightDepartureDate: Date | null;
  departureDate: Date | null;
  returnDate: Date | null;
  totalCost: Number;
}

interface TripContextType {
  tripData: TripData;
  setTripData: React.Dispatch<React.SetStateAction<TripData>>;
}

// Create context
const SearchContext = createContext<TripContextType | undefined>(undefined);

export const useTripContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useTripContext must be used within a TripProvider");
  }
  return context;
};

// Provider component
interface TripProviderProps {
  children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  // Initialize with defaults or load from localStorage if in the browser
  const [tripData, setTripData] = useState<TripData>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("tripData");
      return storedData ? JSON.parse(storedData) : {
        trip: null,
        totalCost: 0
      };
    }
    return {
        trip: null,
        totalCost: 0
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tripData", JSON.stringify(tripData));
    }
  }, [tripData]);

  return (
    <SearchContext.Provider value={{ tripData, setTripData }}>
      {children}
    </SearchContext.Provider>
  );
};
