import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAuthStore } from "@/context/AuthContext";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import {
  mockAuthStoreSignedIn,
  mockAuthStoreSignedOut,
} from "@/components/__tests__/__mocks__/storeMocks";

/**
 * Test File: Header Component
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the Header component.
 * - The Header Component includes:
 *      - Login and Sign Up buttons for user authentication.
 *      - Logo that redirects to the home page when clicked.
 *      - Profile Avatar that shows a dropdown menu with options to navigate to the Dashboard or Log Out.
 *
 * Test Cases:
 * 1. Render the Login button and triggers the login drawer.
 *    - Expectation: The Login button should be visible, and clicking it should call the openLoginDrawer function once.
 *
 * 2. Don't render the Login button when openLoginDrawer is undefined.
 *    - Expectation: The Login button should not be visible when the openLoginDrawer function is not provided.
 *
 * 3. Render the Sign Up button and triggers the signup drawer.
 *    - Expectation: The Sign Up button should be visible, and clicking it should call the openSignupDrawer function once.
 *
 * 4. Don't render the Sign Up button when openSignupDrawer is undefined.
 *    - Expectation: The Sign Up button should not be visible when the openSignupDrawer function is not provided.
 *
 * 5. Logo redirects to the home page when clicked.
 *    - Expectation: Clicking the logo should trigger a redirect to the home page.
 *
 * 6. Don't show Login and Sign Up buttons when the user is signed in.
 *    - Expectation: Only the Profile Avatar should be displayed when the user is signed in.
 *
 * 7. Show the Profile Avatar with a dropdown menu when signed in.
 *    - Expectation: The dropdown should contain options for navigating to the Dashboard and logging out.
 *
 * 8. Profile dropdown menu redirects to the Dashboard when clicked.
 *    - Expectation: Clicking the Dashboard option should navigate to the dashboard page.
 *
 * 9. Clicking Log Out in the dropdown calls the signOut function.
 *    - Expectation: User should be logged out when Log Out is clicked.
 *
 * 10. Test the rendering of tall and small header sizes, and background image.
 *    - Expectation: Proper background and header size should render based on props.
 */

