import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PopularDestination } from "@/models/popular_destination";
import { fetchPopDestinations } from "@/api/FetchPopDestinations";

interface DestinationsStore {
  popularDestinations: PopularDestination[];
  refreshDestinations: () => Promise<void>;
}

// Zustand store creation
export const useDestinationsStore = create<DestinationsStore>()(
  persist(
    (set) => ({
      popularDestinations: [],
      
      refreshDestinations: async () => {
        try {
          const destinations = await fetchPopDestinations();
          set({ popularDestinations: destinations });
        } catch (error) {
          console.error("Error fetching popular destinations:", error);
        }
      },
    }),
    {
      name: "popularDestinations-storage", // Local storage key
      partialize: (state) => ({ popularDestinations: state.popularDestinations }), // Persist popularDestinations
    }
  )
);
