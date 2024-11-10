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

    it("should display departure date for round-trip", () => {
        const mockTripData = {
            current_flight_departure_date: new Date(2024, 10, 15), // November 15, 2024
            trip: {
                is_round_trip: true,
                passengers: [{}, {}], // Two passengers
            },
        };

        const useTripStoreMock = useTripStore as jest.MockedFunction<typeof useTripStore>;
        useTripStoreMock.mockReturnValue({ tripData: mockTripData });

        render(<SearchResultsOverviewBox />);

        // Check if the departure date is rendered correctly (day, weekday, month)
        expect(screen.getByText("15")).toBeInTheDocument(); // Day (15)
        expect(screen.getByText("Fri")).toBeInTheDocument(); // Weekday (Fri)
        expect(screen.getByText("November")).toBeInTheDocument(); // Month (November)
    });

    it("should render traveler count and appropriate icon", () => {
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

    it("should show '1' for single traveler with user icon", () => {
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

    it("should display 'Select City' when no city is selected", () => {
        const mockTripData = {
            current_flight: {
                departure_airport: {},
                arrival_airport: {},
            },
            trip: {
                is_round_trip: true,
                passengers: [{}, {}],
            },
        };

        const useTripStoreMock = useTripStore as jest.MockedFunction<typeof useTripStore>;
        useTripStoreMock.mockReturnValue({ tripData: mockTripData });

        render(<SearchResultsOverviewBox />);

        // Check if 'Select City' is shown when no departure or arrival city is selected
        const selectCityElements = screen.getAllByText("Select City");

        expect(selectCityElements).toHaveLength(2); // Adjust the expected length based on how many instances you expect
        expect(selectCityElements[0]).toBeInTheDocument();
    });

    // Additional tests for SearchBoxButtonOneSide
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
