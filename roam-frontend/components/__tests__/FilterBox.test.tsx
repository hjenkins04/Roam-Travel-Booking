import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
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
 * Test File: 
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

