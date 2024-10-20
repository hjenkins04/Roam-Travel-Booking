import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileHeader from "../ProfileHeader";

/**
 * Test File: Profile Header Component
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the Profile Header component.
 * - The Profile Sidebar Component includes:
 *      - Rendering of correct name and email.
 *      - Edit profile button that changes page contents when clicked initially.
 *
 * Test Cases:
 * 1. Render the name and email that are passed in as props.
 *    - Expectation: the name and email should be rendered and their values should be equal to the props.
 *
 * 2. Render the edit profile button and test its functionality.
 *    - Expectation: the Edit Profile button should be rendered and should trigger the function once on click.
 */

describe("Profile Header Component", () => {
  const mockName = "First Last";
  const mockEmail = "first.last@example.com";
  const mockEditProfile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Render name and email and check their values", () => {
    render(
      <ProfileHeader
        name={mockName}
        email={mockEmail}
        onEditProfile={mockEditProfile}
      />
    );

    const headerName = screen.getByTestId("header-name");
    const headerEmail = screen.getByTestId("header-email");

    expect(headerName).toBeInTheDocument();
    expect(headerEmail).toBeInTheDocument();
    expect(headerName).toContainHTML(mockName);
    expect(headerEmail).toContainHTML(mockEmail);
  });

  test("Render the edit profile button and trigger function once", () => {
    render(
      <ProfileHeader
        name={mockName}
        email={mockEmail}
        onEditProfile={mockEditProfile}
      />
    );

    const editProfileButton = screen.getByTestId("edit-profile-button");
    fireEvent.click(editProfileButton);

    expect(editProfileButton).toBeInTheDocument();
    expect(mockEditProfile).toHaveBeenCalledTimes(1);
  });
});