const resetAuthStore = () => {
  const { setState } = useAuthStore;
  act(() => {
    setState({ ...mockAuthStoreSignedOut });
  });
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Header Component", () => {
  // Arrange: Set up reusable variables and mocks for the test suite
  const mockSignOut = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    // Clear all previous mock calls to ensure clean tests
    jest.clearAllMocks();
    resetAuthStore();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test("Render the Login button and triggers the login drawer", async () => {
    // Arrange: Render the Header component with login functionality
    render(
      <Header
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Find the Login button and simulate a click event
    const user = userEvent.setup();
    const loginButton = screen.getByTestId("login-button");
    await user.click(loginButton);

    // Assert: Check that the login popout is displayed
    await waitFor(() => {
      const loginPopout = screen.getByTestId("login-popout");
      expect(loginPopout).toBeInTheDocument();
    });
  });

  test("Does not render the Login button when the user is signed in", () => {
    // Arrange: Simulate the user being signed in
    act(() => {
      useAuthStore.setState(mockAuthStoreSignedIn);
    });

    render(
      <Header
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Attempt to find the Login and Sign Up buttons
    const loginButton = screen.queryByTestId("login-button");
    const signUpButton = screen.queryByTestId("signup-button");
    const avatar = screen.getByTestId("user-avatar");

    // Assert: Verify that Login and Sign Up buttons are not rendered, but the avatar is
    expect(loginButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });

  test("Renders the Sign Up button and triggers the signup drawer", async () => {
    // Arrange: Simulate the user being signed out
    act(() => {
      useAuthStore.setState(mockAuthStoreSignedOut);
    });

    // Arrange: Render the Header component with signup functionality
    render(
      <Header
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Find the Sign Up button and simulate a click event
    const user = userEvent.setup();
    const signUpButton = screen.getByTestId("signup-button");
    await user.click(signUpButton);

    // Assert: Check that the signup popout is displayed
    await waitFor(() => {
      const signupPopout = screen.getByTestId("signup-popout");
      expect(signupPopout).toBeInTheDocument();
    });
  });

  test("Logo redirects to the home page when clicked", () => {
    // Arrange: Render the Header component
    render(
      <Header
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Click the logo image
    const logo = screen.getByTestId("logo");
    fireEvent.click(logo);

    // Assert: Verify that clicking the logo triggers navigation to the home page
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  test("Profile dropdown menu shows options for Dashboard and Log Out when user is signed in", async () => {
    // Arrange: Simulate user being signed in
    act(() => {
      useAuthStore.setState(mockAuthStoreSignedIn);
    });

    render(
      <Header
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Click the avatar to open the dropdown
    const user = userEvent.setup();
    const avatar = screen.getByTestId("user-avatar");
    await user.click(avatar);

    // Assert: Check that Dashboard and Log Out options appear in the dropdown menu
    const dashboardOption = await screen.findByTestId("dashboard-button");
    const logoutOption = await screen.findByTestId("logout-button");

    expect(dashboardOption).toBeInTheDocument();
    expect(logoutOption).toBeInTheDocument();
  });

  test("Profile dropdown menu redirects to the Dashboard when clicked", async () => {
    // Arrange: Simulate user being signed in
    act(() => {
      useAuthStore.setState(mockAuthStoreSignedIn);
    });

    render(
      <Header
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Click the avatar and then click "Dashboard"
    const user = userEvent.setup();
    const avatar = screen.getByTestId("user-avatar");
    await user.click(avatar);
    const dashboardOption = screen.getByTestId("dashboard-button");
    await user.click(dashboardOption);

    // Assert: Verify that clicking Dashboard triggers navigation to the Dashboard
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  test("Clicking Log Out in the dropdown calls the signOut function", async () => {
    // Arrange: Simulate user being signed in
    act(() => {
      useAuthStore.setState({
        ...mockAuthStoreSignedOut,
        authData: { ...mockAuthStoreSignedOut.authData, isSignedIn: true },
        signOut: mockSignOut,
      });
    });

    render(
      <Header
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Click the avatar and then click "Log Out"
    const user = userEvent.setup();
    const avatar = screen.getByTestId("user-avatar");
    await user.click(avatar);
    const logoutOption = screen.getByTestId("logout-button");
    await user.click(logoutOption);

    // Assert: Ensure the signOut function is called once
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  test("Clicking X on the popout closes the popout", async () => {
    render(
      <Header
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    const user = userEvent.setup();
    const loginButton = screen.getByTestId("login-button");
    await user.click(loginButton);

    const loginPopout = await screen.findByTestId("login-popout");
    const xButton = screen.getByRole("button", { name: "Close" });

    await user.click(xButton);

    expect(loginPopout).not.toBeInTheDocument();
  });

  test("Renders correct header sizes and background images", async () => {
    // Arrange: Render the Header with "tall" headerSize and backgroundImage as true
    render(
      <Header
        headerSize="tall"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Attempt to get the TallHeaderBackground by test ID
    const tallHeaderBackground = await waitFor(() =>
      screen.queryByTestId("tall-header-background")
    );

    // Assert: Verify that TallHeaderBackground is displayed when headerSize is "tall" and backgroundImage is true
    expect(tallHeaderBackground).toBeInTheDocument();

    // Clean up before next render
    cleanup();

    // Arrange: Re-render Header with "small" headerSize and backgroundImage set to true
    render(
      <Header
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Assert: Verify that HeaderBackground is displayed for small header when backgroundImage is true
    await waitFor(() => {
      const smallHeaderBackground = screen.queryByTestId("header-background");
      expect(smallHeaderBackground).toBeInTheDocument();
    });

    // Clean up before final render
    cleanup();

    // Arrange: Re-render Header with "small" headerSize and no background
    render(
      <Header
        headerSize="small"
        backgroundImage={false}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Assert: Verify that no background components are displayed when backgroundImage is false
    await waitFor(() => {
      const noTallBackground = screen.queryByTestId("tall-header-background");
      const noSmallBackground = screen.queryByTestId("header-background");
      expect(noTallBackground).not.toBeInTheDocument();
      expect(noSmallBackground).not.toBeInTheDocument();
    });
  });
});
