import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Checkout from "../components/Checkout";
import { useTripStore } from "@/context/TripContext";
import { FetchBookingCheckout } from "@/api/FetchBookingCheckout";
import { mockTripData } from "@/components/__tests__/__mocks__/storeMocks";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: jest.fn(),
}));

// Mock FetchBookingCheckout
jest.mock("@/api/FetchBookingCheckout", () => ({
  FetchBookingCheckout: jest.fn(),
}));

// Suppress specific console error
const originalConsoleError = console.error;
jest.spyOn(console, "error").mockImplementation((msg, ...args) => {
  if (typeof msg === "string" && msg.includes("Submission failed:")) return;
  originalConsoleError.call(console, msg, ...args);
});

describe("Checkout Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Set up trip data in the store
    act(() => {
      const { setTripData } = useTripStore.getState();
      setTripData(mockTripData);
    });
  });

  test("renders checkout page with trip details", async () => {
    render(<Checkout />);

    expect(screen.getByText("Complete Booking Payment")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("displays success message on successful payment", async () => {
    render(<Checkout />);

    // Click the payment button
    const payButton = screen.getByText("Confirm and Pay");
    fireEvent.click(payButton);

    // Wait for and verify success message
    await waitFor(() => {
      expect(screen.getByText("Success")).toBeInTheDocument();
    });

    const homeButton = screen.getByText("Home");
    expect(homeButton).toBeInTheDocument();
    fireEvent.click(homeButton);

    // Verify that router.push was called
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("displays error message on payment failure", async () => {
    // Mock FetchBookingCheckout to reject
    (FetchBookingCheckout as jest.Mock).mockRejectedValueOnce(
      new Error("Payment failed")
    );

    render(<Checkout />);

    const payButton = screen.getByText("Confirm and Pay");

    await act(async () => {
      fireEvent.click(payButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });
  });
});
