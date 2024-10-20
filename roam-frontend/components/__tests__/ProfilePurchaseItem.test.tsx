import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PurchaseItem from "../PurchaseItem";

/**
 * Test File: PurchaseItem Component
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the PurchaseItem component.
 * - The PurchaseItem component includes:
 *      - Rendering of correct flight information for both outbound and return flights.
 *      - Handling the cancel button (Ban icon) click.
 *
 * Test Cases:
 * 1. Render the title, outbound flight, and return flight information passed as props.
 *    - Expectation: the title, outbound flight, and return flight details should be rendered correctly.
 *
 * 2. Render the cancel button and test its functionality.
 *    - Expectation: the Ban icon should be rendered and should trigger a function once on click.
 */

describe("PurchaseItem Component", () => {
  const mockOutboundFlight = {
    date: "2024-11-01",
    departure: "New York (JFK)",
    airline: "Delta Airlines",
    flightNumber: "DL 2024",
    seat: "12A",
    duration: "6h 30m",
    departureTime: "08:00 AM",
    arrivalTime: "02:30 PM",
    layover: "2h in Boston",
  };
  const mockReturnFlight = {
    date: "2024-11-10",
    departure: "San Francisco (SFO)",
    airline: "United Airlines",
    flightNumber: "UA 123",
    seat: "14B",
    duration: "6h 15m",
    departureTime: "10:00 AM",
    arrivalTime: "04:15 PM",
  };
  const mockCancelClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renders title, outbound flight, and return flight information", () => {
    render(
      <PurchaseItem
        title="My Flight Booking"
        outboundFlight={mockOutboundFlight}
        returnFlight={mockReturnFlight}
        onCancelClick={mockCancelClick}
      />
    );

    // Check that the outbound flight information is rendered
    expect(screen.getByText(mockOutboundFlight.date)).toBeInTheDocument();
    expect(
      screen.getByText(`Departing ${mockOutboundFlight.departure}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockOutboundFlight.airline)).toBeInTheDocument();
    expect(
      screen.getByText(mockOutboundFlight.flightNumber)
    ).toBeInTheDocument();
    expect(screen.getByText(mockOutboundFlight.seat)).toBeInTheDocument();
    expect(screen.getByText(mockOutboundFlight.duration)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockOutboundFlight.departureTime} - ${mockOutboundFlight.arrivalTime}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(mockOutboundFlight.layover)).toBeInTheDocument();

    // Check that return flight information is rendered
    expect(screen.getByText(mockReturnFlight.date)).toBeInTheDocument();
    expect(
      screen.getByText(`Departing ${mockReturnFlight.departure}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockReturnFlight.airline)).toBeInTheDocument();
    expect(screen.getByText(mockReturnFlight.flightNumber)).toBeInTheDocument();
    expect(screen.getByText(mockReturnFlight.seat)).toBeInTheDocument();
    expect(screen.getByText(mockReturnFlight.duration)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockReturnFlight.departureTime} - ${mockReturnFlight.arrivalTime}`
      )
    ).toBeInTheDocument();
  });

  test("Check that the cancel button is rendered and triggers the function once", () => {
    render(
      <PurchaseItem
        title="My Flight Booking"
        outboundFlight={mockOutboundFlight}
        returnFlight={mockReturnFlight}
        onCancelClick={mockCancelClick}
      />
    );

    const cancelButton = screen.getByTestId("cancel-icon");
    fireEvent.click(cancelButton);

    expect(cancelButton).toBeInTheDocument();
    expect(mockCancelClick).toHaveBeenCalledTimes(1);
  });
});
