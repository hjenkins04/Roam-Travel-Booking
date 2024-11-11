import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HumpButton from "@/components/Buttons/HumpButton";

/**
 * Test File: HumpButton
 *
 * Purpose:
 * - Verifies the HumpButton component's rendering and behavior.
 * - The HumpButton component displays:
 *      - Two buttons with customizable text, colors, and active state.
 *      - An interactive state where the primary or secondary button is highlighted based on isPrimaryActive.
 *      - Handles optional onPrimaryClick and onSecondaryClick functions.
 *
 * Test Cases:
 * 1. Render and click the primary button.
 *    - Expectation: The onPrimaryClick function should be called, and the onSecondaryClick function should not be called.
 *
 * 2. Render and click the secondary button.
 *    - Expectation: The onSecondaryClick function should be called, and the onPrimaryClick function should not be called.
 *
 * 3. Render without onPrimaryClick or onSecondaryClick functions.
 *    - Expectation: Clicking each button should not throw an error even if onClick handlers are missing.
 *
 * 4. Render with isPrimaryActive set to true.
 *    - Expectation: The primary button should display the primary color, while the secondary button displays white.
 *
 * 5. Render with isPrimaryActive set to false.
 *    - Expectation: The secondary button should display the primary color, while the primary button displays white.
 */


describe("HumpButton Component", () => {
  const mockPrimaryClick = jest.fn();
  const mockSecondaryClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("calls onPrimaryClick when primary button is clicked", () => {
    // Arrange: Render with mock click functions
    render(
      <HumpButton
        primaryColor="#FF0000"
        secondaryColor="#00FF00"
        primaryText="Primary"
        secondaryText="Secondary"
        onPrimaryClick={mockPrimaryClick}
        onSecondaryClick={mockSecondaryClick}
      />
    );

    // Act: Click primary button
    const primaryButton = screen.getByText("Primary");
    fireEvent.click(primaryButton);

    // Assert: Verify primary click function is called
    expect(mockPrimaryClick).toHaveBeenCalled();
    expect(mockSecondaryClick).not.toHaveBeenCalled();
  });

  test("calls onSecondaryClick when secondary button is clicked", () => {
    // Arrange: Render with mock click functions and primary inactive
    render(
      <HumpButton
        primaryColor="#FF0000"
        secondaryColor="#00FF00"
        primaryText="Primary"
        secondaryText="Secondary"
        onPrimaryClick={mockPrimaryClick}
        onSecondaryClick={mockSecondaryClick}
        isPrimaryActive={false}
      />
    );

    // Act: Click secondary button
    const secondaryButton = screen.getByText("Secondary");
    fireEvent.click(secondaryButton);

    // Assert: Verify secondary click function is called
    expect(mockSecondaryClick).toHaveBeenCalled();
    expect(mockPrimaryClick).not.toHaveBeenCalled();
  });

  test("does not throw error when onPrimaryClick or onSecondaryClick are not provided", () => {
    // Arrange: Render without click functions
    render(
      <HumpButton
        primaryColor="#FF0000"
        secondaryColor="#00FF00"
        primaryText="Primary"
        secondaryText="Secondary"
      />
    );

    // Act and Assert: Click both buttons
    const primaryButton = screen.getByText("Primary");
    const secondaryButton = screen.getByText("Secondary");

    expect(() => fireEvent.click(primaryButton)).not.toThrow();
    expect(() => fireEvent.click(secondaryButton)).not.toThrow();
  });

  test("displays correct colors and positioning when isPrimaryActive is true", () => {
    // Arrange: Render component with primary button active
    render(
      <HumpButton
        primaryColor="#FF0000"
        secondaryColor="#00FF00"
        primaryText="Primary"
        secondaryText="Secondary"
        isPrimaryActive={true}
      />
    );

    // Assert: Check primary button is styled as active
    const primaryButton = screen.getByText("Primary");
    const secondaryButton = screen.getByText("Secondary");

    expect(primaryButton).toHaveStyle("color: #FF0000");
    expect(secondaryButton).toHaveStyle("color: white");
    expect(primaryButton).toHaveStyle("left: 23%");
    expect(secondaryButton).toHaveStyle("right: 33%");
  });

  test("displays correct colors and positioning when isPrimaryActive is false", () => {
    // Arrange: Render component with secondary button active
    render(
      <HumpButton
        primaryColor="#FF0000"
        secondaryColor="#00FF00"
        primaryText="Primary"
        secondaryText="Secondary"
        isPrimaryActive={false}
      />
    );

    // Assert: Check secondary button is styled as active
    const primaryButton = screen.getByText("Primary");
    const secondaryButton = screen.getByText("Secondary");

    expect(primaryButton).toHaveStyle("color: white");
    expect(secondaryButton).toHaveStyle("color: #FF0000");
    expect(primaryButton).toHaveStyle("left: 33%");
    expect(secondaryButton).toHaveStyle("right: 23%");
  });
});
