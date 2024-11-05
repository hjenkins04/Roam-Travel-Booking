import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PurchaseItem from "../PurchaseItem";
import { mockDisplayPurchasePassenger, mockFlightOutbound, mockFlightReturn } from '@/components/__tests__/__mocks__/storeMocks';
import { formatTimeMinutes, getFlightIdString, getLayoverSummary } from "@/models"

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
 * 
 * 3. Don't render the cancel button and when ban is set to false.
 *   - Expectation: the Ban icon is not rendered.
 */

describe("PurchaseItem Component", () => {
  const mockCancelClick = jest.fn();

  const renderComponent = (ban: boolean) => render(
    <PurchaseItem
      ban={ban}
      purchasePassenger={mockDisplayPurchasePassenger}
      onCancelClick={mockCancelClick}
    />
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renders title, outbound flight, and return flight information", () => {
    renderComponent(true)

    // Check that the outbound flight information is rendered
    expect( screen.getByText(`Departing ${mockFlightOutbound.departure_airport.iata_code}`)).toBeInTheDocument();
    expect(screen.getByText(mockFlightOutbound.airline.name)).toBeInTheDocument();
    expect( screen.getByText(getFlightIdString(mockFlightOutbound)) ).toBeInTheDocument();
    expect(screen.getByText(formatTimeMinutes(mockFlightOutbound.flight_time_minutes))).toBeInTheDocument();
    expect(screen.getByText(`${mockFlightOutbound.departure_time} - ${mockFlightOutbound.arrival_time}`)).toBeInTheDocument();
    expect(screen.getByText(getLayoverSummary(mockFlightOutbound))).toBeInTheDocument();

    // Check that return flight information is rendered
    expect( screen.getByText(`Departing ${mockFlightReturn.departure_airport.iata_code}`)).toBeInTheDocument();
    expect(screen.getByText(mockFlightReturn.airline.name)).toBeInTheDocument();
    expect( screen.getByText(getFlightIdString(mockFlightReturn)) ).toBeInTheDocument();
    expect(screen.getByText(formatTimeMinutes(mockFlightReturn.flight_time_minutes))).toBeInTheDocument();
    expect(screen.getByText(`${mockFlightReturn.departure_time} - ${mockFlightReturn.arrival_time}`)).toBeInTheDocument();
  });

  test("Check that the cancel button is rendered and triggers the function once", () => {
    renderComponent(true)

    const cancelButton = screen.getByTestId("cancel-icon");
    fireEvent.click(cancelButton);

    expect(cancelButton).toBeInTheDocument();
    expect(mockCancelClick).toHaveBeenCalledTimes(1);
  });

  test("Check that the cancel button is not rendered when ban is passed as false", () => {
    renderComponent(false)

    const cancelButton = screen.queryByTestId("cancel-icon");

    expect(cancelButton).not.toBeInTheDocument();
    expect(mockCancelClick).toHaveBeenCalledTimes(0);
  });
});
