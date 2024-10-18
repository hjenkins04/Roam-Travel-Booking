import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

// Mock useAuth and useRouter hooks for testing
jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

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
 *    - Expectation: Clicking the "Dashboard" option should navigate to the dashboard page.
 *
 * 9. Clicking Log Out in the dropdown calls the signOut function.
 *    - Expectation: User should be logged out when "Log Out" is clicked.
 *
 * 10. Test the rendering of tall and small header sizes, and background image.
 *    - Expectation: Proper background and header size should render based on props.
 */

describe("Header Component", () => {
  // Arrange: Set up reusable variables and mocks for the test suite
  const mockOpenLoginDrawer = jest.fn();
  const mockOpenSignupDrawer = jest.fn();
  const mockSignOut = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    // Clear all previous mock calls to ensure clean tests
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      isSignedIn: false,
      signOut: mockSignOut,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test("Render the Login button and triggers the login drawer", () => {
    // Arrange: Render the Header component with Login function provided
    render(
      <Header
        openLoginDrawer={mockOpenLoginDrawer}
        openSignupDrawer={mockOpenSignupDrawer}
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Find the Login button and simulate a click event
    const loginButton = screen.getByTestId("login-button");
    fireEvent.click(loginButton);

    // Assert: Check that the Login button is displayed and that clicking it calls the function once
    expect(loginButton).toBeInTheDocument();
    expect(mockOpenLoginDrawer).toHaveBeenCalledTimes(1);
  });

  test("Does not render the Login button when openLoginDrawer is undefined", () => {
    // Arrange: Render the Header component without Login function
    render(
      <Header
        openLoginDrawer={undefined}
        openSignupDrawer={mockOpenSignupDrawer}
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Attempt to find the Login button
    const loginButton = screen.queryByTestId("login-button");

    // Assert: Verify that the Login button is not present in the document
    expect(loginButton).not.toBeInTheDocument();
  });

  test("Renders the Sign Up button and triggers the signup drawer", () => {
    // Arrange: Render the Header component with Sign Up function provided
    render(
      <Header
        openLoginDrawer={mockOpenLoginDrawer}
        openSignupDrawer={mockOpenSignupDrawer}
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Find the Sign Up button and simulate a click event
    const signUpButton = screen.getByTestId("signup-button");
    fireEvent.click(signUpButton);

    // Assert: Check that the Sign Up button is displayed and that clicking it calls the function once
    expect(signUpButton).toBeInTheDocument();
    expect(mockOpenSignupDrawer).toHaveBeenCalledTimes(1);
  });

  test("Does not render the Sign Up button when openSignupDrawer is undefined", () => {
    // Arrange: Render the Header component without Sign Up function
    render(
      <Header
        openLoginDrawer={mockOpenLoginDrawer}
        openSignupDrawer={undefined}
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Attempt to find the Sign Up button
    const signUpButton = screen.queryByTestId("signup-button");

    // Assert: Verify that the Sign Up button is not present in the document
    expect(signUpButton).not.toBeInTheDocument();
  });

  test("Logo redirects to the home page when clicked", () => {
    // Arrange: Render the Header component
    render(
      <Header
        openLoginDrawer={mockOpenLoginDrawer}
        openSignupDrawer={mockOpenSignupDrawer}
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

  test("Does not show Login and Sign Up buttons when the user is signed in", () => {
    // Arrange: Simulate user being signed in
    (useAuth as jest.Mock).mockReturnValue({
      isSignedIn: true,
      signOut: mockSignOut,
    });

    render(
      <Header
        openLoginDrawer={mockOpenLoginDrawer}
        openSignupDrawer={mockOpenSignupDrawer}
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Attempt to find the Login and Sign Up buttons, and verify if the avatar is displayed
    const loginButton = screen.queryByTestId("login-button");
    const signUpButton = screen.queryByTestId("signup-button");
    const avatar = screen.queryByTestId("user-avatar");

    // Assert: Ensure buttons are not shown, but the profile avatar is visible
    expect(loginButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });

  test("Profile dropdown menu shows options for Dashboard and Log Out", async () => {
    // Arrange: Simulate user being signed in
    (useAuth as jest.Mock).mockReturnValue({
      isSignedIn: true,
      signOut: mockSignOut,
    });

    render(
      <Header
        openLoginDrawer={mockOpenLoginDrawer}
        openSignupDrawer={mockOpenSignupDrawer}
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

    // Act: Wait for dropdown items to appear
    const dashboardOption = await screen.findByTestId("dashboard-button");
    const logoutOption = await screen.findByTestId("logout-button");

    // Assert: Check that the dropdown options are visible
    expect(dashboardOption).toBeInTheDocument();
    expect(logoutOption).toBeInTheDocument();
  });

  test("Profile dropdown menu redirects to the Dashboard when clicked", async () => {
    // Arrange: Simulate user being signed in
    (useAuth as jest.Mock).mockReturnValue({
      isSignedIn: true,
      signOut: mockSignOut,
    });

    render(
      <Header
        openLoginDrawer={mockOpenLoginDrawer}
        openSignupDrawer={mockOpenSignupDrawer}
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

    // Assert: Verify that the click triggers navigation to the Dashboard
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  test('Clicking "Log Out" in the dropdown calls the signOut function', async () => {
    // Arrange: Simulate user being signed in
    (useAuth as jest.Mock).mockReturnValue({
      isSignedIn: true,
      signOut: mockSignOut,
    });

    render(
      <Header
        openLoginDrawer={mockOpenLoginDrawer}
        openSignupDrawer={mockOpenSignupDrawer}
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

  test("Renders correct header sizes and background images", async () => {
    // Arrange: Render the Header with "tall" headerSize and backgroundImage as true
    render(
      <Header
        openLoginDrawer={jest.fn()}
        openSignupDrawer={jest.fn()}
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
        openLoginDrawer={jest.fn()}
        openSignupDrawer={jest.fn()}
        headerSize="small"
        backgroundImage={true}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Log the DOM for debugging
    screen.debug();

    // Assert:
    // Verify that TallHeaderBackground is not displayed for small header
    await waitFor(() => {
      const smallTallBackground = screen.queryByTestId(
        "tall-header-background"
      );
      expect(smallTallBackground).not.toBeInTheDocument();
    });

    // Verify that HeaderBackground is displayed for small header when backgroundImage is true
    await waitFor(() => {
      const smallHeaderBackground = screen.queryByTestId("header-background");
      expect(smallHeaderBackground).toBeInTheDocument();
    });

    // Clean up before final render
    cleanup();

    // Arrange: Re-render Header with "small" headerSize and no background
    render(
      <Header
        openLoginDrawer={jest.fn()}
        openSignupDrawer={jest.fn()}
        headerSize="small"
        backgroundImage={false}
        logoColour="black"
        displayProfilePicture={true}
      />
    );

    // Act: Log the DOM for debugging
    screen.debug();

    // Assert:
    // Verify that no background components are displayed when backgroundImage is false
    await waitFor(() => {
      const noTallBackground = screen.queryByTestId("tall-header-background");
      const noSmallBackground = screen.queryByTestId("header-background");
      expect(noTallBackground).not.toBeInTheDocument();
      expect(noSmallBackground).not.toBeInTheDocument();
    });
  });
});
