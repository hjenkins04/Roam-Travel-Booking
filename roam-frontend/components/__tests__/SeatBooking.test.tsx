import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import SeatBooking from "@/components/SeatBooking";
import '@testing-library/jest-dom';
import { mockUseTripStore, mockUseLoaderStore } from '@/components/__tests__/__mocks__/storeMocks';

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
  }),
}));

jest.mock('@/context/TripContext', () => ({
  useTripStore: jest.fn(() => mockUseTripStore),
}));

jest.mock('@/context/LoaderContext', () => ({
  useLoaderStore: jest.fn(() => mockUseLoaderStore),
}));


jest.mock("@/components/SeatSelection/Airplane", () => {
  const onSeatClickMock = jest.fn();

  const MockAirplane = (props: { onSeatClick: (seatNumber: number) => void }) => (
    <div
      data-testid="airplane-seat"
      onClick={() => {
        props.onSeatClick(1);
        onSeatClickMock();
      }}
    >
      Mock Airplane
    </div>
  );

  MockAirplane.displayName = "Airplane";
  return {
    __esModule: true,
    default: MockAirplane,
    onSeatClickMock
  };
});

jest.mock('@/api/FetchFlightSeats', () => ({
  fetchFlightSeats: jest.fn().mockResolvedValue({
    guid: "mock-guid",
    seats_available: 1,
    flight_id: "mock-flight-id",
    seat_configuration: [
      {
        seat_id: 1,
        type: "Economy",
        position: "Window",
        available: true,
      },
    ],
  }),
}));

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

  const renderComponent = () => render(<SeatBooking />);

  test("Renders the SeatBooking component", async () => {
    // Arrange: Render the SeatBooking component
    await act(async () => {
      renderComponent();
    } );

    // Assert: Check if the header and airplane components are rendered
    await waitFor(() => {
      expect(screen.getByTestId("airplane-column")).toBeInTheDocument();
      expect(screen.getByTestId("airplane-svg")).toBeInTheDocument();
      expect(screen.getByTestId("airplane-seat")).toBeInTheDocument();
    });
  });

  test("Selecting a seat should show the seat selection form", async () => {
    const { onSeatClickMock } = jest.requireMock("@/components/SeatSelection/Airplane");

    // Arrange: Render the SeatBooking component
    await act(async () => {
      renderComponent();
    });

    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat")).toBeInTheDocument();
    });

    // Act: Select a seat
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat"));
    });

    // Assert: Ensure that the seat was clicked
    expect(onSeatClickMock).toHaveBeenCalled();

    // Assert: Ensure that the seat is selected and the seat selection form is shown, i.e. width changes to 2/4
    await waitFor(() => {
      expect(screen.getByTestId("airplane-column")).toHaveClass("w-2/4");
      expect(screen.getByTestId("booking-form-column")).toHaveClass("w-4/7");
    });
  });

  test("Deselecting a seat should hide the seat selection from", async () => {
    const { onSeatClickMock } = jest.requireMock("@/components/SeatSelection/Airplane");
    
    // Arrange: Render the SeatBooking component
    await act(async () => {
      renderComponent();
    });

    // Assert: Ensure that the seat is visible
    await waitFor(() => {
      expect(screen.getByTestId("airplane-seat")).toBeInTheDocument();
    });

    // Act: Click a seat to select it
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat"));
    });

    // Assert: Ensure that the seat was clicked
    expect(onSeatClickMock).toHaveBeenCalled();

    // Assert: Check that the seat is selected
    await waitFor(() => {
      expect(screen.getByTestId("airplane-column")).toHaveClass("w-2/4");
    });

    // Act: Click the same seat again to deselect it
    await act(async () => {
      fireEvent.click(screen.getByTestId("airplane-seat"));
    });

    // Assert: Ensure that the seat was clicked
    expect(onSeatClickMock).toHaveBeenCalled();

    // Assert: Check that the seat is deselected and the seat selection form is hidden i.e. reverts to full width
    await waitFor(() => {
      expect(screen.getByTestId("airplane-column")).toHaveClass("w-full");
      expect(screen.queryByTestId("booking-form-column")).not.toBeInTheDocument()
    });
  });
});
