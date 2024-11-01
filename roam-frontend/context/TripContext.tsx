import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Trip, Flight } from "@/models"

export interface TripData {
  trip: Trip;
  current_flight: Flight;
  current_flight_departure_date: Date | null;
  departure_date: Date | null;
  return_date: Date | null;
  total_cost: Number;
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
        total_cost: 0
      };
    }
    return {
        trip: null,
        total_cost: 0
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
