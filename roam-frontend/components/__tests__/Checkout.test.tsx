import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Checkout from "../Checkout";
import { useRouter } from "next/navigation";
import { useTripStore } from "@/context/TripContext";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@/context/TripContext", () => ({
  useTripStore: jest.fn(),
}));

jest.mock("@/api/FetchBookingCheckout", () => ({
  FetchBookingCheckout: jest.fn().mockResolvedValue({ status: "success" }),
}));

describe("Checkout Page", () => {
  const mockPush = jest.fn();
  const mockTripData = {
    trip: {
      passengers: [
        { name: "John Doe", departing_seat_id: 1, returning_seat_id: 2 },
      ],
      total_cost: 1000,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useTripStore as unknown as jest.Mock).mockReturnValue({
      tripData: mockTripData,
    });
    global.fetch = jest.fn();
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
      expect(screen.getByText("View Purchases")).toBeInTheDocument();
    });

    const viewPurchasesButton = screen.getByText("View Purchases");
    fireEvent.click(viewPurchasesButton);

    // Verify that router.push was called
    expect(mockPush).toHaveBeenCalled();
  });

  test("displays error message on payment failure", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Payment failed"));

    render(<Checkout />);

    const payButton = screen.getByText("Confirm and Pay");
    fireEvent.click(payButton);

    await waitFor(() => {
      expect(screen.getByText("Failed")).toBeInTheDocument();
    });

    (global.fetch as jest.Mock).mockRestore();
  });
});
