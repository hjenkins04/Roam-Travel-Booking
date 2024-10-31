import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PopularDestination } from "@/models/popular_destination";
import { fetchPopDestinations } from "@/api/FetchPopDestinations";

// Define the context type
interface DestinationsContextType {
    popularDestinations: PopularDestination[];
    refreshDestinations: () => Promise<void>;
}

// Create the context
const DestinationsContext = createContext<DestinationsContextType | undefined>(undefined);

export const useDestinationsContext = () => {
    const context = useContext(DestinationsContext);
    if (!context) {
        throw new Error("useDestinationsContext must be used within a DestinationsProvider");
    }
    return context;
};

// Provider component
interface DestinationsProviderProps {
    children: ReactNode;
}

export const DestinationsProvider: React.FC<DestinationsProviderProps> = ({ children }) => {
    const [popularDestinations, setPopularDestinations] = useState<PopularDestination[]>([]);

    // Function to fetch popular destinations
    const refreshDestinations = async () => {
        try {
            const destinations = await fetchPopDestinations();
            setPopularDestinations(destinations);
            // Store fetched destinations in localStorage
            localStorage.setItem("popularDestinations", JSON.stringify(destinations));
        } catch (error) {
            console.error("Error fetching popular destinations:", error);
        }
    };

    // Check localStorage for popular destinations on mount
    useEffect(() => {
        const storedDestinations = localStorage.getItem("popularDestinations");

        if (storedDestinations) {
            setPopularDestinations(JSON.parse(storedDestinations));
        } else {
            // If localStorage is empty, fetch new destinations
            refreshDestinations();
        }
    }, []);

    return (
        <DestinationsContext.Provider value={{ popularDestinations, refreshDestinations }}>
            {children}
        </DestinationsContext.Provider>
    );
};

