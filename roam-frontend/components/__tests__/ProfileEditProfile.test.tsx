import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditProfile from "../EditProfile";

/**
 * Test File: Profile EditProfile Component
 *
 * Purpose:
 * - Ensures the functionality and rendering behavior of the Profile EditProfile component.
 * - The Profile EditProfile component includes:
 *      - Form fields for user account information, such as name, email, phone and address.
 *      - A form sumbmission button that triggers the handleSubmit function.
 *      - Optional fields for middle name, suffix, and apartment number.
 *
 * Test Cases:
 * 1. Render the required form fields.
 *    - Expectation: the rqeuired fields (first, last, email, phone, address, province, date of birth, postal code) should be visible.
 *
 * 2. Submit the form and call the handleSubmit function.
 *    - Expectation: when the form is submitted, the handleSubmit function should be called once.
 *
 * 3. Render the optional fields.
 *    - Expectation: the optional fields (middle name, suffix, apt number) should be visible.
 */

describe("EditProfile Component", () => {
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Render the required form fields", () => {
    render(<EditProfile handleSubmit={mockHandleSubmit} />);

    // Check required fields
    const placeholders = [
      "First Name*",
      "Last Name*",
      "Email Address*",
      "Phone Number*",
      "Street Address*",
      "Province*",
      "Postal Code*",
    ];
    for (const s of placeholders) {
      const element = screen.getByPlaceholderText(s);
      expect(element).toBeInTheDocument();
      expect(element).toBeRequired();
    }
  });

  test("Submit the form and call the handleSubmit function", () => {
    render(<EditProfile handleSubmit={mockHandleSubmit} />);

    const form = screen.getByTestId("form");
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("Render the optional form fields", () => {
    render(<EditProfile handleSubmit={mockHandleSubmit} />);

    const placeholders = ["Middle", "Apt Number", "Suffix"];
    for (const s of placeholders) {
      const element = screen.getByPlaceholderText(s);
      expect(element).toBeInTheDocument();
      expect(element).not.toBeRequired();
    }
  });
});
