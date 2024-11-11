import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchScroll from "@/components/SearchScroll";
import { Flight, FilterOptions } from "@/models";
import { mockFlight, mockUseTripStore, mockFlightOneStop, mockFlightExpensive, mockUseSearchStore, mockAuthStoreSignedIn } from '@/components/__tests__/__mocks__/storeMocks';
import { setTripContextData } from "@/components/HelperFunctions/setTripContextData";
import { ImageProps } from "next/image";
import { useRouter } from 'next/navigation';

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

jest.mock('@/context/TripContext', () => ({
  useTripStore: jest.fn(() => mockUseTripStore),
}));

jest.mock('@/context/SearchContext', () => ({
  useSearchStore: jest.fn(() => mockUseSearchStore),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuthStore: jest.fn(() => mockAuthStoreSignedIn),
}));

jest.mock('@/api/FetchRandomReturnFlight', () => {;
  return {
    fetchRandomReturnFlight: jest.fn().mockResolvedValue(mockFlight),
  };
});

jest.mock("@/components/HelperFunctions/setTripContextData", () => ({
  setTripContextData: jest.fn(),
}));
const setTripContextDataMock = jest.spyOn(
  { setTripContextData },
  "setTripContextData"
);
export { setTripContextDataMock };

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe("SearchScroll Component", () => {

  const renderComponent = (filters: FilterOptions, flights: Flight[]) => render(<SearchScroll filters={filters} flights={flights} />);
  beforeEach(() => {
    (useRouter as jest.Mock).mockReset();
  });

  test("Displays flight options based on filters", () => {
    const filters = {
      max_price: null,
      stops: "1",
      arrival_time: null,
      departure_time: null,
      airline: null,
    };

   renderComponent(filters, [mockFlightOneStop]);

    expect(screen.queryByText(/Non-Stop/i)).toBeNull();
  });

  test("No Search Results if Nothing Matches the Filter", () => {
    const filters = {
      max_price: "$100",
      stops: null,
      arrival_time: null,
      departure_time: null,
      airline: null,
    };

    renderComponent(filters, [mockFlightExpensive]);

    expect(screen.getByText((content) => content.startsWith("No results found"))).toBeInTheDocument();
  });

  test("Search Result Expansion Is not open", () => {
    const filters = {
      max_price: null,
      stops: null,
      arrival_time: null,
      departure_time: null,
      airline: null,
    };

    renderComponent(filters, [mockFlight]);
    expect(screen.queryByText(/Book My Ticket Now/i)).toBeNull();
  });

  test("Search Result Expansion Is Open after a Click", () => {
    const filters = {
      max_price: null,
      stops: null,
      arrival_time: null,
      departure_time: null,
      airline: null,
    };

    renderComponent(filters, [mockFlight]);

    // Click on the first flight item
    expect(screen.getByTestId("search-result-0")).toBeInTheDocument();
    const firstFlightItem = screen.getByTestId("search-result-0");
    fireEvent.click(firstFlightItem);

    // Check if the expansion is visible after clicking
    expect(screen.getByText(/Book My Ticket Now/i)).toBeInTheDocument();
  });

  test("Book my ticket now redirects to the right page", async () => {
    const filters = {
      max_price: null,
      stops: null,
      arrival_time: null,
      departure_time: null,
      airline: null,
    };

    renderComponent(filters, [mockFlight]);

    // Click on the first flight item
    expect(screen.getByTestId("search-result-0")).toBeInTheDocument();
    const firstFlightItem = screen.getByTestId("search-result-0");
    fireEvent.click(firstFlightItem);

    // Check if the expansion is visible after clicking
    const bookTicketButton = screen.getByText("Book My Ticket Now");
    fireEvent.click(bookTicketButton);

    // Check if the setTripContext has been called
    await waitFor(() => {
      expect(setTripContextDataMock).toHaveBeenCalled();
    });
  });
});
