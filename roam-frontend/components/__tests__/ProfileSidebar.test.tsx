import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { useAuthStore } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ProfileSidebar";
import { mockAuthStoreSignedIn, mockAuthStoreSignedOut } from '@/components/__tests__/__mocks__/storeMocks';

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const resetAuthStore = () => {
  const { setState } = useAuthStore;
  act(() => {
    setState({ ...mockAuthStoreSignedOut });
  });
};

/**
 * Test File: Profile Sidebar Component
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the Profile Sidebar component.
 * - The Profile Sidebar Component includes:
 *      - Button that redirects to home page when clicked.
 *      - Button that renders purchase history when clicked.
 *      - Log out button, that redirects to home page when successful.
 *
 * Test Cases:
 * 1. Render the Home button and redirection to home page when clicked.
 *    - Expectation: the Home button should be visible, and clicking should redirect to home page.
 *
 * 2. Render the Purchases button and trigger the edit profile function.
 *    - Expectation: the Purchases button should be visible, and clicking should call the onEditProfile function once.
 *
 * 3. Render the Log Out button and trigger signOut function, and ensure redirection to home page.
 *    - Expectation: the Log Out button should be visible, and user should be logged out when clicked, and then redirected to home page.
 */

describe("Profile Sidebar Component", () => {
  //Arrange: Set up reusable variables and mocks for the test suite
  const mockEditProfile = jest.fn();
  const mockSignOut = jest.fn();
  const mockPush = jest.fn();

  const renderComponent = () => render(<Sidebar onEditProfile={mockEditProfile} />);

  beforeEach(() => {
    // Clear all previous mock calls to ensure clean tests
    jest.clearAllMocks();
    resetAuthStore();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test("Render the Home button and redirects to home page", async () => {
    act(() => {useAuthStore.setState(mockAuthStoreSignedIn);});

    renderComponent();

    const homeButton = screen.getByTestId("home-button");
    fireEvent.click(homeButton);

    expect(homeButton).toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  test("Render the Purchases button and trigger function once", async () => {
    act(() => {useAuthStore.setState(mockAuthStoreSignedIn);});

    renderComponent();

    const purchasesButton = screen.getByTestId("purchases-button");
    fireEvent.click(purchasesButton);

    expect(purchasesButton).toBeInTheDocument();
    expect(mockEditProfile).toHaveBeenCalledTimes(1);
  });

  test("Render the Log Out button, log out user on click and redirect to home page", async () => {
    act(() => {
      useAuthStore.setState({
        ...mockAuthStoreSignedOut,
        authData: { ...mockAuthStoreSignedOut.authData, isSignedIn: true },
        signOut: mockSignOut,
      });
    });

    renderComponent();

    const logOutButton = screen.getByTestId("sidebar-logout-button");
    fireEvent.click(logOutButton);

    expect(logOutButton).toBeInTheDocument();

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
