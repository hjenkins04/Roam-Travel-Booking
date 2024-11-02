import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Airport } from "@/models";

interface SearchData {
  departureAirport: Airport | null;
  arrivalAirport: Airport | null;
  departureDate: Date | null;
  returnDate: Date | null;
  seatTypeMapping: { [index: number]: "Economy" | "Business" };
  passengers: number;
  isRoundTrip: boolean;
  selectedAirlines: string[];
}

interface SearchStore {
  searchData: SearchData;
  setSearchData: (data: Partial<SearchData>) => void;
}

// Zustand store creation
export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      searchData: {
        departureAirport: null,
        arrivalAirport: null,
        departureDate: null,
        returnDate: null,
        passengers: 1,
        seatTypeMapping: { 1: "Business" },
        isRoundTrip: true,
        selectedAirlines: [],
      },
      setSearchData: (data: Partial<SearchData>) =>
        set((state) => ({
          searchData: { ...state.searchData, ...data },
        })),
    }),
    {
      name: "searchData-storage", // Key for local storage
      partialize: (state) => ({ searchData: state.searchData }), // Persist searchData
    }
  )
);
