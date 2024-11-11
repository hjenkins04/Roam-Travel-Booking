import { getTimeCategory } from "../HelperFunctions/timeFilter";

/**
 * Test File: getTimeCategory Function
 *
 * Purpose:
 * - Verifies the functionality and correctness of the getTimeCategory function, which categorizes a given time string
 *   into one of three time periods: "Morning," "Afternoon," or "Evening."
 * - The function accepts a time string formatted as "HH:MM AM/PM" and is expected to:
 *      - Categorize times from 12:00 AM to 11:59 AM as "Morning"
 *      - Categorize times from 12:00 PM to 4:59 PM as "Afternoon"
 *      - Categorize times from 5:00 PM to 11:59 PM as "Evening"
 *
 * Test Cases:
 * 1. Categorize morning times.
 *    - Expectation: Times within the morning range (12:00 AM to 11:59 AM) should return "Morning."
 *
 * 2. Categorize afternoon times.
 *    - Expectation: Times within the afternoon range (12:00 PM to 4:59 PM) should return "Afternoon."
 *
 * 3. Categorize evening times.
 *    - Expectation: Times within the evening range (5:00 PM to 11:59 PM) should return "Evening."
 */

describe("getTimeCategory", () => {
  test("returns 'Morning' for times in the morning range", () => {
    expect(getTimeCategory("12:00 AM")).toBe("Morning"); // Midnight
    expect(getTimeCategory("6:00 AM")).toBe("Morning"); // Early morning
    expect(getTimeCategory("11:59 AM")).toBe("Morning"); // End of morning
  });

  test("returns 'Afternoon' for times in the afternoon range", () => {
    expect(getTimeCategory("12:00 PM")).toBe("Afternoon"); // Noon
    expect(getTimeCategory("1:00 PM")).toBe("Afternoon"); // Early afternoon
    expect(getTimeCategory("4:59 PM")).toBe("Afternoon"); // End of afternoon
  });

  test("returns 'Evening' for times in the evening range", () => {
    expect(getTimeCategory("5:00 PM")).toBe("Evening"); // Start of evening
    expect(getTimeCategory("8:00 PM")).toBe("Evening"); // Middle of evening
    expect(getTimeCategory("11:59 PM")).toBe("Evening"); // Late evening
  });
});
