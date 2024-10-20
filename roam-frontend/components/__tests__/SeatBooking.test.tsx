import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SeatBooking from "@/components/SeatBooking";

/**
 * Test File: SeatBooking Component
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the SeatBooking component.
 * - The SeatBooking component includes:
 *      - Properly rendering the header and airplane components.
 *      - Correctly updating the layout and selected seat state.
 *
 * Test Cases:
 * 1. Renders the SeatBooking component.
 *    - Expectation: The SeatBooking component should render the header and airplane components correctly.
 *
 * 2. Selecting a seat should show the seat selection form.
 *    - Expectation: Clicking a seat should show the seat selection form.
 *
 * 3. Deselecting a seat should hide the seat selection from.
 *    - Expectation: Clicking the same seat twice should deselect it and hide the seat selection form.
 */

describe("SeatBooking Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock the dependent components to focus on SeatBooking behavior
  jest.mock("@/components/SeatSelection/Airplane", () => {
    const Airplane = (props: { onSeatClick: (seatNumber: number) => void }) => (
      <div data-testid="airplane-seat" onClick={() => props.onSeatClick(1)} />
    );
    Airplane.displayName = "Airplane";
    return Airplane;
  });

  jest.mock("@/components/Header", () => {
    const Header = () => <div data-testid="header" />;
    Header.displayName = "Header";
    return Header;
  });

  test("Renders the SeatBooking component", () => {
    // Arrange: Render the SeatBooking component
    render(<SeatBooking />);

    // Assert: Check if the header and airplane components are rendered
    expect(screen.getByTestId("airplane-column")).toBeInTheDocument();
    expect(screen.getByTestId("airplane-svg")).toBeInTheDocument();
    expect(screen.getByTestId("airplane-seat")).toBeInTheDocument();
  });

  test("Selecting a seat should show the seat selection form", () => {
    // Arrange: Render the SeatBooking component
    render(<SeatBooking />);

    // Act: Simulate seat click to select a seat
    fireEvent.click(screen.getByTestId("airplane-seat"));

    // Assert: Ensure that the seat is selected and the seat selection form is shown, i.e. width changes to 2/4
    expect(screen.getByTestId("airplane-column")).toHaveClass("w-2/4");
    expect(screen.getByTestId("booking-form-column")).toHaveClass("w-4/7");
  });

  test("Deselecting a seat should hide the seat selection from", () => {
    // Arrange: Render the SeatBooking component
    render(<SeatBooking />);

    // Act: Click a seat to select it
    fireEvent.click(screen.getByTestId("airplane-seat"));

    // Assert: Check that the seat is selected
    expect(screen.getByTestId("airplane-column")).toHaveClass("w-2/4");

    // Act: Click the same seat again to deselect it
    fireEvent.click(screen.getByTestId("airplane-seat"));

    // Assert: Check that the seat is deselected and the seat selection form is hidden i.e. reverts to full width
    expect(screen.getByTestId("airplane-column")).toHaveClass("w-full");
    expect(screen.queryByTestId("booking-form-column")).not.toBeInTheDocument()
  });
});
