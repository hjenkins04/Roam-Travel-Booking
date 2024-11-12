import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchScroll from "@/components/SearchScroll";
import { Flight, FilterOptions } from "@/models";
import {
  mockFlight,
  mockUseTripStore,
  mockFlightOneStop,
  mockFlightExpensive,
  mockUseSearchStore,
  mockAuthStoreSignedIn,
} from "@/components/__tests__/__mocks__/storeMocks";

import { setTripContextData } from "@/components/HelperFunctions/setTripContextData";
import { ImageProps } from "next/image";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/context/SearchContext";
import { useLoaderStore } from "@/context/LoaderContext";
import { useAuthStore } from "@/context/AuthContext";

/**
 * Test File: Search Scroll
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the Search Scroll Component.
 * - The Search Scroll Component includes:
 *      - Some number of search items in a cointainer, overflowing items beyond the size of the container are accessed by scrolling.
 *
 * Test Cases:
 * 1. Renders correctly based on applied filters - flights that contain 1 stop.
 *    - Expectation: There will be no flights listed that contain the text "non-stop"
 *
 * 2. If no results for the given filters, displays "No results match your search criteria"
 *    - Expectation: That 'no results' text is visible.
 *
 * 3. Search result expansion is not open automatically.
 *    - Expectation: Book My Ticket text is not visible.
 *
 * 4. Search result expansion opens when a search item is clicked.
 *    - Expectation: That Book My Ticket text is now visible.
 *
 * 5. Book My Ticket Button routes to the checkout page
 *    - Expectation: Router.push() will be called with /checkout
 */

jest.mock("next/image", () => {
  return function MockImage({ src, alt, ...props }: ImageProps) {
    return <img src={src as string} alt={alt} {...props} />;
  };
});

// Mock contexts and dependencies
jest.mock("@/context/SearchContext");
jest.mock("@/context/LoaderContext");
jest.mock("@/context/AuthContext");
jest.mock("next/navigation");

// Type-safe mocks
const useSearchStoreMock = useSearchStore as jest.MockedFunction<
  typeof useSearchStore
>;
const useLoaderStoreMock = useLoaderStore as jest.MockedFunction<
  typeof useLoaderStore
>;
const useAuthStoreMock = useAuthStore as jest.MockedFunction<
  typeof useAuthStore
>;
const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;

type SearchData = {
  departureAirport: string | null;
  arrivalAirport: string | null;
  departureDate: string | null;
  returnDate?: string | null;
  passengers: number | null;
  isRoundTrip?: boolean;
};

// Helper function to set up mock context values
const setupSearchStoreMock = (searchData: SearchData) => {
  useSearchStoreMock.mockReturnValue({
    searchData, // Pass the `searchData` object here
    setSearchData: jest.fn(), // Mock function if needed
  });
};

const setupLoaderStoreMock = () => {
  const hideLoader = jest.fn(); // Mocking the hideLoader function
  const showLoader = jest.fn(); // Mocking the showLoader function
  useLoaderStoreMock.mockReturnValue({
    hideLoader,
    showLoader,
  });
  return { hideLoader, showLoader }; // Return both functions
};

const setupAuthStoreMock = () => {
  useAuthStoreMock.mockReturnValue({
    authData: { isSignedIn: true },
    setShowPleaseSignInPopup: jest.fn(),
  });
};

// Set up a basic mocked useRouter instance
useRouterMock.mockReturnValue({
  push: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
});

