import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PurchaseItem, {
  ReturnFlightDetails,
  DepartureFlightDetails,
} from "../PurchaseItem";
import { format } from "date-fns";

import {
  mockDisplayPurchasePassenger,
  mockFlightOutbound,
  mockFlightReturn,
  mockAirportOther,
} from "./__mocks__/storeMocks";

/**
 * Test Suite for PurchaseItem Component
 *
 * This suite tests the `PurchaseItem` component, which is responsible for rendering the details
 * of a purchased trip. The component displays information about the outbound and return flights,
 * including flight details, airline, seat assignments, and layover information.
 *
 * The tests cover the following key aspects:
 *
 * 1. Rendering with Outbound and Return Flight Details:
 *    - Verifies that the component correctly renders all the relevant flight details
 *    - Ensures the component handles the case where there is no return flight
 *
 * 2. Cancel Icon Functionality:
 *    - Tests that the cancel icon is rendered and the `onCancelClick` function is called
 *      when the icon is clicked
 *    - Checks that the cancel icon is not rendered when the `ban` prop is `false`
 *
 * 3. Styling and Appearance:
 *    - Ensures the component applies the correct styles based on the flight details
 *
 * 4. Handling of Null/Undefined Values:
 *    - Tests the component's behavior when the `departure_seat` or `return_seat` are not provided
 *    - Verifies the component displays "No seat assigned" in such cases
 *
 * 5. Layover Information Display:
 *    - Checks that the component correctly displays the layover information if it is available
 *    in the `returning_flight` prop
 */

describe("PurchaseItem", () => {
  test("should render the component with outbound and return flight details", () => {
    render(
      <PurchaseItem
        purchasePassenger={mockDisplayPurchasePassenger}
        onCancelClick={() => {}}
      />
    );

    // Check for outbound flight details
    expect(
      screen.getByText(
        format(mockDisplayPurchasePassenger.departure_date, "MMMM do, yyyy")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Departing ${mockFlightOutbound.departure_airport.iata_code}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("departure-flight-airline-logo")
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockFlightOutbound.airline.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockDisplayPurchasePassenger.departure_seat)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockFlightOutbound.baggage_allowance)
    ).toBeInTheDocument();
    expect(screen.getByText("5h")).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockFlightOutbound.departure_time} - ${mockFlightOutbound.arrival_time}`
      )
    ).toBeInTheDocument();

    // Check for return flight details
    expect(
      screen.getByText(
        format(mockDisplayPurchasePassenger.return_date, "MMMM do, yyyy")
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("return-flight-departure")).toHaveTextContent(
      `Departing ${mockFlightReturn.departure_airport.iata_code}`
    );
    expect(
      screen.getByTestId("return-flight-airline-logo")
    ).toBeInTheDocument();
    expect(screen.getByText(mockFlightReturn.airline.name)).toBeInTheDocument();
    expect(
      screen.getByText(mockDisplayPurchasePassenger.return_seat)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockFlightReturn.baggage_allowance)
    ).toBeInTheDocument();
    expect(screen.getByText("8h 20min")).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockFlightReturn.departure_time} - ${mockFlightReturn.arrival_time}`
      )
    ).toBeInTheDocument();
  });

  test("should render the component without a return flight", () => {
    const { queryByTestId } = render(
      <PurchaseItem
        purchasePassenger={{
          ...mockDisplayPurchasePassenger,
          returning_flight: null,
        }}
        onCancelClick={() => {}}
      />
    );

    expect(queryByTestId("return-flight-departure")).not.toBeInTheDocument();
  });

  test("should call the onCancelClick function when the cancel icon is clicked", () => {
    const mockOnCancelClick = jest.fn();
    render(
      <PurchaseItem
        purchasePassenger={mockDisplayPurchasePassenger}
        onCancelClick={mockOnCancelClick}
      />
    );

    fireEvent.click(screen.getByTestId("cancel-icon"));
    expect(mockOnCancelClick).toHaveBeenCalledTimes(1);
  });

  test("should not render the cancel icon if ban prop is false", () => {
    render(
      <PurchaseItem
        purchasePassenger={mockDisplayPurchasePassenger}
        onCancelClick={() => {}}
        ban={false}
      />
    );
    expect(screen.queryByTestId("cancel-icon")).not.toBeInTheDocument();
  });

  test("should apply styles based on flight details", () => {
    render(
      <PurchaseItem
        purchasePassenger={mockDisplayPurchasePassenger}
        onCancelClick={() => {}}
      />
    );

    const section = screen.getByRole("section");
    expect(section).toHaveClass(
      "bg-white",
      "rounded-lg",
      "border",
      "border-gray-200"
    );
  });

  test('should display "No seat assigned" when departure_seat is not provided', () => {
    render(
      <PurchaseItem
        purchasePassenger={{
          ...mockDisplayPurchasePassenger,
          departure_seat: null,
        }}
        onCancelClick={() => {}}
      />
    );
    expect(screen.getByText("No seat assigned")).toBeInTheDocument();
  });
});

