// src/context/FilterContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your filter context state
interface FilterState {
    maxPrice: number;
    numStops: number;
    airline: string;
}

// Define the shape of the context
interface FilterContextProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

// Create the context
const FilterContext = createContext<FilterContextProps | undefined>(undefined);

// Create a provider component
export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize the filter state
    const [filters, setFilters] = useState<FilterState>({
        maxPrice: Infinity,
        numStops: 0,
        airline: "",
    });

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

// Custom hook to use the Filter Context
export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilterContext must be used within a FilterProvider");
    }
    return context;
};
