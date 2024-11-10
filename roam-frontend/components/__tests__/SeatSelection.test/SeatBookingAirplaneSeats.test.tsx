// Airplane.test.tsx

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { mockUseTripStore, mockFlight, mockCurrentFlight } from '@/components/__tests__/__mocks__/storeMocks';
import { PossibleSeatStates } from "@/components/SeatSelection/Seat";
import SeatBooking from "@/components/SeatBooking"

jest.mock('@/context/TripContext', () => ({
  useTripStore: jest.fn(() => ({
    tripData: { current_flight: mockFlight },
    setTripData: jest.fn(),
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
  }),
}));

jest.mock('@/context/LoaderContext', () => ({
  useLoaderStore: jest.fn(() => ({
    showLoader: jest.fn(),
    hideLoader: jest.fn(),
  })),
}));


describe("Airplane Component Logic", () => {
  let onSeatClickMock: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    onSeatClickMock = jest.fn();
  });

  test("Initializes seat states based on availability", async () => {
    const originalConsoleError = console.error;
    jest.spyOn(console, 'error').mockImplementation((msg) => {
      if (msg.includes('findDOMNode is deprecated')) {
        return; // Ignore this specific warning
      }
      originalConsoleError(msg); // Allow other warnings to be logged
    });
    
    jest.isolateModules(() => {
      jest.doMock("@/components/SeatSelection/Airplane", () => {
        const AirplaneMock = ({
          seatStates,
          onSeatClick,
        }: {
          seatStates: { [id: number]: PossibleSeatStates };
          onSeatClick: (seatNumber: number) => void;
        }) => (
          <div data-testid="mock-airplane">
            <div data-testid={`seat-1`} onClick={() => onSeatClick(1)}>
              {seatStates[1] || "unknown"}
            </div>
            <div data-testid={`seat-2`} onClick={() => onSeatClick(2)}>
              {seatStates[2] || "unknown"}
            </div>
          </div>
        );
        return {
          __esModule: true,
          default: AirplaneMock,
        };
      });

      const { default: Airplane } = require('@/components/SeatSelection/Airplane');

      const mockSeatStates = {
        1: "available",
        2: "taken",
      };

      render(<Airplane seatStates={mockSeatStates} onSeatClick={onSeatClickMock} areSeatsInitialized={true} />);

      const seat1 = screen.getByTestId("seat-1");
      const seat2 = screen.getByTestId("seat-2");

      expect(seat1).toHaveTextContent("available");
      expect(seat2).toHaveTextContent("taken");
    });
  });

  test("Calls onSeatClick when a seat is clicked", async () => {
    const originalConsoleError = console.error;
    jest.spyOn(console, 'error').mockImplementation((msg) => {
      if (msg.includes('findDOMNode is deprecated')) {
        return; // Ignore this specific warning
      }
      originalConsoleError(msg); // Allow other warnings to be logged
    });

    jest.isolateModules(() => {
      jest.doMock("@/components/SeatSelection/Airplane", () => {
        const AirplaneMock = ({
          onSeatClick,
          seatStates,
        }: {
          onSeatClick: (seatNumber: number) => void;
          seatStates: { [id: number]: PossibleSeatStates };
        }) => (
          <div data-testid="mock-airplane">
            <div data-testid={`seat-1`} onClick={() => onSeatClick(1)}>
              {seatStates[1] || "unknown"}
            </div>
            <div data-testid={`seat-2`} onClick={() => onSeatClick(2)}>
              {seatStates[2] || "unknown"}
            </div>
          </div>
        );
        return {
          __esModule: true,
          default: AirplaneMock,
        };
      });

      const { default: Airplane } = require('@/components/SeatSelection/Airplane');

      const mockSeatStates = {
        1: "available",
        2: "taken",
      };

      render(<Airplane seatStates={mockSeatStates} onSeatClick={onSeatClickMock} areSeatsInitialized={true} />);

      const seat1 = screen.getByTestId("seat-1");
      fireEvent.click(seat1);

      expect(onSeatClickMock).toHaveBeenCalledWith(1);
    });
  });
});
