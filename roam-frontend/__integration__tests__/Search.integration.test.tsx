import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchResultsPage from "@/app/search-results/page";
import { useSearchStore } from "@/context/SearchContext";
import { mockSearchData, mockArrivalAirport, mockDepartureAirportOther, mockArrivalAirportOther, mockCurrentFlight, mockFlightOutbound, mockFlightExpensive, mockFlight } from "@/components/__tests__/__mocks__/storeMocks";
import { fetchAirports } from "@/api/FetchAirports";
import { fetchFlightsBySearchQuery } from "@/api/FetchFlightsBySearchQuery";
import mockRouter from "next/router";
import { useAuthStore } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import React, { useEffect } from "react";
import assert from "assert";

jest.mock("@/api/FetchRandomReturnFlight", () => ({
    fetchRandomReturnFlight: jest.fn().mockResolvedValue(
        {
            airline: {
                guid: "b943ae97-4943-4116-8eb5-3738a302ce57",
                icao_code: "TAM",
                logo_path: "/images/airline-logos/TAM.png",
                name: "LATAM Airlines",
            },
            arrival_airport: {
                country: { code: "BR", guid: "de9be736-cfc9-44ca-b5b3-b2eae0dbf5e7", name: "Brazil" },
                continent: { code: "SA", guid: "3b3eb5e1-82e1-46a4-b47e-4091d8cb29ad", name: "South America" },
                full_name: "São Paulo–Guarulhos International Airport",
                guid: "c61b156d-477f-437e-b1da-b9be4b55fdbd",
                iata_code: "GRU",
                location: { guid: "cfb96ab2-e3b6-4de8-a7ea-bda2c35f5c0f", latitude: -23.4356, longitude: -46.4731 },
                municipality_name: "São Paulo",
                short_name: "Guarulhos",
            },
            arrival_time: "8:20AM",
            baggage_allowance: "2 checked bags",
            departure_airport: {
                country: { code: "FR", guid: "c6a21d91-760b-4d8b-b482-2e6b8329d22f", name: "France" },
                continent: { code: "EU", guid: "f3a120d8-14cc-4d5a-96fd-bccf44a3e99a", name: "Europe" },
                full_name: "Charles de Gaulle Airport",
                guid: "7391830b-fab1-426f-8d08-c5422db71f80",
                iata_code: "CDG",
                location: { guid: "684f62c5-2c62-4760-9a72-8a80aee7f424", latitude: 49.0097, longitude: 2.5477 },
                municipality_name: "Paris",
                short_name: "Charles de Gaulle",
            },
            departure_time: "11:50PM",
            flight_time_minutes: 1180,
            guid: "c2f05d58-4767-4cfa-b06d-b9b50ab9df1a",
            num_stops: 0,
            price_business: 1550.0,
            price_economy: 950.0,
            seat_configuration: null,
        }),
}));


const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

const { push } = require('next/navigation');

jest.mock("@/context/AuthContext", () => ({
    useAuthStore: jest.fn(),
}));

jest.mock("@/context/SearchContext", () => ({
    useSearchStore: jest.fn(),
}));

const useSearchStoreMock = useSearchStore as jest.MockedFunction<typeof useSearchStore>;

let mockFilters = [
    {
        max_price: null,
        stops: null,
        arrival_time: null,
        departure_time: null,
        airline: null,
    },
];

// Setup mock for useSearchStore
const setupSearchStoreMock = () => {
    useSearchStoreMock.mockReturnValue({
        searchData: {
            ...mockSearchData,
            filters: mockFilters,
        },
        setSearchData: jest.fn((newData) => {
            // Update the mock filters dynamically
            mockFilters = {
                ...mockFilters,
                ...newData.filters,
            };
        }),
    });
};

jest.mock("@/api/FetchAirports", () => ({
    fetchAirports: jest.fn(),
}));

jest.mock("@/api/FetchFlightsBySearchQuery", () => ({
    fetchFlightsBySearchQuery: jest.fn(),
}));


const mockFlights = [mockCurrentFlight, mockFlight, mockFlightOutbound, mockFlightExpensive];

