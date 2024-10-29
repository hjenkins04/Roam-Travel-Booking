import React from "react"; // Import React
import { render, screen, fireEvent } from "@testing-library/react";
import SearchScroll from "@/components/SearchScroll";
import { useRouter } from "next/navigation";
import Image from "next/image";

/**
 * Test File: Search Scroll Component
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

interface ImageProps {
  src: string;
  alt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow any additional props
}

jest.mock("next/image", () => {
  return function MockImage({ src, alt, ...props }: ImageProps) {
    return <img src={src} alt={alt} {...props} />;
  };
});
// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking the flightData module
jest.mock("@/public/data/flightData", () => [
  {
    outgoingAirport: "JFK",
    incomingAirport: "LAX",
    outgoingAirportName: "John F. Kennedy International Airport",
    incomingAirportName: "Los Angeles International Airport",
    tripLength: "6h 30m",
    price: "$300",
    airline: "Delta Airlines",
    flightDate: "2024-10-21",
    departureTime: "10:00 AM",
    arrivalTime: "1:30 PM",
    baggageAllowance: "1 Carry-on, 1 Checked",
    numStops: 0,
  },
]);

describe("SearchScroll Component", () => {
  test("Displays flight options based on filters", () => {
    const filters = {
      maxPrice: null,
      stops: "1",
      arrivalTime: null,
      departureTime: null,
      airline: null,
    };

    // Mock the router's push function
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    render(<SearchScroll filters={filters} />);

    expect(screen.queryByText(/Non-Stop/i)).toBeNull();
  });
  test("No Search Results if Nothing Matches the Filter", () => {
    const filters = {
      maxPrice: "$100",
      stops: null,
      arrivalTime: null,
      departureTime: null,
      airline: null,
    };

    // Mock the router's push function
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    render(<SearchScroll filters={filters} />);
    expect(
      screen.getByText((content) => content.startsWith("No results found"))
    ).toBeInTheDocument();
  });
  test("Search Result Expansion Is not open", () => {
    const filters = {
      maxPrice: null,
      stops: null,
      arrivalTime: null,
      departureTime: null,
      airline: null,
    };

    // Mock the router's push function
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    render(<SearchScroll filters={filters} />);
    expect(screen.queryByText(/Book My Ticket Now/i)).toBeNull();
  });
  test("Search Result Expansion Is Open after a Click", () => {
    const filters = {
      maxPrice: null,
      stops: null,
      arrivalTime: null,
      departureTime: null,
      airline: null,
    };

    // Mock the router's push function
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    render(<SearchScroll filters={filters} />);

    // Click on the first flight item
    const firstFlightItem = screen.getByText("Delta Airlines");
    fireEvent.click(firstFlightItem);

    // Check if the expansion is visible after clicking
    expect(screen.getByText(/Book My Ticket Now/i)).toBeInTheDocument();
  });

  test("Book my ticket now redirects to the right page", () => {
    const filters = {
      maxPrice: null,
      stops: null,
      arrivalTime: null,
      departureTime: null,
      airline: null,
    };

    // Mock the router's push function
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    render(<SearchScroll filters={filters} />);

    // Click on the first flight item
    const firstFlightItem = screen.getByText("Delta Airlines");
    fireEvent.click(firstFlightItem);

    // Check if the expansion is visible after clicking
    const bookTicketButton = screen.getByText("Book My Ticket Now");
    fireEvent.click(bookTicketButton);
    const router = useRouter();
    expect(router.push).toHaveBeenCalledWith("/checkout");
  });
});
