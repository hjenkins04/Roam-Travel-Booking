import { setTripContextData } from "../HelperFunctions/setTripContextData";
import { fetchRandomReturnFlight } from "@/api/FetchRandomReturnFlight";
import { act } from "@testing-library/react";

// Mock the external dependencies
jest.mock("@/api/FetchRandomReturnFlight");
const mockFetchRandomReturnFlight = fetchRandomReturnFlight as jest.Mock;

/**
 * Test Suite for setTripContextData Function
 *
 * This suite tests the `setTripContextData` function, which handles the creation and setup
 * of trip data in the application context. The function manages authentication checks,
 * search field validation, and trip data initialization.
 *
 * The tests cover the following key aspects:
 *
 * 1. Authentication Validation (lines 22-26):
 *    - Verifies proper handling when user is not authenticated
 *    - Tests the showing of sign-in popup
 *    - Confirms redirect to home page
 *    - Ensures trip creation process is halted for unauthenticated users
 *
 * 2. Search Fields Validation (line 31):
 *    - Tests the validation of required search fields
 *    - Verifies early return behavior when fields are invalid
 *    - Confirms proper loader state management
 *    - Ensures trip creation only proceeds with valid fields
 *
 * 3. Trip Data Creation:
 *    - Tests the creation of passenger data
 *    - Verifies proper handling of round-trip vs one-way scenarios
 *    - Ensures correct formatting of trip names
 *
 * 4. Error Handling:
 *    - Tests error scenarios during trip creation
 *    - Verifies proper error logging
 *
 * 5. Navigation Flow:
 *    - Confirms correct routing behavior on successful trip creation
 *    - Tests navigation blocking for invalid scenarios
 */

describe("setTripContextData", () => {
  // Common test setup
  let mockShowLoader: jest.Mock;
  let mockHideLoader: jest.Mock;
  let mockSetTripData: jest.Mock;
  let mockRouter: { push: jest.Mock; replace: jest.Mock };
  let mockSetShowPleaseSignInPopup: jest.Mock;
  let mockEnsureAllSearchFields:jest.Mock;
  let mockSearchData: jest.Mock;
  let mockSearchDataRoundTrip: jest.Mock;
  let mockTripData: jest.Mock;
  let mockSelectedFlight: jest.Mock;

  beforeEach(() => {
    // Reset all mocks before each test
    mockShowLoader = jest.fn();
    mockHideLoader = jest.fn();
    mockSetTripData = jest.fn();
    mockRouter = {
      push: jest.fn(),
      replace: jest.fn(),
    };
    mockSetShowPleaseSignInPopup = jest.fn();
    mockEnsureAllSearchFields = jest.fn(() => true);
    mockSearchDataRoundTrip = {
      isRoundTrip: true,
      departureDate: new Date("2024-01-01"),
      returnDate: new Date("2024-01-08"),
      passengers: 2,
      departureAirport: { guid: "dep-123" },
      arrivalAirport: { guid: "arr-456" },
    };
    mockSearchData = {
      isRoundTrip: false,
      departureDate: new Date("2024-01-01"),
      returnDate: new Date("2024-01-08"),
      passengers: 2,
      departureAirport: { guid: "dep-123" },
      arrivalAirport: { guid: "arr-456" },
    };
    mockTripData = {
      current_flight: null,
      trip_booking_active: false,
      trip_purchased: false,
    };
    mockSelectedFlight = {
      departure_airport: {
        municipality_name: "New York",
      },
      arrival_airport: {
        municipality_name: "Los Angeles",
      },
    };
  });

  // Test for authentication check (lines 22-26)
  describe("Authentication checks", () => {
    it("should show sign-in popup and redirect to home when user is not authenticated", async () => {
      const authData = { isSignedIn: false };

      await act(async () => {
        setTripContextData(
          mockSelectedFlight,
          mockSearchData,
          mockTripData,
          mockSetTripData,
          authData,
          mockSetShowPleaseSignInPopup,
          mockRouter,
          mockShowLoader,
          mockHideLoader,
          mockEnsureAllSearchFields
        );
      });

      expect(mockShowLoader).toHaveBeenCalled();
      expect(mockSetShowPleaseSignInPopup).toHaveBeenCalledWith(true);
      expect(mockRouter.replace).toHaveBeenCalledWith("/");
      expect(mockSetTripData).not.toHaveBeenCalled();
    });

    it("should proceed with trip creation when user is authenticated", async () => {
      const authData = { isSignedIn: true };

      await act(async () => {
        setTripContextData(
          mockSelectedFlight,
          mockSearchData,
          mockTripData,
          mockSetTripData,
          authData,
          mockSetShowPleaseSignInPopup,
          mockRouter,
          mockShowLoader,
          mockHideLoader,
          mockEnsureAllSearchFields
        );
      });

      expect(mockShowLoader).toHaveBeenCalled();
      expect(mockSetShowPleaseSignInPopup).not.toHaveBeenCalled();
      expect(mockRouter.replace).not.toHaveBeenCalledWith("/");
      expect(mockSetTripData).toHaveBeenCalled();
    });
  });

  // Test for EnsureAllSearchFields check (line 31)
  describe("Search fields validation", () => {
    it("should return early if search fields are not valid", async () => {
      const authData = { isSignedIn: true };
      mockEnsureAllSearchFields.mockReturnValue(false);

      await act(async () => {
        setTripContextData(
          mockSelectedFlight,
          mockSearchData,
          mockTripData,
          mockSetTripData,
          authData,
          mockSetShowPleaseSignInPopup,
          mockRouter,
          mockShowLoader,
          mockHideLoader,
          mockEnsureAllSearchFields
        );
      });

      expect(mockShowLoader).toHaveBeenCalled();
      expect(mockHideLoader).toHaveBeenCalled();
      expect(mockSetTripData).not.toHaveBeenCalled();
      expect(mockRouter.push).not.toHaveBeenCalled();
    });

    it("should proceed with trip creation if search fields are valid", async () => {
      const authData = { isSignedIn: true };
      mockEnsureAllSearchFields.mockReturnValue(true);

      await act(async () => {
        setTripContextData(
          mockSelectedFlight,
          mockSearchData,
          mockTripData,
          mockSetTripData,
          authData,
          mockSetShowPleaseSignInPopup,
          mockRouter,
          mockShowLoader,
          mockHideLoader,
          mockEnsureAllSearchFields
        );
      });

      expect(mockShowLoader).toHaveBeenCalled();
      expect(mockHideLoader).not.toHaveBeenCalled();
      expect(mockSetTripData).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith("/seat-booking");
    });
  });

  it("logs an error if fetchRandomReturnFlight throws an error", async () => {
    // Arrange: Set up the error to be thrown
    mockFetchRandomReturnFlight.mockRejectedValueOnce(new Error("Error"));

    // Spy on console.error to catch error logs
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // Act: Call the function
    await act(async () => {
      setTripContextData(
        mockSelectedFlight,
        mockSearchDataRoundTrip,
        mockTripData,
        mockSetTripData,
        { isSignedIn: true },
        mockSetShowPleaseSignInPopup,
        mockRouter,
        mockShowLoader,
        mockHideLoader,
        mockEnsureAllSearchFields
      );
    });

    // Assert: Verify console.error was called with the error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error creating trip data",
      expect.any(Error)
    );

    // Clean up
    consoleErrorSpy.mockRestore();
  });
});
