import { jest } from "@jest/globals";
import { AuthStore } from "@/context/AuthContext";
import { TripState, TripData } from "@/context/TripContext";

export type UseAuthStoreMock = AuthStore & {
  [key: string]: any;
};

export const createUseAuthStoreMock = (initialState: Partial<AuthStore["authData"]> = {}): UseAuthStoreMock => {
  const mockStore: UseAuthStoreMock = {
    authData: {
      guid: "",
      isSignedIn: false,
      showPleaseSignInPopup: false,
      showBadAccessPopup: false,
      ...initialState,
    },
    signIn: jest.fn((guid: string) => {
      mockStore.authData.isSignedIn = true;
      mockStore.authData.guid = guid;
    }),
    signOut: jest.fn(() => {
      mockStore.authData.isSignedIn = false;
      mockStore.authData.guid = "";
    }),
    setAuthData: jest.fn((data: Partial<AuthStore["authData"]>) => {
      mockStore.authData = { ...mockStore.authData, ...data };
    }),
    setShowPleaseSignInPopup: jest.fn((show: boolean) => {
      mockStore.authData.showPleaseSignInPopup = show;
    }),
    setBadAccessPopup: jest.fn((show: boolean) => {
      mockStore.authData.showBadAccessPopup = show;
    }),
  };

  return mockStore;
};

export const resetAuthStoreMock = (initialState: Partial<AuthStore["authData"]> = {}) => {
  mockUseAuthStore = createUseAuthStoreMock(initialState);
};

export type UseTripStoreMock = TripState & {
  [key: string]: any;
};

export const createUseTripStoreMock = (initialState: Partial<TripData> = {}): UseTripStoreMock => {
  const mockStore: UseTripStoreMock = {
    tripData: {
      trip: null,
      current_flight: null,
      current_flight_departure_date: null,
      departure_date: null,
      return_date: null,
      total_cost: 0,
      trip_booking_active: false,
      trip_purchased: false,
      ...initialState,
    },
    setTripData: jest.fn((data: Partial<TripData> | ((prev: TripData) => TripData)) => {
      if (typeof data === "function") {
        mockStore.tripData = data(mockStore.tripData);
      } else {
        mockStore.tripData = { ...mockStore.tripData, ...data };
      }
    }),
  };

  return mockStore;
};

export const resetTripStoreMock = (initialState: Partial<TripData> = {}) => {
  mockUseTripStore = createUseTripStoreMock(initialState);
};

// Define global jest mock variables
export let mockUseAuthStore: UseAuthStoreMock;
export let mockUseTripStore: UseTripStoreMock;

// Jest mocks for stores
jest.mock("@/context/AuthContext", () => ({
  useAuthStore: jest.fn(() => mockUseAuthStore),
}));

jest.mock("@/context/TripContext", () => ({
  useTripStore: jest.fn(() => mockUseTripStore),
}));
