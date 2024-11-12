import { render, screen } from "@testing-library/react";
import SearchResultsOverviewBox from "@/components/SearchResultsOverviewBox";
import { useTripStore } from "@/context/TripContext";
import React from 'react';

// Mock the `useTripStore` hook
jest.mock("@/context/TripContext", () => ({
    useTripStore: jest.fn(),
}));

describe("SearchResultsOverviewBox", () => {
    it("should display departure and arrival cities correctly", () => {
        const mockTripData = {
            current_flight: {
                departure_airport: {
                    iata_code: "NYC",
                    municipality_name: "New York",
                    short_name: "JFK",
                },
                arrival_airport: {
                    iata_code: "LAX",
                    municipality_name: "Los Angeles",
                    short_name: "LAX",
                },
            },
            trip: {
                is_round_trip: true,
                passengers: [{}, {}], // Two passengers
            },
        };

        const useTripStoreMock = useTripStore as jest.MockedFunction<typeof useTripStore>;
        useTripStoreMock.mockReturnValue({ tripData: mockTripData });

        render(<SearchResultsOverviewBox />);

        // Check if the departure and arrival cities are rendered correctly
        expect(screen.getByText("NYC")).toBeInTheDocument();
        expect(screen.getByText("New York")).toBeInTheDocument();
        expect(screen.getByText("JFK")).toBeInTheDocument();
        expect(screen.getByText("Los Angeles")).toBeInTheDocument();
    });


    it("should render traveler count with appropriate icon when there are passengers", () => {
        const mockTripData = {
            trip: {
                passengers: [{}, {}], // Two passengers
            },
        };

        const useTripStoreMock = useTripStore as jest.MockedFunction<typeof useTripStore>;
        useTripStoreMock.mockReturnValue({ tripData: mockTripData });

        render(<SearchResultsOverviewBox />);

        // Check if traveler count is displayed correctly
        expect(screen.getByText("2")).toBeInTheDocument(); // Two passengers

        // Check if the correct icon (Users for multiple passengers) is displayed
        expect(screen.queryByTestId("users-icon")).toBeInTheDocument();
    });

    it("should render '1' traveler with user icon for single passenger", () => {
        const mockTripData = {
            trip: {
                passengers: [{}], // One passenger
            },
        };

        const useTripStoreMock = useTripStore as jest.MockedFunction<typeof useTripStore>;
        useTripStoreMock.mockReturnValue({ tripData: mockTripData });

        render(<SearchResultsOverviewBox />);

        // Check if traveler count is displayed correctly
        expect(screen.getByText("1")).toBeInTheDocument(); // One passenger

        // Check if the correct icon (User for single passenger) is displayed
        expect(screen.queryByTestId("user-icon")).toBeInTheDocument();
    });
});
