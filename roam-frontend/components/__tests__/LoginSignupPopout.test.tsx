import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginSignupPopout from "../LoginSignupPopout";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/context/AuthContext";
import { fetchLogin } from "@/api/FetchLogin";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuthStore: jest.fn(),
}));

// Mock the fetchLogin API
jest.mock("@/api/FetchLogin", () => ({
  fetchLogin: jest.fn().mockResolvedValue({
    token: "mock-token",
    guid: "mock-guid",
  }),
}));

/**
 * Test File: LoginSignupPopout Component
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the LoginSignupPopout component.
 * - The LoginSignupPopout Component includes:
 *      - A sliding drawer for login and signup functionality
 *      - Form inputs for user credentials (email, password, name, phone)
 *      - Toggle between login and signup modes
 *      - Standard form submission and Google authentication
 *      - Forgot password functionality
 *
 * Test Cases:
 * 1. Toggle between login and signup modes
 *    - Expectation: Clicking the toggle button in login mode should switch to signup mode
 *    - Expectation: Clicking the toggle button in signup mode should switch to login mode
 *    - Expectation: The setPopoutMode function should be called with the correct mode
 *
 * 2. Handle successful login submission
 *    - Expectation: Form submission should trigger the fetchLogin API call
 *    - Expectation: On successful response, signIn should be called with the user GUID
 *    - Expectation: The drawer should close and user should be redirected to home page
 *    - Expectation: All success flow functions should be called exactly once
 *
 * 3. Handle forgot password navigation
 *    - Expectation: Clicking "Forgot Password?" should navigate to the forgot-password route
 *    - Expectation: The router.push function should be called with the correct path
 *
 * 4. Handle all required props and validates interface
 *    - Expectation: The component should render with all required props and validate the interface
 */

describe("LoginSignupPopout Component", () => {
  const mockCloseDrawer = jest.fn();
  const mockSetPopoutMode = jest.fn();
  const mockSignIn = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
    });
  });

  test("renders with all required props and validates interface", () => {
    // Test login mode
    const loginProps = {
      isOpen: true,
      mode: "login" as const,
      closeDrawer: mockCloseDrawer,
      setPopoutMode: mockSetPopoutMode,
    };

    const { rerender } = render(<LoginSignupPopout {...loginProps} />);

    // Verify login mode specific elements
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.queryByLabelText(/Full Name/)).not.toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();

    // Test signup mode
    const signupProps = {
      ...loginProps,
      mode: "signup" as const,
    };

    rerender(<LoginSignupPopout {...signupProps} />);

    // Verify signup mode specific elements
    expect(screen.getByText("Create an Account")).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();

    // Test props behavior
    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(mockCloseDrawer).toHaveBeenCalled();
  });

  test("toggles between login and signup modes", async () => {
    // Test switching from login to signup
    render(
      <LoginSignupPopout
        isOpen={true}
        mode="login"
        closeDrawer={mockCloseDrawer}
        setPopoutMode={mockSetPopoutMode}
      />
    );

    const toggleButton = screen.getByText("Sign up");
    await userEvent.click(toggleButton);

    expect(mockSetPopoutMode).toHaveBeenCalledWith("signup");

    // Test switching from signup to login
    render(
      <LoginSignupPopout
        isOpen={true}
        mode="signup"
        closeDrawer={mockCloseDrawer}
        setPopoutMode={mockSetPopoutMode}
      />
    );

    const toggleButtonBack = screen.getByText("Sign in");
    await userEvent.click(toggleButtonBack);

    expect(mockSetPopoutMode).toHaveBeenCalledWith("login");
  });

  test("handles successful login submission", async () => {
    // Mock successful login response
    (fetchLogin as jest.Mock).mockResolvedValueOnce({
      token: "mock-token",
      guid: "mock-guid",
    });

    render(
      <LoginSignupPopout
        isOpen={true}
        mode="login"
        closeDrawer={mockCloseDrawer}
        setPopoutMode={mockSetPopoutMode}
      />
    );

    await userEvent.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(fetchLogin).toHaveBeenCalled();
      expect(mockSignIn).toHaveBeenCalledWith("mock-guid");
      expect(mockCloseDrawer).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  test("handles forgot password navigation", async () => {
    render(
      <LoginSignupPopout
        isOpen={true}
        mode="login"
        closeDrawer={mockCloseDrawer}
        setPopoutMode={mockSetPopoutMode}
      />
    );

    const forgotPasswordButton = screen.getByText("Forgot Password?");
    await userEvent.click(forgotPasswordButton);

    expect(mockPush).toHaveBeenCalledWith("/forgot-password");
  });
});