describe("SearchScroll Component", () => {
  beforeEach(() => {
    // Setup mock data for the store
    setupSearchStoreMock({
      departureAirport: "Charles De Gaulle International Airport",
      arrivalAirport: "São Paulo–Guarulhos International Airport",
      departureDate: "2024-12-01",
      returnDate: "2024-12-15",
      passengers: 1,
      isRoundTrip: false,
    });

    setupAuthStoreMock();
    const { hideLoader, showLoader } = setupLoaderStoreMock(); // Call the mock setup for loader
    useRouterMock.mockClear();
  });

  // Define mock flight data and filters
  const mockFlights = [
    {
      airline: {
        guid: "b943ae97-4943-4116-8eb5-3738a302ce57",
        icao_code: "TAM",
        logo_path: "/images/airline-logos/TAM.png",
        name: "LATAM Airlines",
      },
      arrival_airport: {
        country: {
          code: "BR",
          guid: "de9be736-cfc9-44ca-b5b3-b2eae0dbf5e7",
          name: "Brazil",
        },
        continent: {
          code: "SA",
          guid: "3b3eb5e1-82e1-46a4-b47e-4091d8cb29ad",
          name: "South America",
        },
        full_name: "São Paulo–Guarulhos International Airport",
        guid: "c61b156d-477f-437e-b1da-b9be4b55fdbd",
        iata_code: "GRU",
        location: {
          guid: "cfb96ab2-e3b6-4de8-a7ea-bda2c35f5c0f",
          latitude: -23.4356,
          longitude: -46.4731,
        },
        municipality_name: "São Paulo",
        short_name: "Guarulhos",
      },
      arrival_time: "8:20AM",
      baggage_allowance: "2 checked bags",
      departure_airport: {
        country: {
          code: "FR",
          guid: "c6a21d91-760b-4d8b-b482-2e6b8329d22f",
          name: "France",
        },
        continent: {
          code: "EU",
          guid: "f3a120d8-14cc-4d5a-96fd-bccf44a3e99a",
          name: "Europe",
        },
        full_name: "Charles de Gaulle Airport",
        guid: "7391830b-fab1-426f-8d08-c5422db71f80",
        iata_code: "CDG",
        location: {
          guid: "684f62c5-2c62-4760-9a72-8a80aee7f424",
          latitude: 49.0097,
          longitude: 2.5477,
        },
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
    },
  ];

  const filters = {
    max_price: null,
    stops: null,
    arrival_time: null,
    departure_time: null,
    airline: null,
  };

  test("Displays flight options based on filters", () => {
    render(<SearchScroll filters={filters} flights={mockFlights} />);
    expect(screen.getByText("LATAM Airlines")).toBeInTheDocument();
  });

  test("No Search Results if Nothing Matches the max_price Filter", () => {
    const noResultsFilters = {
      max_price: "$100", // Price lower than available flights
      stops: null,
      arrival_time: null,
      departure_time: null,
      airline: null,
    };

    render(<SearchScroll filters={noResultsFilters} flights={mockFlights} />);

    // Expect 'No results found' text to be visible
    expect(
      screen.getByText((content) => content.startsWith("No results found"))
    ).toBeInTheDocument();
  });

  test("No Search Results if Nothing Matches the stops Filter", () => {
    const noResultsFilters = {
      max_price: null, // Price lower than available flights
      stops: "1",
      arrival_time: null,
      departure_time: null,
      airline: null,
    };

    render(<SearchScroll filters={noResultsFilters} flights={mockFlights} />);

    // Expect 'No results found' text to be visible
    expect(
      screen.getByText((content) => content.startsWith("No results found"))
    ).toBeInTheDocument();
  });

  test("Search Result Expansion Is not open", () => {
    render(<SearchScroll filters={filters} flights={mockFlights} />);

    // Expect no "Book My Ticket Now" text to be visible initially
    expect(screen.queryByText(/Book My Ticket Now/i)).toBeNull();
  });

  test("Search Result Expansion Is Open after a Click", () => {
    render(<SearchScroll filters={filters} flights={mockFlights} />);

    // Click on the first flight item
    const firstFlightItem = screen.getByText("LATAM Airlines");
    fireEvent.click(firstFlightItem);

    // Check if the expansion is visible after clicking
    expect(screen.getByText(/Book My Ticket Now/i)).toBeInTheDocument();
  });

  test("Book my ticket now redirects to the right page when logged in and departure date is null", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });


    setupSearchStoreMock({
      departureAirport: "Charles De Gaulle International Airport",
      arrivalAirport: "São Paulo–Guarulhos International Airport",
      departureDate: null, // Departure date is null
      returnDate: "2024-12-15",
      passengers: 1,
      isRoundTrip: false,
    });

    render(<SearchScroll filters={filters} flights={mockFlights} />);

    // Click on the first flight item to expand it
    const firstFlightItem = screen.getByText("LATAM Airlines");
    fireEvent.click(firstFlightItem);

    // Ensure "Book My Ticket Now" is visible
    const bookTicketButton = screen.getByText("Book My Ticket Now");
    expect(bookTicketButton).toBeInTheDocument();

    // Simulate clicking the "Book My Ticket Now" button
    fireEvent.click(bookTicketButton);

    // Check if the popup appears due to missing departure date
    await waitFor(() => {
      const popup = screen.queryByText(/Complete Required Field/i);
      expect(popup).toBeInTheDocument(); // Ensure the popup is shown for missing field
    });

    // Ensure the navigation is not triggered because of missing date
    expect(mockPush).not.toHaveBeenCalled();
  });

  test("Book my ticket now redirects to the right popup when logged in and return date is null", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });


    setupSearchStoreMock({
      departureAirport: "Charles De Gaulle International Airport",
      arrivalAirport: "São Paulo–Guarulhos International Airport",
      departureDate: "2024-12-15",
      returnDate: null,
      passengers: 1,
      isRoundTrip: true,
    });


    render(<SearchScroll filters={filters} flights={mockFlights} />);

    // Click on the first flight item to expand it
    const firstFlightItem = screen.getByText("LATAM Airlines");
    fireEvent.click(firstFlightItem);

    // Ensure "Book My Ticket Now" is visible
    const bookTicketButton = screen.getByText("Book My Ticket Now");
    expect(bookTicketButton).toBeInTheDocument();

    // Simulate clicking the "Book My Ticket Now" button
    fireEvent.click(bookTicketButton);

    // Check if the popup appears due to missing return date
    await waitFor(() => {
      const popup = screen.queryByText(/Complete Required Field/i);
      expect(popup).toBeInTheDocument();
    });

    // Ensure the navigation is not triggered because of missing date
    expect(mockPush).not.toHaveBeenCalled();
  });

  test("Book my ticket now redirects to the right popup when logged in and departure airport is null", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });


    setupSearchStoreMock({
      departureAirport: null,
      arrivalAirport: "São Paulo–Guarulhos International Airport",
      departureDate: "2024-12-15",
      returnDate: null,
      passengers: 1,
      isRoundTrip: false,
    });

    render(<SearchScroll filters={filters} flights={mockFlights} />);

    // Click on the first flight item to expand it
    const firstFlightItem = screen.getByText("LATAM Airlines");
    fireEvent.click(firstFlightItem);

    // Ensure "Book My Ticket Now" is visible
    const bookTicketButton = screen.getByText("Book My Ticket Now");
    expect(bookTicketButton).toBeInTheDocument();

    // Simulate clicking the "Book My Ticket Now" button
    fireEvent.click(bookTicketButton);

    // Check if the popup appears due to missing departure airport 
    await waitFor(() => {
      const popup = screen.queryByText(/Complete Required Field/i);
      expect(popup).toBeInTheDocument(); // Ensure the popup is shown for missing field
    });

    // Ensure the navigation is not triggered because of missing value 
    expect(mockPush).not.toHaveBeenCalled();
  });

  test("Book my ticket now redirects to popup when logged in and arrival airport is null", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    setupSearchStoreMock({
      departureAirport: "Charles De Gaulle International Airport",
      arrivalAirport: null,
      departureDate: "2024-12-15",
      returnDate: "2024-12-25",
      passengers: 1,
      isRoundTrip: true,
    });

    render(<SearchScroll filters={filters} flights={mockFlights} />);

    // Click on the first flight item to expand it
    const firstFlightItem = screen.getByText("LATAM Airlines");
    fireEvent.click(firstFlightItem);

    // Ensure "Book My Ticket Now" is visible
    const bookTicketButton = screen.getByText("Book My Ticket Now");
    expect(bookTicketButton).toBeInTheDocument();

    // Simulate clicking the "Book My Ticket Now" button
    fireEvent.click(bookTicketButton);

    // Check if the popup appears due to missing arrival airport
    await waitFor(() => {
      const popup = screen.queryByText(/Complete Required Field/i);
      expect(popup).toBeInTheDocument(); // Ensure the popup is shown for missing field
    });

    // Ensure the navigation is not triggered because of missing value 
    expect(mockPush).not.toHaveBeenCalled();
  });

  test("Book my ticket now redirects to the right page when logged in and passengers is null", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    setupSearchStoreMock({
      departureAirport: "Charles De Gaulle International Airport",
      arrivalAirport: "São Paulo–Guarulhos International Airport",
      departureDate: "2024-12-15",
      returnDate: "2024-12-25",
      passengers: null,
      isRoundTrip: true,
    });

    render(<SearchScroll filters={filters} flights={mockFlights} />);

    // Click on the first flight item to expand it
    const firstFlightItem = screen.getByText("LATAM Airlines");
    fireEvent.click(firstFlightItem);

    // Ensure "Book My Ticket Now" is visible
    const bookTicketButton = screen.getByText("Book My Ticket Now");
    expect(bookTicketButton).toBeInTheDocument();

    // Simulate clicking the "Book My Ticket Now" button
    fireEvent.click(bookTicketButton);

    // Check if the popup appears due to missing passengers 
    await waitFor(() => {
      const popup = screen.queryByText(/Complete Required Field/i);
      expect(popup).toBeInTheDocument();
    });

    const okButton = screen.getByText("OK");
    expect(okButton).toBeInTheDocument();

    fireEvent.click(okButton);

    expect(okButton).not.toBeInTheDocument();
  });

  test("Book my ticket now redirects to the right page when logged in and all search attributes are valid", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    const mockOnClick = jest.fn();

    setupSearchStoreMock({
      departureAirport: "Charles De Gaulle International Airport",
      arrivalAirport: "São Paulo–Guarulhos International Airport",
      departureDate: "2024-12-15",
      returnDate: "2024-12-25",
      passengers: 1,
      isRoundTrip: true,
    });

    render(<SearchScroll filters={filters} flights={mockFlights} />);

    // Click on the first flight item to expand it
    const firstFlightItem = screen.getByText("LATAM Airlines");
    fireEvent.click(firstFlightItem);

    // Ensure "Book My Ticket Now" is visible
    const bookTicketButton = screen.getByText("Book My Ticket Now");
    expect(bookTicketButton).toBeInTheDocument();

    // Simulate clicking the "Book My Ticket Now" button
    fireEvent.click(bookTicketButton);
  });
});
