import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Seat, { SeatProps } from "@/components/SeatSelection/Seat";

/**
 * Test File: Seat Component
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the Seat component.
 * - The Seat component includes:
 *      - Render the seat as a rectangle with correct color based on seat type and seat state.
 *      - Handle click events properly when the seat is available or selected.
 *      - Render the checkmark icon when the seat is selected.
 *
 * Test Cases:
 * 1. Renders a seat with the correct fill color based on its state and type.
 *    - Expectation: The fill color of the seat rectangle should match the expected color for each state/type combination.
 *
 * 2. Renders a checkmark icon when the seat is selected.
 *    - Expectation: The checkmark icon should be visible when the seat is selected.
 *
 * 3. Does not render a checkmark icon when the seat is not selected.
 *    - Expectation: The checkmark icon should not be visible when the seat is not selected.
 *
 * 4. Does not handle clicks when the seat is in loading or taken.
 *    - Expectation: The onSeatClick function should not be called when the seat is loading or taken.
 *
 * 5. Handles click events when the seat is available or selected.
 *    - Expectation: The onSeatClick function should be called with the seat id when the seat is clicked and it's available or selected.
 *
 * 6. Seat has correct cursor based on its state.
 *    - Expectation: The cursor should be pointer when the seat is available or selected and not-allowed when loading or taken.
 */

describe("Seat Booking Seat Component", () => {
  // Arrange: Set up reusable default props
  const defaultProps: SeatProps = {
    id: 1,
    x: 10,
    y: 10,
    width: 50,
    height: 50,
    rx: 5,
    seatType: "business",
    seatState: "available",
    onSeatClick: jest.fn(),
    areSeatsInitialized: true,
  };

  const seatTestIdRegex = new RegExp(`^seat-\\d+-[a-zA-Z]+$`);
  const seatRectTestIdRegex = new RegExp(`^seat-rect-\\d+$`);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders a seat with the correct fill color based on its state and type", () => {
    // Arrange: Create a buisness availiable seat
    const { rerender } = render(<Seat {...defaultProps} seatType="business" seatState="available" />);
    let seatRect = screen.getByTestId(seatRectTestIdRegex);
    
    // Assert: Check that the seat has the correct fill color for a business and available seat
    expect(seatRect).toHaveAttribute("fill", "#E15454");

    // Arrange: Create a economy taken seat
    rerender(<Seat {...defaultProps} seatType="economy" seatState="taken" />);
    seatRect = screen.getByTestId(seatRectTestIdRegex);

    // Assert: Check that the seat has the correct fill color for a economy and taken seat
    expect(seatRect).toHaveAttribute("fill", "#FFE8D9");

    // Arrange: Create a loading seat
    rerender(<Seat {...defaultProps} seatState="loading" />);
    seatRect = screen.getByTestId(seatRectTestIdRegex);
    
    // Assert: Check that the seat has the correct fill color for a loading seat
    expect(seatRect).toHaveAttribute("fill", "#cccccc");
  });

  test("Renders a checkmark icon when the seat is selected", () => {
    // Arrange: Render a selected seat
    render(<Seat {...defaultProps} seatState="selected" />);

    // Act: Look for the checkmark element
    const checkmark = screen.getByTestId("checkmark");

    // Assert: Check that the checkmark icon exists
    expect(checkmark).toBeInTheDocument();
  });

  test("Does not render a checkmark icon when the seat is not selected", () => {
    // Arrange: Render a non selected seat
    render(<Seat {...defaultProps} seatState="available" />);

    // Act:  Look for the checkmark element
    const checkmark = screen.queryByTestId("checkmark");

    // Assert: Check that the checkmark icon doesn't exists
    expect(checkmark).not.toBeInTheDocument();
  });

  test("Does not handle clicks when the seat is loading or taken", () => {
    // Arrange: Render a loading seat
    const { rerender } = render(<Seat {...defaultProps} seatState="loading" />);
    let seat = screen.getByTestId(seatTestIdRegex);
    
    // Act: Try clicking the seat
    fireEvent.click(seat);

    // Assert: Verify that onSeatClick was not called
    expect(defaultProps.onSeatClick).not.toHaveBeenCalled();

    // Arrange: Render a taken seat
    rerender(<Seat {...defaultProps} seatState="taken" />);
    seat = screen.getByTestId(seatTestIdRegex);

    // Act: Try clicking the seat
    fireEvent.click(seat);

    // Assert: Verify that onSeatClick was not called
    expect(defaultProps.onSeatClick).not.toHaveBeenCalled();
  });

  test("Handles click events when the seat is available or selected", () => {
    // Arrange: Render an available seat
    render(<Seat {...defaultProps} seatState="available" />);
    const seat = screen.getByTestId(seatTestIdRegex);

    // Act: Try clicking the seat
    fireEvent.click(seat);

    // Assert: Verify onSeatClick was called with the correct seat id
    expect(defaultProps.onSeatClick).toHaveBeenCalledWith(defaultProps.id);
  });

  test("Seat has correct cursor based on its state", () => {
    // Arrange: Render an available seat
    const { rerender } = render(<Seat {...defaultProps} seatState="available" />);
    let seatRect = screen.getByTestId(seatRectTestIdRegex);

    // Assert: Verify cursor is pointer for available state
    expect(seatRect).toHaveClass("cursor-pointer");

    // Arrange: Render a taken seat
    rerender(<Seat {...defaultProps} seatState="taken" />);
    seatRect = screen.getByTestId(seatRectTestIdRegex);

    // Assert: Verify cursor is cursor-not-allowed for taken seat
    expect(seatRect).toHaveClass("cursor-not-allowed");
  });
});
