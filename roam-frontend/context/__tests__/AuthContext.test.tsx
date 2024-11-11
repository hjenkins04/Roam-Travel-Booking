import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useAuthStore } from "@/context/AuthContext";
import { mockUseLoaderStore } from '@/components/__tests__/__mocks__/storeMocks';
import HomePage from "@/app/page";

/**
 * Test File: AuthContext
 *
 * Purpose:
 * - Ensures the functionality and state management of the AuthContext.
 * - The AuthContext includes:
 *      - Functions for signing in, signing out.
 *      - Functions for setting auth data, and displaying popups.
 *
 * Test Cases:
 * 1. Persists initial auth data.
 *    - Expectation: Auth data should persist with default values.
 *
 * 2. Sign in updates auth state.
 *    - Expectation: Signing in should update guid and set isSignedIn to true.
 *
 * 3. Sign out clears auth state.
 *    - Expectation: Signing out should reset guid and set isSignedIn to false.
 *
 * 4. Set auth data manually.
 *    - Expectation: Manually setting auth data updates the state correctly.
 *
 * 5. Display Please Sign In popup.
 *    - Expectation: Setting showPleaseSignInPopup displays the popup on the frontend.
 *
 * 6. Display Bad Access popup.
 *    - Expectation: Setting showBadAccessPopup displays the popup on the frontend.
 */


jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
}));

jest.mock("@radix-ui/react-slot", () => ({
  Slot: ({ children }: React.PropsWithChildren<{}>) => <>{children}</>,
}));

jest.mock('@/api/FetchAirports', () => ({
  fetchAirports: jest.fn().mockResolvedValue([]),
}));

jest.mock('@/api/FetchPopDestinations', () => ({
  fetchPopDestinations: jest.fn().mockResolvedValue([]),
}));

jest.mock('@/context/LoaderContext', () => ({
  useLoaderStore: jest.fn(() => mockUseLoaderStore),
}));

describe("AuthContext", () => {
  afterEach(() => {
    act(() => {
      useAuthStore.setState({
        authData: {
          guid: "",
          isSignedIn: false,
          showPleaseSignInPopup: false,
          showBadAccessPopup: false,
        },
      });
    });

    const originalConsoleError = console.error;
    jest.spyOn(console, 'error').mockImplementation((msg) => {
      if (msg.includes('Function components cannot be given refs')) {
        return; // Ignore this specific warning
      }
      originalConsoleError(msg); // Allow other warnings to be logged
    });
  });

  test("Persists initial auth data", async () => {
    // Arrange: Render component that uses AuthContext
    const { authData } = useAuthStore.getState();

    // Assert: Initial persisted values are as expected
    expect(authData.guid).toBe("");
    expect(authData.isSignedIn).toBe(false);
    expect(authData.showPleaseSignInPopup).toBe(false);
    expect(authData.showBadAccessPopup).toBe(false);
  });

  test("Sign in updates auth state", async () => {
    // Arrange: Sign in with a mock GUID
    const mockGuid = "test-guid";
    act(() => {
      useAuthStore.getState().signIn(mockGuid);
    });

    // Assert: Check that the auth state reflects the sign-in
    await waitFor(() => {
      const { authData } = useAuthStore.getState();
      expect(authData.guid).toBe(mockGuid);
      expect(authData.isSignedIn).toBe(true);
    });
  });

  test("Sign out clears auth state", async () => {
    // Arrange: Sign in first, then sign out
    const mockGuid = "test-guid";
    act(() => {
      useAuthStore.getState().signIn(mockGuid);
    });
    act(() => {
      useAuthStore.getState().signOut();
    });

    // Assert: Check that the auth state reflects the sign-out
    await waitFor(() => {
      const { authData } = useAuthStore.getState();
      expect(authData.guid).toBe("");
      expect(authData.isSignedIn).toBe(false);
    });
  });

  test("Set auth data manually", async () => {
    // Arrange: Define mock auth data
    const mockAuthData = {
      guid: "test-guid",
      isSignedIn: true,
      showPleaseSignInPopup: true,
      showBadAccessPopup: false,
    };

    act(() => {
      useAuthStore.getState().setAuthData(mockAuthData);
    });

    // Assert: Verify the auth data is set as expected
    await waitFor(() => {
      const { authData } = useAuthStore.getState();
      expect(authData).toEqual(mockAuthData);
    });
  });

  test("Display Please Sign In popup", async () => {
    // Arrange: Set the showPleaseSignInPopup flag to true
    act(() => {
      useAuthStore.getState().setShowPleaseSignInPopup(true);
    });

    // Act: Render a component to display the popup
    render(<HomePage />);
    
    // Assert: The popup should appear
    await waitFor(() => {
      const popup = screen.getByTestId("please-sign-in-popup");
      expect(popup).toBeInTheDocument();
    });
  });

  test("Display Bad Access popup", async () => {
    // Arrange: Set the showBadAccessPopup flag to true
    act(() => {
      useAuthStore.getState().setBadAccessPopup(true);
    });

    // Act: Render a component to display the popup
    render(<HomePage />);

    // Assert: The popup should appear
    await waitFor(() => {
      const popup = screen.getByTestId("bad-access-popup");
      expect(popup).toBeInTheDocument();
    });
  });
});
