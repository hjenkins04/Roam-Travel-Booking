import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PurchaseItem from "../PurchaseItem";
import {
  mockDisplayPurchasePassenger,
  mockFlightOutbound,
  mockFlightReturn,
} from "@/components/__tests__/__mocks__/storeMocks";
import {
  formatTimeMinutes,
  getFlightIdString,
  getLayoverSummary,
} from "@/models";
import { format } from "date-fns";

/**
 * Test Suite for `PurchaseItem` Component
 *
 * This suite tests the `PurchaseItem` component, ensuring correct rendering and functionality
 * for various scenarios involving flight details and the cancel button.
 *
 * The component displays information related to departing and returning flights for a passenger,
 * as well as handles user interactions like clicking the cancel button.
 *
 * Test Cases:
 * 1. **Renders flight details correctly**:
 *    - Verifies that outbound and return flight details, such as departure airport, airline, flight ID,
 *      flight time, and layover summary, are displayed properly.
 *
 * 2. **Cancel button functionality**:
 *    - Ensures the cancel button (Ban icon) is rendered when `ban` is `true` and triggers the `onCancelClick` function when clicked.
 *
 * 3. **Cancel button visibility**:
 *    - Ensures the cancel button is not rendered when `ban` is set to `false`.
 *
 * 4. **Handling null flight details**:
 *    - Verifies that no flight details are rendered when either the `departing_flight` or `returning_flight`
 *      is `null` in the `purchasePassenger` object.
 *
 * 5. **Flight details rendering when both flights exist**:
 *    - Ensures that flight details are rendered when both `departing_flight` and `returning_flight` are provided.
 *
 * 6. **Formatted flight dates rendering**:
 *    - Verifies that departure and return flight dates are formatted correctly using the `format` function.
 *
 * 7. **Non-rendering of outbound flight details when `departing_flight` is null**:
 *    - Verifies that the outbound flight details are not rendered when `departing_flight` is `null`.
 *
 * 8. **Non-rendering of return flight details when `returning_flight` is null**:
 *    - Verifies that the return flight details are not rendered when `returning_flight` is `null`.
 */

describe("PurchaseItem Component", () => {
  const mockCancelClick = jest.fn();

  const renderComponent = (ban: boolean, purchasePassenger: any) =>
    render(
      <PurchaseItem
        ban={ban}
        purchasePassenger={purchasePassenger}
        onCancelClick={mockCancelClick}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renders title, outbound flight, and return flight information", () => {
    renderComponent(true, mockDisplayPurchasePassenger);

    // Check that the outbound flight information is rendered
    expect(
      screen.getByText(
        `Departing ${mockFlightOutbound.departure_airport.iata_code}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockFlightOutbound.airline.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(getFlightIdString(mockFlightOutbound))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        formatTimeMinutes(mockFlightOutbound.flight_time_minutes)
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockFlightOutbound.departure_time} - ${mockFlightOutbound.arrival_time}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(getLayoverSummary(mockFlightOutbound))
    ).toBeInTheDocument();

    // Check that return flight information is rendered
    expect(
      screen.getByText(
        `Departing ${mockFlightReturn.departure_airport.iata_code}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(mockFlightReturn.airline.name)).toBeInTheDocument();
    expect(
      screen.getByText(getFlightIdString(mockFlightReturn))
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatTimeMinutes(mockFlightReturn.flight_time_minutes))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockFlightReturn.departure_time} - ${mockFlightReturn.arrival_time}`
      )
    ).toBeInTheDocument();
  });

  test("Check that the cancel button is rendered and triggers the function once", () => {
    renderComponent(true, mockDisplayPurchasePassenger);

    const cancelButton = screen.getByTestId("cancel-icon");
    fireEvent.click(cancelButton);

    expect(cancelButton).toBeInTheDocument();
    expect(mockCancelClick).toHaveBeenCalledTimes(1);
  });

  test("Check that the cancel button is not rendered when ban is passed as false", () => {
    renderComponent(false, mockDisplayPurchasePassenger);

    const cancelButton = screen.queryByTestId("cancel-icon");

    expect(cancelButton).not.toBeInTheDocument();
    expect(mockCancelClick).toHaveBeenCalledTimes(0);
  });

  test("Check that no flight details are rendered when departing_flight or returning_flight are null", () => {
    const passengerWithNoFlights = {
      ...mockDisplayPurchasePassenger,
      departing_flight: null,
      returning_flight: null,
    };

    renderComponent(true, passengerWithNoFlights);

    // Ensure that no outbound flight details are rendered
    expect(screen.queryByText("Departing")).toBeNull();
    expect(screen.queryByText(mockFlightOutbound.airline.name)).toBeNull();
    expect(
      screen.queryByText(getFlightIdString(mockFlightOutbound))
    ).toBeNull();

    // Ensure that no return flight details are rendered
    expect(screen.queryByText("Departing")).toBeNull();
    expect(screen.queryByText(mockFlightReturn.airline.name)).toBeNull();
    expect(screen.queryByText(getFlightIdString(mockFlightReturn))).toBeNull();
  });

  test("Check that flight details are rendered when departing_flight and returning_flight exist", () => {
    renderComponent(true, mockDisplayPurchasePassenger);

    // Ensure outbound flight details are rendered
    expect(
      screen.getByText(
        `Departing ${mockFlightOutbound.departure_airport.iata_code}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockFlightOutbound.airline.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(getFlightIdString(mockFlightOutbound))
    ).toBeInTheDocument();

    // Ensure return flight details are rendered if they exist
    if (mockFlightReturn) {
      expect(
        screen.getByText(
          `Departing ${mockFlightReturn.departure_airport.iata_code}`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockFlightReturn.airline.name)
      ).toBeInTheDocument();
      expect(
        screen.getByText(getFlightIdString(mockFlightReturn))
      ).toBeInTheDocument();
    }
  });

  test("Render formatted departure flight dates correctly", () => {
    renderComponent(true, mockDisplayPurchasePassenger);

    // Check formatted departure date
    const formattedDepartureDate = format(
      new Date(mockFlightOutbound.departure_time),
      "MMMM do, yyyy"
    );
    expect(screen.getByText(formattedDepartureDate)).toBeInTheDocument();

    // Check formatted return date (if return flight exists)
    const formattedReturnDate = format(
      new Date(mockFlightOutbound.arrival_time),
      "MMMM do, yyyy"
    );
    expect(screen.getByText(formattedReturnDate)).toBeInTheDocument();
  });

  test("Don't render flight details when departing_flight is null", () => {
    const passengerWithoutOutboundFlight = {
      ...mockDisplayPurchasePassenger,
      departing_flight: null,
    };
    renderComponent(true, passengerWithoutOutboundFlight);

    // Check that the outbound flight details are not rendered
    expect(
      screen.queryByText(
        `Departing ${mockFlightOutbound.departure_airport.iata_code}`
      )
    ).not.toBeInTheDocument();
  });

  test("Don't render flight details when returning_flight is null", () => {
    const passengerWithoutReturnFlight = {
      ...mockDisplayPurchasePassenger,
      returning_flight: null,
    };
    renderComponent(true, passengerWithoutReturnFlight);

    // Check that the return flight details are not rendered
    expect(
      screen.queryByText(
        `Departing ${mockFlightReturn.departure_airport.iata_code}`
      )
    ).not.toBeInTheDocument();
  });
});
