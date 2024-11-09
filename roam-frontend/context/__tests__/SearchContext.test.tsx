import { act, renderHook } from "@testing-library/react";
import { useSearchStore } from "@/context/SearchContext";
import { Airport } from "@/models";
import { mockAirport } from "@/components/__tests__/__mocks__/storeMocks"

/**
 * Test File: SearchContext
 *
 * Purpose:
 * - Ensures the functionality and state management of the SearchContext.
 * - The SearchContext includes:
 *      - Function for setting search data partially.
 *      - Persistence of the search data state using partialize.
 *
 * Test Cases:
 * 1. Initial state for searchData.
 *    - Expectation: `searchData` should initialize with default values.
 *
 * 2. setSearchData updates searchData partially.
 *    - Expectation: Only the fields in the input should be updated in `searchData`.
 *
 * 3. Persistence of searchData with partialize.
 *    - Expectation: Only `searchData` should be persisted to local storage.
 */

describe("useSearchStore", () => {
  beforeEach(() => {
    // Clear state and mocks
    localStorage.clear();
    act(() => {
      useSearchStore.setState({ searchData: {
        departureAirport: null,
        arrivalAirport: null,
        departureDate: null,
        returnDate: null,
        passengers: 1,
        seatTypeMapping: { 1: "Business" },
        isRoundTrip: true,
        selectedAirlines: [],
      } });
    });
  });

  test("Initial state for searchData", () => {
    // Check initial state is correct
    const { result } = renderHook(() => useSearchStore());
    expect(result.current.searchData).toEqual({
      departureAirport: null,
      arrivalAirport: null,
      departureDate: null,
      returnDate: null,
      passengers: 1,
      seatTypeMapping: { 1: "Business" },
      isRoundTrip: true,
      selectedAirlines: [],
    });
  });

  test("setSearchData updates searchData partially", () => {
    
    // Act: Update only departureAirport and passengers fields
    act(() => {
      useSearchStore.getState().setSearchData({
        departureAirport: mockAirport,
        passengers: 3,
      });
    });

    // Assert: Check that only specific fields were updated
    const { searchData } = useSearchStore.getState();
    expect(searchData.departureAirport).toEqual(mockAirport);
    expect(searchData.passengers).toBe(3);
    expect(searchData.arrivalAirport).toBe(null);
  });

  test("Persistence of searchData with partialize", () => {
    // Act: Modify search data
    act(() => {
      useSearchStore.getState().setSearchData({
        isRoundTrip: false,
        selectedAirlines: ["Airline1", "Airline2"],
      });
    });

    const storedData = JSON.parse(localStorage.getItem("searchData-storage") || "{}");

    // Assert: Only searchData is persisted as per partialize configuration
    expect(storedData).toHaveProperty("state.searchData");
    expect(storedData.state.searchData.isRoundTrip).toBe(false);
    expect(storedData.state.searchData.selectedAirlines).toEqual(["Airline1", "Airline2"]);
  });
});
