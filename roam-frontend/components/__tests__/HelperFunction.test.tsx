/**
 * Test Suite for Flight Helper Functions
 *
 * This suite tests various utility functions for handling flight-related data,
 * including time formatting, layover summaries, seat assignments, and price calculations.
 *
 * Test coverage includes:
 * - Time formatting for different durations
 * - Layover and stop information processing
 * - Seat type and pricing logic
 * - Flight seat summary generation
 * - Trip to purchase mapping
 * - Cost calculations including taxes
 */

import {
  formatTimeMinutes,
  getLayoverSummary,
  getStopSummary,
  getPriceByPassengerType,
  getSeatTypeByPassengerType,
  getDepartingFlightSeatSummary,
  getReturningFlightSeatSummary,
  getFlightIdString,
  getNameOrDefault,
  mapTripToPurchase,
  calculateSubtotal,
  calculateTax,
  getSeatType,
} from "../../models/helper_functions";

import { Trip } from "@/models";
import {
  mockFlightOutbound,
  mockFlightReturn,
  mockTrip,
  mockTripOneWay,
  mockTripNoSeats,
} from "@/components/__tests__/__mocks__/storeMocks";

type SeatTypeMapping = { [index: number]: "Economy" | "Business" };

describe("Time Formatting", () => {
  test("formats minutes less than 60", () => {
    expect(formatTimeMinutes(45)).toBe("45min");
  });

  test("formats hours without minutes", () => {
    expect(formatTimeMinutes(120)).toBe("2h");
  });

  test("formats hours with minutes", () => {
    expect(formatTimeMinutes(150)).toBe("2h 30min");
  });
});

describe("Layover Information", () => {
  test("returns empty string for no layover", () => {
    expect(getLayoverSummary(mockFlightReturn)).toBe("");
  });

  test("returns formatted layover summary", () => {
    expect(getLayoverSummary(mockFlightOutbound)).toBe("1h 30min in YVR");
  });

  test("returns correct stop summary for direct flight", () => {
    expect(getStopSummary(mockFlightReturn)).toBe("Nonstop");
  });

  test("returns correct stop summary for flight with layover", () => {
    expect(getStopSummary(mockFlightOutbound)).toBe("1 stop");
  });
});

describe("Price and Seat Type Calculations", () => {
  const economyMapping: SeatTypeMapping = { 1: "Economy", 2: "Economy" };
  const businessMapping: SeatTypeMapping = { 1: "Business", 2: "Business" };
  const mixedMapping: SeatTypeMapping = { 1: "Economy", 2: "Business" };

  test("returns business price for all business seats", () => {
    expect(getPriceByPassengerType(businessMapping, mockFlightReturn)).toBe(
      800
    );
  });

  test("returns economy price for mixed or economy seats", () => {
    expect(getPriceByPassengerType(economyMapping, mockFlightReturn)).toBe(200);
    expect(getPriceByPassengerType(mixedMapping, mockFlightReturn)).toBe(200);
  });

  test("returns correct seat type based on mapping", () => {
    expect(getSeatTypeByPassengerType(businessMapping)).toBe("Business");
    expect(getSeatTypeByPassengerType(economyMapping)).toBe("Economy");
    expect(getSeatTypeByPassengerType(mixedMapping)).toBe("Economy");
  });
});

describe("Seat Summary Generation", () => {
  test("returns correct departing flight seat summary", () => {
    expect(getDepartingFlightSeatSummary(mockTrip, 1)).toBe(
      "Seat 4 (Economy, Window)"
    );
  });

  test("returns correct returning flight seat summary", () => {
    expect(getReturningFlightSeatSummary(mockTrip, 1)).toBe(
      "Seat 4 (Economy, Window)"
    );
  });

  test("returns correct returning flight seat summary for undefined seat config", () => {
    expect(getReturningFlightSeatSummary(mockTripNoSeats, 1)).toBe("");
  });

  test("returns empty string for missing seat", () => {
    const tripWithoutSeats = {
      ...mockTrip,
      passengers: [
        {
          ...mockTrip.passengers[0],
          departing_seat_id: undefined,
          returning_seat_id: undefined,
        },
      ],
    };
    expect(getDepartingFlightSeatSummary(tripWithoutSeats, 0)).toBe("");
    expect(getReturningFlightSeatSummary(tripWithoutSeats, 0)).toBe("");
  });
});

describe("Flight and Passenger Information", () => {
  test("formats flight ID correctly", () => {
    expect(getFlightIdString(mockFlightReturn)).toBe("return");
  });

  test("returns name or default for passengers", () => {
    expect(getNameOrDefault("John Doe", 0)).toBe("John Doe");
    expect(getNameOrDefault("", 1)).toBe("Unknown Passenger 1");
    expect(getNameOrDefault(undefined, 2)).toBe("Unknown Passenger 2");
  });
});

describe("Trip to Purchase Mapping", () => {
  test("correctly maps trip to purchase display", () => {
    const purchase = mapTripToPurchase(mockTrip);

    expect(purchase.guid).toBe(mockTrip.guid);
    expect(purchase.title).toBe(mockTrip.name);
    expect(purchase.passengers).toHaveLength(2);
    expect(purchase.passengers[0].name).toBe("John Doe");
    expect(typeof purchase.subtotal).toBe("number");
    expect(typeof purchase.taxes).toBe("number");
    expect(typeof purchase.total_cost).toBe("number");
  });

  test("handles missing passenger data", () => {
    const emptyTrip: Trip = {
      ...mockTrip,
      passengers: [],
    };
    const purchase = mapTripToPurchase(emptyTrip);
    expect(purchase.passengers).toHaveLength(0);
  });
});

describe("Cost Calculations", () => {
  test("calculates correct subtotal for single passenger", () => {
    const subtotal = calculateSubtotal(mockTrip.passengers, mockTrip);
    expect(subtotal).toBe(1800);
  });

  test("calculates correct subtotal for one-way trip", () => {
    const subtotal = calculateSubtotal(
      mockTripOneWay.passengers,
      mockTripOneWay
    );
    expect(subtotal).toBe(900);
  });

  test("calculates correct tax amount", () => {
    const tax = calculateTax(100);
    expect(tax).toBe(13);
  });

  test("returns correct seat type", () => {
    expect(getSeatType(mockFlightReturn, 1)).toBe("Business");
    expect(getSeatType(mockFlightReturn, 2)).toBe("Business");
    expect(getSeatType(mockFlightReturn, 999)).toBe("Economy"); // Default for invalid seat
  });
});
