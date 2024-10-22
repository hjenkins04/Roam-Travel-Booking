import React from 'react'; // Import React
import { render, screen, fireEvent } from '@testing-library/react';
import SearchScroll from '@/components/SearchScroll';
import { useRouter } from 'next/navigation';


// Mock the useRouter hook
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mocking the flightData module
jest.mock('@/public/data/flightData', () => [
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

describe('SearchScroll Component', () => {
    test('displays flight options based on filters', () => {
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

        // Assuming "Delta Airlines" should be displayed in the filtered results
        expect(screen.getByText("Delta Airlines")).toBeInTheDocument();
    });
    test('No Search Results if Nothing Matches the Filter', () => {
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
        expect(screen.getByText((content, element) =>
            content.startsWith("No results found")
        )).toBeInTheDocument();

    });
    test('Search Result Expansion Is not open', () => {
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
        expect(screen.queryByText(/flight details/i)).toBeNull();
    });
    test('Search Result Expansion Is Open after a Click', () => {
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

        // Click on the first flight item (adjust selector as necessary)
        const firstFlightItem = screen.getByText("Delta Airlines"); // Change as needed for your flight item
        fireEvent.click(firstFlightItem);

        // Check if the expansion is visible after clicking
        expect(screen.getByText(/Book My Ticket Now/i)).toBeInTheDocument();

    });

    test('Book my ticket now redirects to the right page', () => {
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

        // Click on the first flight item (adjust selector as necessary)
        const firstFlightItem = screen.getByText("Delta Airlines"); // Change as needed for your flight item
        fireEvent.click(firstFlightItem);

        // Check if the expansion is visible after clicking
        const bookTicketButton = screen.getByText("Book My Ticket Now");
        fireEvent.click(bookTicketButton);
        const router = useRouter();
        expect(router.push).toHaveBeenCalledWith('/checkout');

    });
});