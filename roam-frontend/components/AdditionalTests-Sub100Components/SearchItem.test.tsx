import { render, screen } from "@testing-library/react";
import SearchItem from "@/components/SearchItem";
import { SearchData } from "@/context/SearchContext";
import React from 'react';

// Mock the Zustand store
jest.mock("@/context/SearchContext", () => ({
    useSearchStore: jest.fn().mockImplementation((callback) => {
        const data = {
            searchData: {
                departureAirport: null,
                arrivalAirport: null,
                departureDate: null,
                returnDate: null,
                passengers: 1,
                seatTypeMapping: { 1: "Business" },
                isRoundTrip: true,
                selectedAirlines: [],
            },
        };
        // Call the callback with the data (as it expects a function to be called)
        return callback ? callback(data) : data;
    }),
}));

describe("SearchItem", () => {
    const mockFlight = {
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
            short_name: "CDG",
        },
        departure_time: "11:50PM",
        flight_time_minutes: 1180,
        guid: "c2f05d58-4767-4cfa-b06d-b9b50ab9df1a",
        num_stops: 0,
        price_business: 1550.0,
        price_economy: 950.0,
        seat_configuration: null,
    };

    it("renders the correct logo when logo_path is provided", () => {
        render(<SearchItem index={0} flight={mockFlight} onClick={() => { }} />);

        const imgElement = screen.getByAltText("Left Icon");
        expect(imgElement).toHaveAttribute("src", "/_next/image?url=%2Fimages%2Fairline-logos%2FTAM.png&w=96&q=75");
    });

    it("renders the default logo when logo_path is not provided", () => {
        const mockFlightWithoutLogo = {
            ...mockFlight,
            airline: {
                ...mockFlight.airline,
                logo_path: "", // No logo
            },
        };

        render(<SearchItem index={0} flight={mockFlightWithoutLogo} onClick={() => { }} />);

        const imgElement = screen.getByAltText("Left Icon");
        expect(imgElement).toHaveAttribute("src", "/_next/image?url=%2Fimages%2Fdefault.png&w=96&q=75");
    });
});