describe("DepartureFlightDetails", () => {
  test("should render the departure flight details correctly", () => {
    render(
      <DepartureFlightDetails
        purchasePassenger={mockDisplayPurchasePassenger}
      />
    );

    expect(
      screen.getByText(
        format(mockDisplayPurchasePassenger.departure_date, "MMMM do, yyyy")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Departing ${mockFlightOutbound.departure_airport.iata_code}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("departure-flight-airline-logo")
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockFlightOutbound.airline.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockDisplayPurchasePassenger.departure_seat)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockFlightOutbound.baggage_allowance)
    ).toBeInTheDocument();
    expect(screen.getByText("5h")).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockFlightOutbound.departure_time} - ${mockFlightOutbound.arrival_time}`
      )
    ).toBeInTheDocument();
  });

  test("should not render anything if the purchasePassenger prop is null", () => {
    const { container } = render(
      <DepartureFlightDetails purchasePassenger={null} />
    );
    expect(container.firstChild).toBeNull();
  });
});

describe("ReturnFlightDetails", () => {
  test("should render the return flight details correctly", () => {
    render(
      <ReturnFlightDetails purchasePassenger={mockDisplayPurchasePassenger} />
    );

    expect(
      screen.getByText(
        format(mockDisplayPurchasePassenger.return_date, "MMMM do, yyyy")
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("return-flight-departure")).toHaveTextContent(
      `Departing ${mockFlightReturn.departure_airport.iata_code}`
    );
    expect(
      screen.getByTestId("return-flight-airline-logo")
    ).toBeInTheDocument();
    expect(screen.getByText(mockFlightReturn.airline.name)).toBeInTheDocument();
    expect(
      screen.getByText(mockDisplayPurchasePassenger.return_seat)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockFlightReturn.baggage_allowance)
    ).toBeInTheDocument();
    expect(screen.getByText("8h 20min")).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockFlightReturn.departure_time} - ${mockFlightReturn.arrival_time}`
      )
    ).toBeInTheDocument();
  });

  test("should not render anything if the returning_flight prop is null", () => {
    const { container } = render(
      <ReturnFlightDetails
        purchasePassenger={{
          ...mockDisplayPurchasePassenger,
          returning_flight: null,
        }}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test("should apply styles based on flight details", () => {
    render(
      <ReturnFlightDetails purchasePassenger={mockDisplayPurchasePassenger} />
    );

    const section = screen.getByRole("region");
    expect(section).toHaveClass(
      "flex",
      "flex-col",
      "max-md:ml-0",
      "max-md:w-full"
    );
  });

  test('should display "No seat assigned" when return_seat is not provided', () => {
    render(
      <ReturnFlightDetails
        purchasePassenger={{
          ...mockDisplayPurchasePassenger,
          return_seat: null,
        }}
      />
    );
    expect(screen.getByText("No seat assigned")).toBeInTheDocument();
  });

  test("should display the layover information if available", () => {
    render(
      <ReturnFlightDetails
        purchasePassenger={{
          ...mockDisplayPurchasePassenger,
          returning_flight: {
            ...mockFlightReturn,
            layover: {
              duration_minutes: 120,
              airport: mockAirportOther,
              guid: "layover",
            },
          },
        }}
      />
    );
    expect(screen.getByText("2h in YYZ")).toBeInTheDocument();
  });
});
