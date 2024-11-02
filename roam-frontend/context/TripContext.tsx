import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Trip, Flight } from "@/models";

export interface TripData {
  trip: Trip | null;
  current_flight: Flight | null;
  current_flight_departure_date: Date | null;
  departure_date: Date | null;
  return_date: Date | null;
  total_cost: number;
}

interface TripState {
  tripData: TripData;
  setTripData: (data: Partial<TripData> | ((prev: TripData) => TripData)) => void;
}

// Zustand store creation
export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      tripData: {
        trip: null,
        current_flight: null,
        current_flight_departure_date: null,
        departure_date: null,
        return_date: null,
        total_cost: 0,
      },
      setTripData: (data) =>
        set((state) => {
          if (typeof data === "function") {
            return { tripData: data(state.tripData) };
          }
          return { tripData: { ...state.tripData, ...data } };
        }),
    }),
    {
      name: "tripData-storage", // Local storage key
      partialize: (state) => ({ tripData: state.tripData }), // Persist tripData
    }
  )
);
