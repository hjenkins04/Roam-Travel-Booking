import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import SeatBooking from "@/components/SeatBooking";
import '@testing-library/jest-dom';
import { fetchFlightSeats } from "@/api/FetchFlightSeats"
import { PossibleSeatStates } from "@/components/SeatSelection/Seat";
import { mockUseTripStore, mockUseLoaderStore, mockCurrentFlight} from '@/components/__tests__/__mocks__/storeMocks';

const mockBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
    push: jest.fn(),
  }),
}));

jest.mock('@/context/TripContext', () => ({
  useTripStore: jest.fn(() => mockUseTripStore),
}));

jest.mock('@/context/LoaderContext', () => ({
  useLoaderStore: jest.fn(() => mockUseLoaderStore),
}));

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
 */

describe("SeatBooking Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => render(<SeatBooking />);

  test("keeps seat state unchanged for non-interactive states", async () => {
    // Mock initial seat state with one seat as "taken"
    mockUseTripStore.getState().tripData = {
      ...mockUseTripStore.getState().tripData
    };

    renderComponent()

    // Simulate clicking on a available seat
    await waitFor(() => {
        expect(screen.getByTestId("seat-1-available")).toBeInTheDocument();
      });

    await act(async () => {
      fireEvent.click(screen.getByTestId("seat-1-available"));
    });

    await act(async () => {
        fireEvent.click(screen.getByTestId("next-passenger-button"));
    });


    // Assert: Ensure that the seat state is still "taken" after attempting to toggle
    await waitFor(() => {
        expect(screen.getByTestId("seat-1-reserved")).toBeInTheDocument();
      });
  });

});