describe("Search Results Page Integration Tests", () => {

    beforeEach(() => {
        // Setup mock for search store
        setupSearchStoreMock();
        jest.clearAllMocks();

        const useAuthStoreMock = useAuthStore as jest.MockedFunction<typeof useAuthStore>;
        useAuthStoreMock.mockReturnValue({
            authData: {
                guid: "",
                isSignedIn: true,  // User is not signed in
                showPleaseSignInPopup: false,  // Popup should be shown
                showBadAccessPopup: false,
            },
            signIn: jest.fn(),
            signOut: jest.fn(),
            setAuthData: jest.fn(),
            setShowPleaseSignInPopup: jest.fn(),
            setBadAccessPopup: jest.fn(),
        });

        (fetchAirports as jest.Mock).mockResolvedValue([
            mockDepartureAirportOther,
            mockArrivalAirportOther,
            mockArrivalAirport,
        ]);

        (fetchFlightsBySearchQuery as jest.Mock).mockResolvedValue(mockFlights);
    });

    test("Allows searching, filtering, selecting a flight, and booking", async () => {
        const onClickMock = jest.fn();
        const authStore = useAuthStore();
        const mockOnClick = jest.fn();

        setupSearchStoreMock();

        // === SETUP & MOCKING ===
        render(<SearchResultsPage />);

        expect(authStore.authData.isSignedIn).toBe(true);

        //Wait for searchbox to load 
        await waitFor(() =>
            expect(fetchAirports).toHaveBeenCalled()
        );

        //Confirm search input values render correctly 
        await waitFor(() => {
            expect(screen.getByTestId("departure-city-button")).toHaveTextContent("JFK");
            expect(screen.getByTestId("departure-city-button")).toHaveTextContent("New York");
            // Check arrival city button text
            expect(screen.getByTestId("arrival-city-button")).toHaveTextContent("LAX");
            expect(screen.getByTestId("arrival-city-button")).toHaveTextContent("Los Angeles");
            // Check departure date button text
            expect(screen.getByTestId("departure-date-button")).toHaveTextContent("Sun");
            expect(screen.getByTestId("departure-date-button")).toHaveTextContent("October");
            expect(screen.getByTestId("departure-date-button")).toHaveTextContent("20");
            // Check travelers and class button text
            expect(screen.getByTestId("travellers-button")).toHaveTextContent("2");
        });


        const user = userEvent.setup();
        const searchButton = screen.getByText('Search');
        await user.click(searchButton);

        // === TESTING FLIGHT RESULTS W/O FILTERS ===
        await waitFor(() => {
            // Make sure "American Airlines" is rendered
            expect(screen.getAllByText("American Airlines")).toBeInTheDocument;

            //Make sure flights of all prices are rendered 
            expect(screen.queryAllByText(/300/i)).toBeInTheDocument;
            expect(screen.queryByText(/900/i)).toBeInTheDocument();
            expect(screen.queryByText(/200/i)).toBeInTheDocument();
        });

        // === TESTING FILTERING ===
        const airlineFilterButton = screen.getByTestId("filter-button-1");
        await user.click(airlineFilterButton);

        const dropdownList = await screen.findByTestId('dropdown-list');
        await waitFor(() => {
            expect(dropdownList).toBeInTheDocument();
        });

        const dropdownOption = screen.getByTestId("dropdown-selection-0");
        await user.click(dropdownOption);

        await user.click(searchButton)

        await waitFor(() => {
            expect(screen.queryByText('300')).not.toBeInTheDocument();
            expect(screen.queryByText('900')).not.toBeInTheDocument();
        });

        // Confirm Search Result Expansion is not open before flight selection
        expect(screen.queryByText('Book My Ticket Now')).not.toBeInTheDocument();

        //Select a flight 
        const flights = screen.getAllByText(/American Airlines/i);
        await user.click(flights[0])

        // === TESTING SEARCH RESULT EXPANSION ==
        // Correct Expansion Values 
        await waitFor(() => {
            const laxElements = screen.getAllByText('LAX'); // Get all elements containing 'LAX'
            expect(laxElements[1]).toBeInTheDocument();

            const jfkElements = screen.getAllByText('JFK'); // Get all elements containing 'LAX'
            expect(laxElements[1]).toBeInTheDocument();

            expect(screen.getByText((content, element) => {
                return content.includes('John F.') && content.includes('Kennedy International Airport');
            })).toBeInTheDocument();

            expect(screen.getByText((content, element) => {
                return content.includes('Los Angeles') && content.includes('International Airport');
            })).toBeInTheDocument();

            expect(screen.getByTestId("right-arrow")).toBeInTheDocument()
            expect(screen.getByText(/Price: \$200/)).toBeInTheDocument()
            expect(screen.getByText(/Duration: 5h/)).toBeInTheDocument()
            expect(screen.getByText(/Baggage: 2 bags/)).toBeInTheDocument()
        });

        //Confirm use of Book My Ticket Now button
        const bookTicketButton = screen.getByText('Book My Ticket Now');
        expect(bookTicketButton).toBeInTheDocument();
        await fireEvent.click(bookTicketButton);

        expect(mockPush).toHaveBeenCalledWith('/seat-booking');


    });
});

